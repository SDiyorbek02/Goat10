# Python 3.10 asosida Docker image yasaymiz
FROM python:3.10

# Ichki ishchi papkani tanlaymiz
WORKDIR /app

# requirements.txt faylini ko‘chiramiz
COPY requirements.txt .

# Kutubxonalarni o‘rnatamiz
RUN pip install --no-cache-dir -r requirements.txt

# Barcha fayllarni ichki papkaga ko‘chiramiz
COPY . .

# Botni ishga tushuramiz
CMD ["python", "bot.py"]