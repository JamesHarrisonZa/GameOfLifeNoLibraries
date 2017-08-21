FROM nginx:alpine
COPY . /usr/share/nginx/html

#--<< Docker Commands >>--
#Using image and container tag/name: gol
#docker build -t gol .
#docker run -d --rm --name gol -P gol
#Mapped to random port. See which one by running
#docker ps 