import asyncio
import os
from bullmq import Worker
from app.core.config import settings
from app.services.ingestion.docling_parser import DoclingParserService
from app.services.ingestion.chunking import ChunkingService   
from app.services.llm.vector_store import VectorStoreService
from pymongo import MongoClient
from bson import ObjectId

# 1. Connect to MongoDB (to update status)
mongo_client = MongoClient(settings.MONGO_URI)
db = mongo_client.UnboundDB # Make sure this matches your DB name
books_collection = db.books

# 2. Initialize Parser
parser = DoclingParserService()

# 3. Initialize Chunker and Vector Store
chunker = ChunkingService()          
vector_store = VectorStoreService()

async def process_pdf(job, token):
    """
    This function runs whenever Node.js sends a job.
    """
    try:
        data = job.data
        book_id = data.get("bookId")
        file_url = data.get("fileUrl")

        print(f"🚀 [Worker] Received Job for Book: {book_id}")

        # Check if book is already completed
        existing_book = books_collection.find_one({"_id": ObjectId(book_id)})
        if existing_book and existing_book.get("processingStatus") == "completed":
            print(f"⚠️ [Worker] Book {book_id} is already completed. Skipping duplicate job.")
            return {"status": "skipped", "reason": "already_completed"}

        # A. Update DB -> Processing
        books_collection.update_one(
            {"_id": ObjectId(book_id)}, 
            {"$set": {"processingStatus": "processing"}}
        )

        # B. Run Docling (returns a dictionary)
        result = parser.process_file(file_url)
        
        markdown_content = result["content"]
        structure = result["structure"]
        page_count = result["page_count"]

        print(f"✅ [Worker] Structure extracted! Found {len(structure)} top-level chapters.")

        # C. Chunking
        print("✂️  Chunking text...")
        chunks = chunker.chunk_text(markdown_content, metadata={"source": file_url})
        
        # D. Embedding & Storing
        print("🧠 Embedding and storing vectors...")
        vector_store.add_chunks(chunks, book_id)

        # E. Update DB -> Completed
        books_collection.update_one(
            {"_id": ObjectId(book_id)}, 
            {
                "$set": {
                    "processingStatus": "completed",
                    "structure": structure,        # <--- Saving the Tree!
                    "pageCount": page_count,
                    # "content": markdown_content    # (Optional) Store full text in DB
                }
            }
        )
        print(f"🎉 [Worker] Job Finished for {book_id}")
        return {"status": "success"}

    except Exception as e:
        print(f"❌ [Worker] Error: {e}")
        # Mark as failed in DB
        books_collection.update_one(
            {"_id": ObjectId(book_id)}, 
            {"$set": {"processingStatus": "failed"}}
        )
        raise e

async def main():
    # 3. Start the BullMQ Worker
    # 'pdf-processing-queue'
    worker = Worker(
        "pdfQueue", 
        process_pdf, 
        {"connection": {
            "host": settings.REDIS_HOST, 
            "port": settings.REDIS_PORT
        },
        "lockDuration": 60000 # Give the worker 60s before Redis retries
        }
    )
    
    print(f"👷 Python Worker Listening on Queue: pdfQueue...")
    
    # Keep the worker running
    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())