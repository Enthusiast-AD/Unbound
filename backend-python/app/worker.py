import asyncio
import os
from bullmq import Worker
from app.core.config import settings
from app.services.ingestion.docling_parser import DoclingParserService
from pymongo import MongoClient
from bson import ObjectId

# 1. Connect to MongoDB (to update status)
mongo_client = MongoClient(settings.MONGO_URI)
db = mongo_client.UnboundDB # Make sure this matches your DB name
books_collection = db.books

# 2. Initialize Parser
parser = DoclingParserService()

async def process_pdf(job, token):
    """
    This function runs whenever Node.js sends a job.
    """
    try:
        data = job.data
        book_id = data.get("bookId")
        file_url = data.get("fileUrl")

        print(f"🚀 [Worker] Received Job for Book: {book_id}")

        # A. Update DB -> Processing
        books_collection.update_one(
            {"_id": ObjectId(book_id)}, 
            {"$set": {"processingStatus": "processing"}}
        )

        # B. Run Docling (Heavy Lifting)
        markdown_content = parser.process_file(file_url)
        print(f"✅ [Worker] PDF Parsed! Length: {len(markdown_content)} chars")

        # C. Update DB -> Completed
        # (Later we will save the actual structure here)
        books_collection.update_one(
            {"_id": ObjectId(book_id)}, 
            {
                "$set": {
                    "processingStatus": "completed",
                    "pageCount": 10 # Mock for now
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
        }}
    )
    
    print(f"👷 Python Worker Listening on Queue: pdfQueue...")
    
    # Keep the worker running
    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())