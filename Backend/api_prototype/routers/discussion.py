from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from api_prototype.database import get_session
from api_prototype import crud, schemas
from api_prototype.security import get_current_user
from api_prototype.db_models import User

router = APIRouter()

@router.get("/threads/", response_model=list[schemas.ThreadRead])
def list_threads(db: Session = Depends(get_session)):
    return crud.get_threads(db)

@router.post("/threads/", response_model=schemas.ThreadRead)
def create_thread(
    thread: schemas.ThreadCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return crud.create_thread(db, title=thread.title, body=thread.body, author_id=current_user.id)