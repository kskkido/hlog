.PHONY: build
build:
	yarn
	stack build

.PHONY: watch
watch:
	$(MAKE) build
	stack exec blog rebuild
	stack exec blog watch
