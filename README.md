<p align="center">
  <img src="./design/Logo-Teal-50.svg" width="300"/>
</p>

# SanctuAIry

**SanctuAIry** is a privacy-first, AI-powered therapeutic assistant. It leverages large language models (LLMs) to simulate therapeutic conversations while prioritizing user confidentiality, privacy, and data security.

## Overview

SanctuAIry is designed to run securely in the cloud within **confidential virtual machines (VMs)**, ensuring that **sensitive user data**—such as therapy sessions and mental health assessments—remains protected and private.

The app aims to provide an empathetic, intelligent, and responsive AI therapist experience by using open-source LLMs, currently powered by **Meta’s LLama 3.2** models.

> 🚧 **Work in progress**. The app is under constant iteration with new features and improvements being added weekly.

## Architecture

SanctuAIry is built with a modular architecture, composed of the following key components:

### Frontend

A clean and responsive user interface built with **React**, enabling users to interact with their AI therapist in a seamless way.

### LLM Manager

A backend service layer that:

-   Routes user input to the appropriate LLM instance
-   Manages session context and conversation flow
-   Handles model selection, loading, and creation

### LLM Core

The brain of the application, where the actual LLM runs:

-   Currently utilizes **Meta’s LLama 3.2**
-   Runs in a secured environment to ensure data isolation and confidentiality
-   Designed for performance, context awareness, and therapeutic alignment

## Privacy & Security

SanctuAIry is committed to privacy by design:

-   All processing is planned to occur in **confidential virtual machines** with hardware-backed security guarantees
-   End-to-end encryption for data in transit, in use, and at rest
-   Further planed privancy features:
    -   GDPR compliance
    -   User-defined data retention and deletion policies

## Tech Stack

-   **Frontend**: React and TailwindCSS
-   **LLM Manager**: Node.js and Express
-   **LLM Core**: Ollama, using Meta's LLama 3.2

## How to Run SanctuAIry

SanctuAIry can be run either locally for development or deployed securely in the cloud. Choose the method that best fits your needs:

### Local Deployment with Docker Compose

To start all services locally using Docker Compose, follow these steps:

1. **Prerequisites**: Ensure Docker and Docker Compose are installed on your machine.
2. **Environment**: Copy the example environment file and update the URLs if necessary:

    ```bash
    cp .env.example .env
    # .env:
    # VITE_LLM_MANAGER_URL=http://llm-manager:3000
    # LLM_CORE_URL=http://llm-core:11434
    # NODE_ENV=development
    # PORT=3000
    # OLLAMA_MAX_LOADED_MODELS=2
    ```

3. **Build & Start**: From the project root, run:

    ```bash
    docker-compose up
    ```

### Cloud Deployment with Terraform

To deploy SanctuAIry securely in the cloud using Google Cloud confidential VMs and Terraform, follow the instructions in the [infrastructure/README.md](infrastructure/README.md) file.

## Acknowledgements

-   Meta AI for the open-source LLama models
-   The open-source community for tools and inspiration ❤️
