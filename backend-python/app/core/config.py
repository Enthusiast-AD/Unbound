from dotenv import load_dotenv
load_dotenv()

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "Unbound"
    ENVIRONMENT: str = "development"
    
    # Database
    MONGO_URI: str
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    
    # AI Keys
    GEMINI_API_KEY: str

    # Pinecone
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str = "unbound-index"


    class Config:
        env_file = ".env"

settings = Settings()