# UsbPiAPI
## Simple API inside Docker 🐳 to remotely power on/off your Raspberry USBs (tested on Raspberry Pi 4 8GB

### To build Docker image (remember to change env variables in Dockerfile)
>docker build --rm --pull -f Dockerfile -t usb-api:latest .

## To run the container
>docker run --privileged -p443:443 --restart=always --name usbpiapi -v /etc/letsencrypt:/etc/letsencrypt -d usb-api
