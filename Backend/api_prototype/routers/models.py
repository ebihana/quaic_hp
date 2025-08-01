import shutil
from pathlib import Path

from api_prototype import crud, db_models, schemas
from api_prototype.database import get_session
from api_prototype.security import get_current_user
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from sqlmodel import Session

router = APIRouter()

# アップロードされたファイルを保存するディレクトリ
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/models/", response_model=schemas.ModelRead)
def upload_model(
    *,
    db: Session = Depends(get_session),
    current_user: db_models.User = Depends(get_current_user),
    model_file: UploadFile = File(...),
):
    # ファイルをサーバーに保存
    file_path = UPLOAD_DIR / model_file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(model_file.file, buffer)

    # DBにメタデータを保存
    db_model = db_models.Model(
        name=model_file.filename, path=str(file_path), user_id=current_user.id
    )
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model


@router.get("/models/", response_model=list[schemas.ModelRead])
def handle_get_models(
    offset: int = 0, limit: int = 100, db: Session = Depends(get_session)
):
    models = crud.get_models(db, offset=offset, limit=limit)
    return models


# モデル削除する必要があるかどうか？
@router.delete("/models/{model_id}", status_code=status.HTTP_204_NO_CONTENT)
def handle_delete_model(
    model_id: int,
    db: Session = Depends(get_session),
    current_user: db_models.User = Depends(get_current_user),
):
    model_to_delete = crud.get_model(db, model_id=model_id)
    if not model_to_delete:
        raise HTTPException(status_code=404, detail="Model not found")
    if model_to_delete.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this model",
        )
    crud.delete_model(db, model_id=model_id)
    try:
        Path(model_to_delete.path).unlink()
    except OSError as e:
        print(f"Error deleting file {model_to_delete.path}: {e}")
    return
