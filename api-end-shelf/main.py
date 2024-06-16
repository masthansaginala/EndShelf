from fastapi import Depends, FastAPI, HTTPException

@app.get("/")
async def root():
    return {"message": "Hello World"}
