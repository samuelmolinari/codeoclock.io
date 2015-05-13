TESTS = test/**/*.js test/**/**/*.js

test:
	@APPLICATION_ENV=test ./node_modules/.bin/mocha \
    --reporter nyan \
    --ui tdd \
    $(TESTS)

test-debug:
	@APPLICATION_ENV=test ./node_modules/.bin/mocha \
    --reporter nyan \
    --ui tdd \
    --debug-brk \
    $(TESTS)

test-w:
	@APPLICATION_ENV=test ./node_modules/.bin/mocha \
    --reporter dot \
    --watch \
    $(TESTS)

.PHONY: test test-w
