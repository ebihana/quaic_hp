import os
from sqlmodel import create_engine, Session, SQLModel

# Vercelの環境変数からデータベースURLを取得
DATABASE_URL = os.environ.get("DATABASE_URL")

# テーブルが作成済みかどうかのフラグ
tables_created = False

# 本番環境 (Vercel) ではDATABASE_URLを使い、
# ローカル環境ではSQLiteを使うように設定を分岐
if DATABASE_URL:
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
    global tables_created
    if not tables_created:
        print("テーブルの存在を確認し、必要であれば作成します...")
        SQLModel.metadata.create_all(engine)
        tables_created = True
        print("テーブルの準備が完了しました。")

def get_session():
    # DBセッションを取得する前に、必ずテーブル作成処理を呼び出す
    create_db_and_tables()
    with Session(engine) as session:
        yield session
