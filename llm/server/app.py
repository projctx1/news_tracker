import os
import sys
import json

from flask import Flask

current_dir = os.path 

from pathlib import Path

# Get the current working directory
current_path = Path.cwd()

# Get the parent directory
parent_path = current_path.parent

print("Current path:", current_path)
print("Parent path:", parent_path) 

current_path = os.getcwd()

# Get the parent directory
parent_path = os.path.dirname(current_path)

print("Current path:", current_path)
print("Parent path:", parent_path) 

current_path = Path.cwd()
parent_path = current_path.parent

# Log the contents of the current path
print("--- Contents of Current Path ---")
if current_path.is_dir():
    for item in current_path.iterdir():
        print(item)
else:
    print(f"Error: '{current_path}' is not a directory.")

print("\n" + "="*30 + "\n")

# Log the contents of the parent path
print("--- Contents of Parent Path ---")
if parent_path.is_dir():
    for item in parent_path.iterdir():
        print(item)
else:
    print(f"Error: '{parent_path}' is not a directory.")
    
    
paths_to_check = [
'/app'
]

# Iterate through each path and attempt to log its contents
for path_str in paths_to_check:
    path = Path(path_str)

    print(f"\n--- Checking contents of: {path} ---")

    # Check if the path exists
    if not path.exists():
        print("  Status: Path does not exist.")
        continue

    # Handle cases where the path is a file (e.g., /.dockerenv)
    if path.is_file():
        print(f"  Status: '{path.name}' is a file.")
        continue

    # Check if the path is a directory and we have permission to list it
    if path.is_dir():
        try:
            print("  Contents:")
            for item in path.iterdir():
                print(f"    - {item}") 
        except PermissionError:
            print("  Status: Permission denied. Cannot access this directory.")
    else:
        print("  Status: Path exists but is neither a file nor a directory.")

app = Flask(__name__)   

from services.playground import creative_brainstorming_with_ollama

model = "deepseek-r1:7b" 
user_idea = "Generate new ideas for sustainable packaging for food delivery."

server_path = Path('/app/server')

print(f"\n--- Checking contents of: {server_path} ---")

# Check if the path exists and is a directory
if server_path.is_dir():
    try:
        print("  Contents:")
        for item in server_path.iterdir():
            print(f"    - {item}")
    except PermissionError:
        print("  Status: Permission denied. Cannot access this directory.")
else:
    print("  Status: Path does not exist or is not a directory.")
    
files_path = Path('/app/server/files')

print(f"\n--- Checking contents of: {files_path} ---")

# Check if the path exists and is a directory
if files_path.is_dir():
    try:
        print("  Contents:")
        for item in files_path.iterdir():
            print(f"    - {item}")
    except PermissionError:
        print("  Status: Permission denied. Cannot access this directory.")
else:
    print("  Status: Path does not exist or is not a directory.")
    
    
file_path = Path('/app/server/files/index.html')

print(f"\n--- Reading contents of: {file_path} ---")

# Check if the path exists and is a file
if file_path.is_file():
    try:
        # Open the file and read its contents
        with open(file_path, 'r') as file:
            contents = file.read()
            print("\n  File Contents:")
            print(contents)
    except FileNotFoundError:
        print("  Status: File not found.")
    except PermissionError:
        print("  Status: Permission denied. Cannot read this file.")
    except Exception as e:
        print(f"  An unexpected error occurred: {e}")
else:
    print("  Status: Path does not exist or is not a file.")

'''ollama_response = creative_brainstorming_with_ollama(model, user_idea)
 
if ollama_response and ollama_response.status_code == 200:
    response_data = ollama_response.json()
    print("\nOllama API Response:")
    print("--------------------")
    print(response_data['response'])
    print("\n--- Raw JSON Response ---") 
    print(json.dumps(response_data, indent=2))
else:
    print("Failed to get a response from the Ollama API.")'''
 
@app.route('/')  
def hello_world(): 
    return 'Hello, Docker now and next!'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3002))
    host = os.getenv('HOST', '0.0.0.0')

    app.run(debug=True, host='0.0.0.0', port=port) 