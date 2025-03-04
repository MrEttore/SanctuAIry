FROM ollama/ollama

WORKDIR /app

COPY run-ollama.sh /app/run-ollama.sh
COPY Modelfile /app/Modelfile

RUN chmod +x /app/run-ollama.sh

EXPOSE 11434

ENTRYPOINT ["/bin/bash", "/app/run-ollama.sh"]
