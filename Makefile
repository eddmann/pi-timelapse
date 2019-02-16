DOCKER_REPO_IMAGE="eddmann/pi-timelapse"
HYPRIOT_OS="https://github.com/hypriot/image-builder-rpi/releases/download/v1.10.0-rc2/hypriotos-rpi-v1.10.0-rc2.img.zip"

docker-build:
	docker build -t $(DOCKER_REPO_IMAGE) .

docker-publish:
	docker push $(DOCKER_REPO_IMAGE):latest

hypriot-flash:
	flash \
		--hostname timelapse \
		--userdata hypriot/user-data.yml \
		--bootconf hypriot/boot-config.txt \
		$(HYPRIOT_OS)
