# tests/test_login.py

from fastapi.testclient import TestClient

from api_prototype.db_models import User


def test_login_for_access_token(client: TestClient, test_user: User):
    """正常なログイン処理のテスト"""
    login_data = {"username": test_user.name, "password": "password"}
    response = client.post("/login", data=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_incorrect_password(client: TestClient, test_user: User):
    """不正なパスワードでのログインが失敗するかテスト"""
    login_data = {"username": test_user.name, "password": "wrongpassword"}
    response = client.post("/login", data=login_data)
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect username or password"}


def test_login_incorrect_username(client: TestClient):
    """存在しないユーザー名でのログインが失敗するかテスト"""
    login_data = {"username": "nonexistentuser", "password": "password"}
    response = client.post("/login", data=login_data)
    assert response.status_code == 401
