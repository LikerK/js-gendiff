install:
	npm ci

gendiff:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json --format json 

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
