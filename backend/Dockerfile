FROM php:8.3-fpm

RUN echo "upload_max_filesize = 10M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 10M" >> /usr/local/etc/php/conf.d/uploads.ini


RUN apt-get update && apt-get install -y \
    libssl-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html


COPY composer.json ./


RUN composer install --no-dev --optimize-autoloader


COPY . .