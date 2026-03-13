# Unbound

**Unbound** is an interactive documentation platform that transforms static PDF textbooks into dynamic, web-based learning experiences. By combining structural extraction with a context-aware AI tutor, Unbound bridges the gap between passive reading and active learning.

---

## 🚀 Features

- **PDF Ingestion**: Convert static PDFs into structured, web-friendly content using Docling.
- **Intelligent Structure Mapping**: Automatically generates a Table of Contents (Chapters > Sub-chapters) for easy navigation.
- **RAG Chat Agent**: A context-aware AI assistant that answers questions based *strictly* on the book's content.
- **Interactive Learning**:
  - **Teaching Modes**: Switch between "Beginner", "Socratic", and "Advanced" explanations.
  - **Quiz Generation**: Instantly generate quizzes to test your understanding of a chapter.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React

### **Backend (Orchestration)**
- **Runtime**: Node.js
- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB (Mongoose)
- **Queue**: BullMQ (handling PDF processing jobs)
- **Storage**: UploadThing / Local

### **Backend (AI & Processing)**
- **Framework**: FastAPI (Python)
- **PDF Parsing**: Docling
- **LLM Operations**: LangChain
- **Vector Store**: ChromaDB / Pinecone

---

## 📦 Project Structure

```bash
.
├── backend-node/      # Express.js API (Auth, Uploads, Orchestration)
├── backend-python/    # FastAPI Service (PDF Parsing, RAG, Embeddings)
├── frontend/          # Next.js Client Application
└── docs/              # Documentation & PRD
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Redis (required for BullMQ)
- MongoDB

### 1. Backend (Node.js) Setup

Navigate to the `backend-node` directory:

```bash
cd backend-node
npm install
```

Create a `.env` file based on your configuration, then start the server:

```bash
npm run dev
```

### 2. Backend (Python) Setup

Navigate to the `backend-python` directory:

```bash
cd backend-python
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

Start the FastAPI worker/server:

```bash
# Assuming standard FastAPI entry point
uvicorn app.main:app --reload
```

### 3. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📝 License

This project is licensed under the MIT License.
