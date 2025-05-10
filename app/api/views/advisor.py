from fastapi import APIRouter, BackgroundTasks
import requests
import googletrans
from app.api.models.advisors import Advisor
from app.api.dependencies.dependencies import db_dependency

router = APIRouter(tags=["advisor"])


@router.get("/advice")
async def get_advice(background_tasks: BackgroundTasks, db: db_dependency):
    """Get advice in English and asynchronously save it with Uzbek translation to database."""
    # Fetch advice from external API
    url = "https://api.adviceslip.com/advice"
    r = requests.get(url)
    advice = r.json()['slip']['advice']

    # Prepare response
    response = {
        "eng": advice,
    }

    # Schedule background task for translation and saving
    background_tasks.add_task(translate_and_save_advice, db, advice)

    # Return response immediately without waiting for translation/DB operations
    return response


async def translate_and_save_advice(db, advice: str):
    """Translate advice to Uzbek and save both versions to database."""
    try:
        translator = googletrans.Translator()
        tarjima = await translator.translate(advice, dest='uz')

        new_advice = Advisor(advice_uzbek=tarjima.text, advice_english=advice)
        db.add(new_advice)
        db.commit()
        db.refresh(new_advice)
    except Exception as e:
        # Log the error (implement proper logging in production)
        print(f"Error in background task: {e}")
