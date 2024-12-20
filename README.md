# Установка
1. Скопировать URL репозитория;
2. Выбрав нужную директорию локального сервера в командной строке, ввести git clone;
## Установка backend: 
0. Перейти в раздел backend-laravel проекта с помощью комманды cd backend-laravel;
1. Создать базу в MySQL;
2 .Отредактировать файл env (или env.example и убрать example), добавив туда название новой базы и заменив sqlite на mysql в строке DB_CONNECTION;
3. Выполнить команду composer install;
4. Выполнить команду php artisan migrate;
5. Выполнить команду php artisan key:generate;
6. Выполнить команду php artisan jwt:secret;
7. Запустить сервер, используя команду php artisan serve;
## Установка frontend:
0. Перейти в раздел frontend-react проекта с помощью комманды cd frontend-react;
1. Выполнить команду npm install;
2. Выполнить команду npm run dev;
