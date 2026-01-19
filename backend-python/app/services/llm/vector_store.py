import os
import time
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from app.core.config import settings

class VectorStoreService:
    def __init__(self):
        # 1. Initialize Local Model and Pinecone Client
        print("🔌 Loading local embedding model (all-MiniLM-L6-v2)...")
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        self.pc = Pinecone(api_key=settings.PINECONE_API_KEY) 
        self.index_name = settings.PINECONE_INDEX_NAME

        # 2. Create Index if it doesn't exist 
        existing_indexes = [i.name for i in self.pc.list_indexes()]
        if self.index_name not in existing_indexes:
            print(f"🛠️ Creating new Pinecone Index: {self.index_name}")
            self.pc.create_index(
                name=self.index_name,
                dimension=384,  # <--- 384 for all-MiniLM-L6-v2
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1")
            )

    def add_chunks(self, chunks, book_id: str):
        for chunk in chunks:
            chunk.metadata["book_id"] = book_id
        
        vector_store = PineconeVectorStore(
            index_name=self.index_name,
            embedding=self.embeddings,
            pinecone_api_key=settings.PINECONE_API_KEY 
        )
        
        # Batch upload to Pinecone for efficiency 
        batch_size = 100 
        total_chunks = len(chunks)
        
        print(f"🔄 Starting upload of {total_chunks} chunks...")

        for i in range(0, total_chunks, batch_size):
            batch = chunks[i : i + batch_size]
            try:
                vector_store.add_documents(documents=batch)
                print(f"   ✅ Uploaded batch {i} to {i + len(batch)}")
            except Exception as e:
                print(f"   ⚠️ Error on batch {i}: {e}")
                # Simple retry logic
                time.sleep(5)
                vector_store.add_documents(documents=batch)
            
        print(f"☁️  Successfully saved {total_chunks} vectors to Pinecone Cloud for book {book_id}")