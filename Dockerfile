FROM nginx:alpine
COPY . /usr/share/nginx/html

EXPOSE 80

#--<< Docker Commands >>--
#Using image and container tag/name: gol
#Should be running on http://localhost:42420/

#docker build -t gol .
#docker run -d --rm --name gol -p 42420:80 gol