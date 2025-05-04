FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt --no-cache-dir

COPY . .

EXPOSE 8000

RUN chmod +x start_api.sh
