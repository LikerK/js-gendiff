install:
	npm ci

gendiff:
	node bin/gendiff.js src/fixture/file1.json src/fixture/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
