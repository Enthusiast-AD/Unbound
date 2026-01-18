from pydantic import BaseModel

class PdfJobData(BaseModel):
    bookId: str
    fileUrl: str