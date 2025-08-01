# tests/conftest.py

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine

from api_prototype import db_models
from api_prototype.database import get_session
from api_prototype.db_models import User
from api_prototype.main import app
from api_prototype.security import get_password_hash

# テスト用のインメモリSQLiteデータベースを使用 NOTE:テスト用を用いるとなぜか失敗してしまう
# DATABASE_URL = "sqlite:///:memory:"
DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(
    DATABASE_URL, echo=False, connect_args={"check_same_thread": False}
)


# テスト用のセッションを提供するfixture
@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    SQLModel.metadata.drop_all(engine)


# テスト用のTestClientを提供するfixture
@pytest.fixture(name="client")
def client_fixture(session: Session):
    # 依存関係をオーバーライドして、テスト用セッションを使用するようにする
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


# テスト用のユーザーを作成するfixture
@pytest.fixture(name="test_user")
def user_fixture(session: Session) -> User:
    user = User(
        name="testuser",
        email="test@example.com",
        password=get_password_hash("password"),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


# 認証済みのテストユーザーのトークンを取得するfixture
@pytest.fixture(name="auth_token")
def auth_token_fixture(client: TestClient, test_user: User):
    login_data = {"username": test_user.name, "password": "password"}
    response = client.post("/login", data=login_data)
    assert response.status_code == 200
    token = response.json()["access_token"]
    return token
