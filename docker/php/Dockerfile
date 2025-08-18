FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y \
      curl \
    && rm -rf /tmp/* /var/tmp/*

RUN apt-get update \
    && apt-get install -y lsb-release ca-certificates apt-transport-https gnupg curl \
    && curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /usr/share/keyrings/sury-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/sury-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list \
    && apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y \
         php8.4-fpm \
         php8.4-curl \
         php8.4-mysql \
         php8.4-xdebug \
         zip \
         unzip \
         git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY dev.ini /etc/php/8.4/mods-available/dev.ini

RUN phpenmod dev

WORKDIR /opt/project

RUN sed -i 's|/run/php/php8.4-fpm.sock|0.0.0.0:9000|' /etc/php/8.4/fpm/pool.d/www.conf

EXPOSE 9000

CMD ["/usr/sbin/php-fpm8.4", "-F"]
