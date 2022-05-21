.PHONY: build
build:
	$(MAKE) build-src || exit
	$(MAKE) build-app || exit

.PHONY: build-src
build-src:
	yarn --cwd ./src
	yarn --cwd ./src build

.PHONY: build-app
build-app:
	stack build
	stack exec blog clean
	stack exec blog build

.PHONY: watch
watch:
	($(MAKE) watch-src || exit) & $(MAKE) watch-app

.PHONY: watch-src
watch-src:
	yarn --cwd ./src
	yarn --cwd ./src watch

.PHONY: watch-app
watch-app:
	stack build
	stack exec blog rebuild
	stack exec blog watch
