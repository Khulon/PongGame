import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage

# Set up logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

# Set up the Telegram Bot API token
TOKEN = '6051468752:AAGS30iFWpUEi8EAojbRXRDlyWNu6O4zhQg'

# Set up the game short name
GAME_SHORT_NAME = 'pongrally'

# Create a Bot instance
bot = Bot(token=TOKEN)

# Create a Dispatcher instance
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)

# Define the conversation start phrase
START_PHRASE = "@pongrallybot"

# Store the high scores for each chat
chat_high_scores = {}

# Define the callback function for handling the game button click
async def play_game(callback_query: types.CallbackQuery):
    # Get the chat and user IDs
    logging.info(f"hello")

    chat_id = 'null'
    user_id = 'null'
    message_id = 'null'
    inline_message_id = 'null'

    if callback_query.message:
        message_id = callback_query.message.message_id
    if callback_query.message and callback_query.message.chat:
        chat_id = callback_query.message.chat.id

    inline_message_id = callback_query.inline_message_id
    user_id = callback_query.from_user.id

    # Build the URL with query parameters
    #base_url = "https://64a16caa22c0774d8d878959--khulonpong.netlify.app/"
    base_url = "http://localhost:19006/"
    url = f"{base_url}{chat_id}/{user_id}/{message_id}/{inline_message_id}"
    logging.info(f"{url}")

    # Open the game URL in the user's browser
    await bot.answer_callback_query(callback_query.id, url=url)

# Define the command handler for initiating the conversation
@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    chat_id = message.chat.id

    # Send a message with the game and a "Play Game" button
    game_message = await bot.send_game(chat_id, game_short_name=GAME_SHORT_NAME)

    # Store the game message ID in chat_high_scores
    chat_high_scores[chat_id] = {"game_message_id": game_message.message_id, "scores": {}}

# Define the inline query handler for handling inline queries
@dp.inline_handler()
async def inline_query_handler(inline_query: types.InlineQuery):
    if inline_query.query == '':
        game_result = types.InlineQueryResultGame(
            id='1',
            game_short_name=GAME_SHORT_NAME,
            reply_markup=types.InlineKeyboardMarkup(inline_keyboard=[
                [types.InlineKeyboardButton(text="Play Game!", callback_game=GAME_SHORT_NAME)]
            ]),
        )

        # Answer the inline query with the game result
        await bot.answer_inline_query(inline_query.id, results=[game_result])

# Define the callback query handler for handling game button clicks
@dp.callback_query_handler(lambda c: c.game_short_name == GAME_SHORT_NAME)
async def button_click(callback_query: types.CallbackQuery):
    await play_game(callback_query)

# Define the handler for updating high scores
@dp.message_handler(content_types=types.ContentType.TEXT)
async def update_high_scores(message: types.Message):
    chat_id = message.chat.id
    logging.info(f"New message in chat {chat_id}: {message.text}")

    # Check if the message contains a new high score
    if message.text.isdigit():
        score = int(message.text)

        # Retrieve the current high scores for the chat
        high_scores = chat_high_scores.get(chat_id, {}).get("scores", {})

        # Check if the score is higher than the existing high score
        if not high_scores or score > max(high_scores.values()):
            # Update the high scores with the new score
            high_scores[message.from_user.username] = score

            # Prepare the service message
            service_message = f"New high score set by {message.from_user.username}: {score}!"

            # Send the service message
            await bot.send_message(chat_id=chat_id, text=service_message)

            # Retrieve the game message ID
            game_message_id = chat_high_scores[chat_id]["game_message_id"]

            # Prepare the updated scoreboard message
            scoreboard_message = "High Scores:\n\n"
            for player, score in high_scores.items():
                scoreboard_message += f"{player}: {score}\n"

            # Store the scoreboard message in chat_high_scores
            chat_high_scores[chat_id]["scoreboard_message"] = scoreboard_message

            # Edit the game message to include the updated scoreboard
            await bot.edit_message_text(chat_id=chat_id, message_id=game_message_id, text=scoreboard_message)

# Run the bot
async def main():
    await dp.start_polling()

asyncio.run(main())
