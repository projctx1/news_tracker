import requests
import json

ollama_url = "http://ollama-server:11434/api/generate"

def creative_brainstorming_with_ollama(model_name: str, user_prompt: str) -> requests.Response:
    system_message = (
        "You are a creative brainstorming assistant. Your goal is to generate novel and diverse ideas "
        "for the user's prompt. Do not limit your responses to the most common or obvious solutions. "
        "Think outside the box and provide a variety of unique suggestions."
    )
    
    full_prompt = f"{system_message}\n\nUser's Request: {user_prompt}"
    
    payload = {
        "model": model_name,
        "prompt": full_prompt,
        "stream": False,
        "options": {
            "temperature": 0.9,
            "top_p": 0.99,
            "top_k": 40,
            "num_predict": 512,
            "stop": ["\n\n"],
        }
    }
    
    try:
        response = requests.post(ollama_url, data=json.dumps(payload))
        response.raise_for_status()
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error making API call to Ollama: {e}")
        # You might want to provide more details about the connection issue here.
        print("Please ensure the Ollama server is running on your host machine and reachable.")
        return None

