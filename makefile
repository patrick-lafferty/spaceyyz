dev: clean
	webpack --config webpack.config.dev.js --progress --colors -d
	cp src/index-dev.html index.html

prod: clean
	webpack --config webpack.config.prod.js --progress --colors 
	cp src/index-prod.html index.html

clean:
	$(RM) index.html bundle.*

test:
	karma start

count:
	cloc . --list-file=.cloc.includes --exclude-dir=node_modules,coverage,dist --exclude-list-file=.cloc.excludes