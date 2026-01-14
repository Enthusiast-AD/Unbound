### backend-python — Project structure

```text
backend-python/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Entry point for the FastAPI server (Chat API)
│   ├── worker.py               # Entry point for the background worker (PDF processor)
│   │
│   ├── api/                    # API route handlers
│   │   ├── __init__.py
│   │   ├── dependencies.py     # Dependency injection (VectorDB, Settings)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── chat.py         # Endpoints for RAG chat (/chat/message)
│   │       └── quiz.py         # Endpoints for generating quizzes
│   │
│   ├── core/                   # Configuration & constants
│   │   ├── __init__.py
│   │   ├── config.py           # Pydantic settings (loads .env)
│   │   └── prompts.py          # System prompts (e.g., Socratic, Beginner)
│   │
│   ├── db/                     # Database connectors
│   │   ├── __init__.py
│   │   ├── chromaDB.py           # Qdrant/Pinecone connection logic
│   │   └── redis.py            # Redis connection (queue/cache)
│   │
│   ├── schemas/                # Pydantic models (data validation)
│   │   ├── __init__.py
│   │   ├── chat_schema.py      # Request/response shapes for chat
│   │   └── job_schema.py       # Job payload shape (from Node.js)
│   │
│   └── services/               # Business logic
│       ├── __init__.py
│       ├── ingestion/
│       │   ├── __init__.py
│       │   ├── docling_parser.py   # Wrapper for Docling (PDF → Markdown)
│       │   └── chunking.py         # Markdown chunking
│       │
│       └── llm/
│           ├── __init__.py
│           ├── rag_engine.py       # Retrieval + generation (LangChain)
│           ├── embeddings.py       # Vector generation (OpenAI/HuggingFace)
│           └── quiz_engine.py      # MCQ generation logic
│
├── tests/                      # Pytest tests
├── .env                        # Environment variables (API keys, DB URLs)
├── .gitignore
├── requirements.txt            # Python dependencies
└── Dockerfile                  # Containerization
```