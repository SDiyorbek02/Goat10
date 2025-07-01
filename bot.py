from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
import logging
import os

# .env dan token olish
BOT_TOKEN = os.getenv("BOT_TOKEN")  # Railway yoki lokal uchun
# AGAR .env ishlatmasangiz — tokenni to'g'ridan-to'g'ri yozing:
# BOT_TOKEN = "7599951631:AAFGl2XQpxq1_Y15WGebok3SpotjVkkzeUU"

# WebApp manzilingiz (Vercel)
WEBAPP_URL = "https://goat10-webapp-qlhg.vercel.app"

logging.basicConfig(level=logging.INFO)
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    # Inline tugma bilan WebAppga kirish
    keyboard = types.InlineKeyboardMarkup()
    play_button = types.InlineKeyboardButton(
        text="▶️ Play",
        web_app=types.WebAppInfo(url=WEBAPP_URL)
    )
    keyboard.add(play_button)

    await message.answer("👋 Welcome to GOAT10", reply_markup=keyboard)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
