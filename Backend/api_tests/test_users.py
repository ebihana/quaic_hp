# tests/test_users.py

from fastapi.testclient import TestClient
from sqlmodel import Session

from api_prototype.db_models import User


def test_create_user(client: TestClient):
    """ユーザー新規作成のテスト"""
    response = client.post(
        "/users/",
        json={
            "name": "newuser",
            "email": "new@example.com",
            "password": "newpassword",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "newuser"
    assert data["email"] == "new@example.com"
    assert "password" not in data


def test_create_user_duplicate_name(client: TestClient, test_user: User):
    """重複したユーザー名での作成が失敗することを確認"""
    response = client.post(
        "/users/",
        json={
            "name": test_user.name,
            "email": "another@example.com",
            "password": "password",
        },
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Username already registered"


def test_read_users_me(client: TestClient, auth_token: str, test_user: User):
    """認証済みユーザーが自身の情報を取得できるかテスト"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == test_user.name
    assert data["email"] == test_user.email


def test_update_user(client: TestClient, auth_token: str, test_user: User):
    """ユーザーが自身の情報を更新できるかテスト"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.patch(
        f"/users/{test_user.id}",
        json={"email": "updated@example.com"},
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "updated@example.com"


def test_update_user_unauthorized(
    client: TestClient, auth_token: str, test_user: User
):
    """他のユーザー情報を更新しようとして失敗するかテスト"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    # 存在しない user_id=999 を指定
    response = client.patch(
        "/users/999",
        json={"email": "hacker@example.com"},
        headers=headers,
    )
    assert response.status_code == 403  # Forbidden


def test_delete_user(
    client: TestClient, auth_token: str, test_user: User, session: Session
):
    """ユーザーが自身のアカウントを削除できるかテスト"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.delete(f"/users/{test_user.id}", headers=headers)
    assert response.status_code == 204  # No Content

    # ユーザーがDBから削除されたことを確認
    deleted_user = session.get(User, test_user.id)
    assert deleted_user is None
