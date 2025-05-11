#!/bin/bash
uvicorn app.server.app:app --reload --host 0.0.0.0 --port 8000