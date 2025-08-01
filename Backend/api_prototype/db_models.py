from sqlmodel import Field, SQLModel
from typing import Optional, List
from datetime import datetime, timezone

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    email: str
    password: str


class Model(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    path: str | None = None
    rating: float | None = None
    win_rate: float | None = None
    user_id: int | None = Field(default=None, foreign_key="user.id")
    

class Thread(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    body: str
    author_id: int  # ユーザーID
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))