from sqlmodel import SQLModel
from datetime import datetime
from pydantic import BaseModel


class UserBase(SQLModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int


class UserUpdate(SQLModel):
    name: str | None = None
    email: str | None = None


class ModelBase(SQLModel):
    name: str
    path: str | None = None
    rating: float | None = None
    win_rate: float | None = None


class ModelCreate(ModelBase):
    pass


class ModelRead(ModelBase):
    id: int
    user_id: int | None

class ThreadCreate(BaseModel):
    title: str
    body: str

class ThreadRead(BaseModel):
    id: int
    title: str
    body: str
    author_id: int
    created_at: datetime