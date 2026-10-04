from pydantic import BaseModel, EmailStr, Field


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=2000)


class Contact(ContactIn):
    id: int
    created_at: str
