docker-compose up -d 

# make sure the postgres container is ready, then run migrations
sleep 4
python manage.py makemigrations 
python manage.py migrate
sleep 3
python manage.py runserver
