from api_prototype import db_models, schemas, security
from sqlmodel import Session, select

# user関連の操作
def get_user(db: Session, user_id: int):
    return db.get(db_models.User, user_id)


def get_user_by_name(db: Session, name: str):
    statement = select(db_models.User).where(db_models.User.name == name)
    return db.exec(statement).first()


def get_users(db: Session, offset: int = 0, limit: int = 100):
    statement = select(db_models.User).offset(offset).limit(limit)
    return db.exec(statement).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = db_models.User(
        name=user.name, email=user.email, password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    user = db.get(db_models.User, user_id)
    if not user:
        return None  # ユーザーが存在しない
    # 関連モデルのuser_idをクリア
    statement = select(db_models.Model).where(
        db_models.Model.user_id == user_id
    )
    models_to_update = db.exec(statement).all()
    for model_item in models_to_update:
        model_item.user_id = None
        db.add(model_item)

    db.delete(user)
    db.commit()
    return user


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = db.get(db_models.User, user_id)
    if not db_user:
        return None
    user_data = user_update.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# model関連の操作
def create_user_model(db: Session, model: schemas.ModelCreate, user_id: int):
    # user_idはリクエストボディではなく認証情報から受け取る
    db_model = db_models.Model(**model.model_dump(), user_id=user_id)
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model


def get_models_by_user(db: Session, user_id: int, offset: int, limit: int):
    statement = (
        select(db_models.Model)
        .where(db_models.Model.user_id == user_id)
        .offset(offset)
        .limit(limit)
    )
    return db.exec(statement).all()


def get_model(db: Session, model_id: int) -> db_models.Model | None:
    return db.get(db_models.Model, model_id)


def get_models(
    db: Session, offset: int = 0, limit: int = 100
) -> list[db_models.Model]:
    statement = select(db_models.Model).offset(offset).limit(limit)
    return db.exec(statement).all()


def delete_model(db: Session, model_id: int) -> db_models.Model | None:
    db_model = db.get(db_models.Model, model_id)
    if not db_model:
        return None
    db.delete(db_model)
    db.commit()
    return db_model


def get_user_by_email(session: Session, email: str):
    return session.exec(select(db_models.User).where(db_models.User.email == email)).first()

def create_thread(db: Session, title: str, body: str, author_id: int) -> db_models.Thread | None:
    db_thread = db_models.Thread(title=title, body=body, author_id=author_id)
    db.add(db_thread)
    db.commit()
    db.refresh(db_thread)
    return db_thread

def get_threads(db: Session, skip: int = 0, limit: int = 20) -> list[db_models.Thread]:
    statement = (
        select(db_models.Thread)
        .order_by(db_models.Thread.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return db.exec(statement).all()
