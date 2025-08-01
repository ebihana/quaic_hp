from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from api_prototype import crud, db_models, schemas
from api_prototype.database import get_session
from api_prototype.security import get_current_user

router = APIRouter()

@router.post("/users/", response_model=schemas.UserRead)
def handle_create_user(
    user: schemas.UserCreate, db: Session = Depends(get_session)
):
    try:
        return crud.create_user(db=db, user=user)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already registered",
        )


# テスト用
@router.get("/users/me", response_model=schemas.UserRead)
def read_users_me(current_user: db_models.User = Depends(get_current_user)):
    # 認証されたユーザー自身の情報を返す
    return current_user


@router.get("/users/", response_model=list[schemas.UserRead])
def handle_read_users(
    offset: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session),
    current_user: db_models.User = Depends(get_current_user),  # 保護
):
    return crud.get_users(db, offset=offset, limit=limit)


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def handle_delete_user(
    user_id: int,
    db: Session = Depends(get_session),
    current_user: db_models.User = Depends(get_current_user),
):
    # 自分自身のアカウントしか削除できないように認可を追加
    if current_user.id != user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this user"
        )

    deleted_user = crud.delete_user(db, user_id=user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")

    return


@router.patch("/users/{user_id}", response_model=schemas.UserRead)
def handle_update_user(
    user_id: int,
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_session),
    current_user: db_models.User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this user"
        )

    updated_user = crud.update_user(
        db, user_id=user_id, user_update=user_update
    )
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user
