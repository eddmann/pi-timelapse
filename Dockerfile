FROM balenalib/raspberry-pi-debian-node:11.3.0-stretch-run
RUN apt-get update -y && apt-get install libraspberrypi-bin -y
COPY timelapse.js /var/timelapse.js
VOLUME /var/photos
CMD ["node", "/var/timelapse.js"]
