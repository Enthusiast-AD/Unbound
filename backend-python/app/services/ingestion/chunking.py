from langchain_text_splitters import RecursiveCharacterTextSplitter

class ChunkingService:
    def __init__(self, chunk_size=1000, chunk_overlap=200):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n## ", "\n### ", "\n", " ", ""]
        )

    def chunk_text(self, text: str, metadata: dict = {}):
        """
        Splits text into chunks and attaches metadata (book_id) to each.
        """
        chunks = self.splitter.create_documents([text], metadatas=[metadata]) 
        print(f"✂️  Split text into {len(chunks)} chunks.")
        return chunks