FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl && \
    docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .
RUN composer install

CMD bash -c "php artisan migrate --force && php artisan queue:work --sleep=3 --tries=3 & php artisan serve --host=0.0.0.0 --port=8000"
