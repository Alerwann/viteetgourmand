FROM php:8.3-fpm

# Installation des dépendances système et extensions PHP
RUN apt-get update && apt-get install -y \
    libssl-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html