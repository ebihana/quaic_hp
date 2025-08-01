from datetime import timedelta

from api_prototype import crud, security
from api_prototype.config import settings
from api_prototype.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

router = APIRouter()


@router.post("/login")
def login_for_access_token(
    session: Session = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = crud.get_user_by_email(session, email=form_data.username)
    if not user or not security.verify_password(
        form_data.password, user.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = security.create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
