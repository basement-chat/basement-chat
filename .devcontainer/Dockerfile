# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.0/containers/php/.devcontainer/base.Dockerfile

# [Choice] PHP version (use -bullseye variants on local arm64/Apple Silicon): 8, 8.1, 8.0, 7, 7.4, 7.3, 8-bullseye, 8.1-bullseye, 8.0-bullseye, 7-bullseye, 7.4-bullseye, 7.3-bullseye, 8-buster, 8.1-buster, 8.0-buster, 7-buster, 7.4-buster
ARG VARIANT="8.1-apache-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/php:0-${VARIANT}

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends libzip-dev zip chromium \
    && docker-php-ext-install zip

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1

# Turn off Xdebug coverage
RUN sudo sh -c "echo 'xdebug.mode = coverage' >> /usr/local/etc/php/conf.d/xdebug.ini"

# Create the vs-code extension directory.
RUN mkdir -p /home/vscode/.vscode-server/extensions \
    /home/vscode/.vscode-server-insiders/extensions \
    && chown -R vscode \
    /home/vscode/.vscode-server \
    /home/vscode/.vscode-server-insiders
