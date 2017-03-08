NODE_PATH:=.

.PHONY: prod stage dev test

prod:
	NODE_PATH=${NODE_PATH} NODE_ENV=production gulp

stage:
	NODE_PATH=${NODE_PATH} NODE_ENV=stage gulp

dev:
	NODE_PATH=${NODE_PATH} NODE_ENV=development gulp

test:
	NODE_PATH=${NODE_PATH} NODE_ENV=test gulp

bash:
	bash

icomoon:
	chmod -R 755 ./src/assets/icons/icomoon
