install:
	npm ci

gendiff:
	node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json --format plain 

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
