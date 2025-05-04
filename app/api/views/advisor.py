from fastapi import APIRouter
import requests
import googletrans

router = APIRouter()

@router.get("/")
async def translate_advice():
    url = "https://api.adviceslip.com/advice"
    r = requests.get(url)
    advice = r.json()['slip']['advice']

    translator = googletrans.Translator()
    tarjima = await translator.translate(advice, dest='uz')

    dict_to_return = {
        "eng": advice,
        "uzb": tarjima.text,
    }

    return dict_to_return

