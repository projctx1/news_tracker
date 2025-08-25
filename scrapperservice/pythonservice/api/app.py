import os
import sys
import json

from flask import Flask

from pathlib import Path

from utils.marketdata_agent import marketdata_agent

os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"

current_dir = os.path 

app = Flask(__name__)  

marketdata_agent()

@app.route('/')  
def hello_world(): 
    return 'Welcome to the Python scrapper service'

if __name__ == '__main__':
    port = int(os.getenv('PORT'))
    host = os.getenv('HOST', '0.0.0.0')

    app.run(debug=True, host='0.0.0.0', port=port) 