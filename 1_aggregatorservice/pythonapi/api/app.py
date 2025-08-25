import os
import sys
import json
from pathlib import Path

from flask import Flask
from dotenv import load_dotenv

from utils.marketdata_agent import marketdata_agent

# Load environment variables from .env file
load_dotenv()

# Access env vars
os.environ["USER_AGENT"] = os.getenv("USER_AGENT", "default-agent")

app = Flask(__name__)  

marketdata_agent()

@app.route('/')
def hello_world(): 
    return 'Welcome to the Python scrapper service'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    app.run(debug=True, host=host, port=port)
