dev: clean
	webpack --config config/webpack.config.dev.js --progress --colors -d
	cp src/index-dev.html index.html

prod: clean
	webpack --config config/webpack.config.prod.js --progress --colors 
	cp src/index-prod.html index.html

clean:
	$(RM) index.html bundle.*

test:
	node_modules/karma/bin/karma start config/karma.conf.js

count:
	cloc . --list-file=config/.cloc.includes --exclude-dir=node_modules,coverage,dist --exclude-list-file=config/.cloc.excludes

.PHONY: test clean count