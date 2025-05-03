#!/bin/bash
set -euxo pipefail

# ─── Install Docker (once) ───────────────────────────────────────
if ! command -v docker >/dev/null 2>&1; then
    echo ">>> Installing Docker..."
    apt-get update
    apt-get install -y docker.io
    systemctl enable docker
else
    echo ">>> Docker already installed"
fi

# ─── Install Go (once) ───────────────────────────────────────────
if [ ! -d /usr/local/go ]; then
    echo ">>> Installing Go..."
    curl -sSL https://go.dev/dl/go1.21.5.linux-amd64.tar.gz -o /tmp/go.tar.gz
    tar -C /usr/local -xzf /tmp/go.tar.gz
    echo 'export PATH=$PATH:/usr/local/go/bin' >/etc/profile.d/go.sh
    chmod +x /etc/profile.d/go.sh
else
    echo ">>> Go already present"
fi

# ─── Create a systemd service for llm-core pulling from Docker Hub
cat <<'EOF' >/etc/systemd/system/llm-core.service
[Unit]
Description=LLM-Core Container Service
After=docker.service
Requires=docker.service

[Service]
Type=simple

# Give pulls/runs up to 5 minutes to succeed
TimeoutStartSec=300

# Pull the latest image on every boot
ExecStartPre=/usr/bin/docker pull sanctuairy/llm-core:latest

# Clean up any old container
ExecStartPre=/usr/bin/docker rm -f llm-core || true

# Launch the container
ExecStart=/usr/bin/docker run \
  --name llm-core \
  -e OLLAMA_HOST=0.0.0.0 \
  -e PORT=11434 \
  -p 11434:11434 \
  sanctuairy/llm-core:latest

Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

# ─── Enable & start the llm-core service ─────────────────────────
systemctl daemon-reload
systemctl enable llm-core.service
systemctl start llm-core.service

echo ">>> init-llm-core-tee.sh completed successfully"
