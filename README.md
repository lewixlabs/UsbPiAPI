# UsbPiAPI
## Simple API inside Docker 🐳 to remotely power on/off your Raspberry USBs (tested on Raspberry Pi 4 8GB

### To build Docker image (remember to change env variables in Dockerfile)
>docker build --rm --pull -f Dockerfile -t usb-api:latest .

## To run the container
>docker run --privileged -p443:443 --restart=always --name usbpiapi -v /etc/letsencrypt:/etc/letsencrypt -d usb-api

## How to use this API
- make a post call to your_url/lights

- send these parameters in body:

- - psw (your password to obtain access to API)

- - powerOn (false -> lights off / true -> lights on)
