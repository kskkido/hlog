.PHONY: build
build:
	rm -rf public
	$(MAKE) build-home
	$(MAKE) build-post
	$(MAKE) build-posts
	$(MAKE) build-tag
	$(MAKE) build-tags

.PHONY: build-home
build-home:
	yarn
	echo "{\"extends\": \"./tsconfig.json\" }" > tsconfig-home.json
	yarn typecheck --p tsconfig-home.json
	yarn esbuild src/scripts/home.ts --bundle --outdir=public/scripts/ --tsconfig=tsconfig-home.json --minify `jq -r '.dependencies|keys[]' package.json | sed 's/^/--external:/'`
	rm tsconfig-home.json

.PHONY: build-post
build-post:
	yarn
	echo "{\"extends\": \"./tsconfig.json\" }" > tsconfig-post.json
	yarn typecheck --p tsconfig-post.json
	yarn esbuild src/scripts/post.ts --bundle --outdir=public/scripts/ --tsconfig=tsconfig-post.json --minify `jq -r '.dependencies|keys[]' package.json | sed 's/^/--external:/'`
	rm tsconfig-post.json

.PHONY: build-posts
build-posts:
	yarn
	echo "{\"extends\": \"./tsconfig.json\" }" > tsconfig-posts.json
	yarn typecheck --p tsconfig-posts.json
	yarn esbuild src/scripts/posts.ts --bundle --outdir=public/scripts/ --tsconfig=tsconfig-posts.json --minify `jq -r '.dependencies|keys[]' package.json | sed 's/^/--external:/'`
	rm tsconfig-posts.json

.PHONY: build-tag
build-tag:
	yarn
	echo "{\"extends\": \"./tsconfig.json\" }" > tsconfig-tag.json
	yarn typecheck --p tsconfig-tag.json
	yarn esbuild src/scripts/tag.ts --bundle --outdir=public/scripts/--tsconfig=tsconfig-tag.json --minify `jq -r '.dependencies|keys[]' package.json | sed 's/^/--external:/'`
	rm tsconfig-tag.json

.PHONY: build-tags
build-tags:
	yarn
	echo "{\"extends\": \"./tsconfig.json\" }" > tsconfig-tags.json
	yarn typecheck --p tsconfig-tags.json
	yarn esbuild src/scripts/tags.ts --bundle --outdir=public/scripts/ --tsconfig=tsconfig-tags.json --minify `jq -r '.dependencies|keys[]' package.json | sed 's/^/--external:/'`
	rm tsconfig-tags.json


