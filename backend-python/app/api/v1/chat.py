from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm.rag_engine import RAGEngine

router = APIRouter()
rag_engine = RAGEngine() # Initialize the RAG Engine

# Define the Request Body
class ChatRequest(BaseModel):
    bookId: str
    message: str

@router.post("/message")
async def chat_with_book(request: ChatRequest):
    try:
        if not request.bookId or not request.message:
            raise HTTPException(status_code=400, detail="Missing bookId or message")
            
        answer = rag_engine.get_answer(request.bookId, request.message)
        
        return {"response": answer}

    except Exception as e:
        print(f"Error generating chat response: {e}")
        raise HTTPException(status_code=500, detail="AI processing failed")