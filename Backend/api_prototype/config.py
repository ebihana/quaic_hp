from pydantic_settings import BaseSettings, SettingsConfigDict


# 環境関数の設定
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8"
    )

    DATABASE_URL: str = "sqlite:///database.db"
    SECRET_KEY: str = "your-super-secret-and-long-random-key-goes-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Settings()
