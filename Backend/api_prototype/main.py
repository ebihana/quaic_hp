# test環境ローカルAPI
from contextlib import asynccontextmanager

from api_prototype.database import engine
from api_prototype.routers import login, models, users, discussion
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# CORSミドルウェアなどの設定 ...
origins = [
    "http://localhost:3000", # Reactのデフォルト開発サーバー
    # 必要であれば他のURLも追加できます
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 一時的に全て許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 各ルーターをアプリケーションに含める
app.include_router(login.router, tags=["login"])
app.include_router(users.router, tags=["users"])
app.include_router(models.router, tags=["models"])
app.include_router(discussion.router, tags=["discussion"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the competition site"}
