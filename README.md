<p align="center">
  <img src="./design/Logo-Teal-50.svg" width="300"/>
</p>

# SanctuAIry

**SanctuAIry** is a privacy-first, AI-powered therapeutic assistant. It leverages large language models (LLMs) to simulate therapeutic conversations while prioritizing user confidentiality, privacy, and data security.

## Overview

SanctuAIry is designed to run securely in the cloud within **confidential virtual machines (VMs)**, ensuring that **sensitive user data**—such as therapy sessions and mental health assessments—remains protected and private.

The app aims to provide an empathetic, intelligent, and responsive AI therapist experience by using open-source LLMs, currently powered by **Meta’s LLama 3.2** models.

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

## Project Status

🚧 SanctuAIry is a **work in progress**. The app is under constant iteration with new features and improvements being added weekly.

## Tech Stack

-   **Frontend**: React and TailwindCSS
-   **LLM Manager**: Node.js and Express
-   **LLM Core**: Ollama, using Meta's LLama 3.2

## Running Locally with Docker Compose

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

## Infrastructure: Deploying Confidential VM with Terraform

SanctuAIry provides Terraform scripts to deploy the backend LLM Core into a **Google Cloud confidential VM**. This setup ensures your LLM runs in a secure, hardware-backed environment.

### Prerequisites

-   [Terraform](https://developer.hashicorp.com/terraform/downloads) (v1.2 or newer)
-   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`)
-   A Google Cloud project with billing enabled and sufficient quota for confidential VMs
-   Permissions to create Compute Engine resources

### Setup & Deployment

1. **Navigate to the infrastructure folder:**

    ```bash
    cd infrastructure
    ```

2. **Copy and edit the Terraform variables file:**

    ```bash
    cp terraform.tfvars.example terraform.tfvars
    ```

    Edit `terraform.tfvars` and set your `project_id`, `region`, and (optionally) `golden_image_project_id`.

3. **Authenticate with Google Cloud:**

    ```bash
    gcloud auth application-default login
    gcloud config set project <your-project-id>
    ```

4. **Initialize Terraform:**

    ```bash
    terraform init
    ```

5. **Review the planned changes:**

    ```bash
    terraform plan
    ```

6. **Apply the deployment:**

    ```bash
    terraform apply
    ```

    Confirm when prompted.

7. **(Optional) Destroy resources when done:**

    ```bash
    terraform destroy
    ```

### What Gets Deployed?

-   A confidential VM running the LLM Core Docker container
-   A firewall rule to allow attestation traffic
-   All necessary network and disk resources

**The deployed VM uses a golden image boot disk with Docker pre-installed and a service that, at each boot, pulls the newest image of the `llm-core`.**

**The VM leverages confidential computing to keep AI inference secure. The LLM Core code runs inside a hardware-backed Trusted Execution Environment (TEE), ensuring that all inference and data processing remain confidential and protected from the underlying cloud provider.**

The VM will automatically install Docker (if not present), pull the latest `sanctuairy/llm-core` image, and run it as a service.

## Acknowledgements

-   Meta AI for the open-source LLama models
-   The open-source community for tools and inspiration ❤️
