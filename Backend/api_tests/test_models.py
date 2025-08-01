# tests/test_models.py

import os
from io import BytesIO
from pathlib import Path

from fastapi.testclient import TestClient
from sqlmodel import Session

from api_prototype.db_models import Model, User

UPLOAD_DIR = Path("uploads")


def test_upload_model(client: TestClient, auth_token: str, test_user: User):
    """モデルファイルのアップロードをテスト"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    # ダミーのファイルを作成
    dummy_file_content = b"This is a dummy model file."
    dummy_file = (
        "test_model.bin",
        BytesIO(dummy_file_content),
        "application/octet-stream",
    )

    response = client.post(
        "/models/", files={"model_file": dummy_file}, headers=headers
    )

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "test_model.bin"
    assert data["user_id"] == test_user.id

    # アップロードされたファイルが実際に存在するか確認
    file_path = UPLOAD_DIR / "test_model.bin"
    assert file_path.exists()

    # テスト後にファイルを削除
    os.remove(file_path)


def test_get_models(client: TestClient, session: Session, test_user: User):
    """モデル一覧取得のテスト"""
    # テスト用のモデルをDBに作成
    model1 = Model(name="model1", user_id=test_user.id, path="/path/1")
    model2 = Model(name="model2", user_id=test_user.id, path="/path/2")
    session.add_all([model1, model2])
    session.commit()

    response = client.get("/models/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "model1"


def test_delete_model(
    client: TestClient, auth_token: str, session: Session, test_user: User
):
    """モデルの削除をテスト"""
    # テスト用のファイルとDBレコードを作成
    file_path = UPLOAD_DIR / "deletable_model.bin"
    with open(file_path, "w") as f:
        f.write("delete me")

    model = Model(
        name="deletable_model.bin", user_id=test_user.id, path=str(file_path)
    )
    session.add(model)
    session.commit()
    session.refresh(model)

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.delete(f"/models/{model.id}", headers=headers)

    assert response.status_code == 204

    # DBから削除されたことを確認
    deleted_model = session.get(Model, model.id)
    assert deleted_model is None

    # ファイルが削除されたことを確認
    assert not file_path.exists()


def test_delete_model_unauthorized(
    client: TestClient, auth_token: str, session: Session
):
    """他人のモデルを削除しようとして失敗するかテスト"""
    # 他のユーザーが所有するモデルを作成 (user_id=999)
    other_user_model = Model(
        name="other_model", user_id=999, path="/path/other"
    )
    session.add(other_user_model)
    session.commit()
    session.refresh(other_user_model)

    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.delete(f"/models/{other_user_model.id}", headers=headers)

    assert response.status_code == 403  # Forbidden
