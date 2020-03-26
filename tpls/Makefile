PROJECT_DIR = $(shell pwd)

default: start-service

-download-rely:
	sudo npm install 
	cd ./vps/public;sudo npm install

-start-service:
	node ./atc/bin/www

-start-service-dev:
	node-dev ./atc/bin/www

-persistent-start:
	forever start -o ./atc/logs/out.log -e ./atc/logs/err.log -a ./atc/bin/www

-compile-f2e:
	cd ./vps/public;npm run build

-compile-f2e-extend:
	cd ./vps/public;npm run extend

-compile-f2e-dev:
	cd ./vps/public;npm run dev

-start-service-pm2:
	pm2 start ./atc/bin/www -i 1 --name "jarvis"

-stop-service-pm2:
	pm2 stop ./atc/bin/www --name "jarvis"

start-service: -start-service

start-service-dev: -start-service-dev

persistent-start: -persistent-start

download-rely: -download-rely

compile-f2e: -compile-f2e

start-service-pm2: -start-service-pm2

stop-service-pm2: -stop-service-pm2

compile-f2e-dev: -compile-f2e-dev

compile-f2e-extend: -compile-f2e-extend