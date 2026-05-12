FROM node:16-bullseye-slim

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install VTEX Toolbelt
RUN npm install -g vtex@3

# Install uv (for Spec Kit / SDD Full)
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# Install Spec Kit (specify-cli) via uv
RUN uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.6.0

# Verify
RUN node --version && yarn --version && vtex --version && specify version

WORKDIR /workspace
