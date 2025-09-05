import os
from sqlmodel import create_engine, Session, SQLModel

# Vercelの環境変数からデータベースURLを取得
DATABASE_URL = os.environ.get("DATABASE_URL")

# 本番環境 (Vercel) ではDATABASE_URLを使い、
# ローカル環境ではSQLiteを使うように設定を分岐
if DATABASE_URL:
    # 'postgres://' を 'postgresql://' に置換（SQLAlchemyの要件）
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    engine = create_engine(DATABASE_URL)
else:
    # ローカル開発用のSQLite設定
    sqlite_file_name = "database.db"
    sqlite_url = f"sqlite:///{sqlite_file_name}"
    engine = create_engine(
        sqlite_url, connect_args={"check_same_thread": False}
    )

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
