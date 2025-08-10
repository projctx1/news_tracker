set -a
source .env
set +a

CONTAINER_NAME="ollama-server"
DEEPSEEK_MODEL="deepseek-r1:7b"

echo "Checking for existing ${CONTAINER_NAME} container..."
if docker ps -a | grep -q "${CONTAINER_NAME}"; then
  echo "Stopping and removing existing ${CONTAINER_NAME} container..."
  docker stop "${CONTAINER_NAME}" > /dev/null 2>&1
  docker rm "${CONTAINER_NAME}" > /dev/null 2>&1
fi

if [[ -z $(docker images -q ollama/ollama) ]]; then
  echo "Ollama Docker image not found. Pulling it now..."
  docker pull ollama/ollama
else
  echo "Ollama Docker image found locally. Skipping pull."
fi

echo "Ensuring network exists..."

docker network create $DOCKER_NETWORK || true

echo "Running Ollama server container..."

docker run -d -p 11436:11434 --name "${CONTAINER_NAME}" --network $DOCKER_NETWORK ollama/ollama

echo "Waiting for Ollama to be ready..."

until curl -s http://localhost:11436 > /dev/null; do
  echo "Ollama not ready yet, waiting..."
  sleep 2
done

echo "Ollama is ready, executing one-time command to pull the model..."

docker exec "${CONTAINER_NAME}" ollama pull "${DEEPSEEK_MODEL}"

echo "Running the model..."
docker exec "${CONTAINER_NAME}" ollama run "${DEEPSEEK_MODEL}"
