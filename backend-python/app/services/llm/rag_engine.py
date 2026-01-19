from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from app.core.config import settings

class RAGEngine:
    def __init__(self):
        # 1. Setup LLM 
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.3
        )

        # 2. Setup Embeddings
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        # 3. Connect to Pinecone
        self.vector_store = PineconeVectorStore(
            index_name=settings.PINECONE_INDEX_NAME,
            embedding=self.embeddings,
            pinecone_api_key=settings.PINECONE_API_KEY
        )

    def get_answer(self, book_id: str, question: str):
        """
        Retrieves context and answers the question.
        """
        # A. Create a Retriever specific to this book
        # We filter by 'book_id' so we don't search other books!
        retriever = self.vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5, "filter": {"book_id": book_id}} 
        )

        # B. Define the Prompt
        template = """You are a helpful AI tutor assisting a student with a textbook.
        Use the following pieces of retrieved context to answer the question.
        If the answer is not in the context, say you don't know. Keep it concise.

        Context:
        {context}

        Question: {question}
        
        Answer:"""
        
        prompt = ChatPromptTemplate.from_template(template)

        # C. Build the Chain (The RAG Pipeline)
        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)

        rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | self.llm
            | StrOutputParser()
        )

        # D. Execute the Chain and return answer 
        print(f"🤔 Thinking about: {question} for book {book_id}...")
        return rag_chain.invoke(question)