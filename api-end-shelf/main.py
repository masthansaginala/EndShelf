from fastapi import Depends, FastAPI, HTTPException
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to End-shelf-API"}
