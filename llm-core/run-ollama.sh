#!/bin/bash

echo "Starting Ollama server..."
ollama serve &

echo "Waiting for Ollama server to be active..."
while [ "$(ollama list | grep 'NAME')" == "" ]; do
  sleep 1
done

echo "The Ollama server is up!"

ollama create sanctuairy-model -f ./Modelfile

ollama rm llama3.2:latest

wait $!
