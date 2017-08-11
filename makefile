dev: clean
	webpack --config config/webpack.config.dev.js --progress --colors
	cp src/index.html index.html

prod: clean
	webpack --config config/webpack.config.prod.js --progress --colors 
	cp src/index.html index.html

clean:
	$(RM) index.html bundle.*

test:
	node_modules/karma/bin/karma start config/karma.conf.js

count:
	cloc . --list-file=config/.cloc.includes --exclude-dir=node_modules,coverage,dist --exclude-list-file=config/.cloc.excludes

lint:
	node node_modules/eslint/bin/eslint.js --config config/.eslintrc.js src/**/*.js test/**/*.js

.PHONY: test clean count lint