install:
	npm ci

gendiff:
	node bin/gendiff.js src/fixture/file1.json src/fixture/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint
