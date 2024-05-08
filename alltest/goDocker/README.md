docker-compose build
docker-compose up -d


docker build -t my-php-app .  # Replace "my-php-app" with a desired name
docker run -d -p 80:80 my-php-app  # Replace "my-php-app" with the image name