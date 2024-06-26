from fastapi import FastAPI, Depends, HTTPException, status, Request, APIRouter, staticfiles
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory='templates')




class Item(BaseModel):
    foodName: str
    price: int
    quantity: int

class Cart(BaseModel):
    items: List[Item]

@app.get('/')
def index(request: Request):
    return templates.TemplateResponse('main.html', {'request': request})




@app.post("/checkout")
async def checkout(cart: Cart):
    print(f"{cart = }")
    try:
        total = sum(item.price * item.quantity for item in cart.items)
        print(f"{total = }")
        return {"message": f"We have received {cart}", "total": total}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

link = 'http://127.0.0.1:8000'



for route in app.routes[3:]:
    print(f'{link}{route.path }')
#run command: uvicorn main:app --reload