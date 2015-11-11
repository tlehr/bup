default: help

help:
	@echo 'make targets:'
	@echo '  deps          Download and install all dependencies (for compiling / testing / CLI operation)'
	@echo '  dist          Create distribution files'
	@echo '  test          Run tests'
	@echo '  upload        Upload to demo page'

	@echo '  clean         Remove temporary files'
	@echo '  help          This message'


install-libs:
	test -e libs/.completed || $(MAKE) force-install-libs

force-install-libs:
	mkdir -p libs
	wget https://code.jquery.com/jquery-2.1.4.min.js -O libs/jquery.min.js
	wget https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js -O libs/mousetrap.min.js
	wget https://raw.githubusercontent.com/phihag/jsPDF/dist/dist/jspdf.min.js -O libs/jspdf.min.js
	touch libs/.completed

deps: install-libs
	(node --version && npm --version) >/dev/null 2>/dev/null || sudo apt-get install nodejs npm
	npm install

cleandist:
	rm -rf -- dist

manifest:
	node div/make_manifest.js dist/bup/ div/bup.manifest.in dist/bup/bup.manifest

dist: cleandist
	mkdir -p dist/bup

	node div/make_dist.js bup.html dist/bup/index.html dist/bup/bup.dist.js dist/tmp
	cp libs/jspdf.min.js dist/bup/jspdf.dist.js
	<bup.css cleancss -o dist/bup/bup.min.css
	svgo -f icons/ -o dist/bup/icons/
	cp icons/*.gif icons/*.png dist/bup/icons/
	cp div/dist_htaccess dist/bup/.htaccess
	mkdir -p dist/bup/div/
	cp \
		div/courtspot_screenshot_links.png \
		div/courtspot_screenshot_rechts.png \
		div/LICENSE.commercial.de \
		--target-directory dist/bup/div/

	$(MAKE) manifest

	cd dist && zip bup.zip bup/ -rq

upload: dist
	cp div/dist_upload_config.json dist/.upload_config.json
	cp div/dist_public dist/.public
	cd dist && upload

test:
	@npm test

lint: jshint eslint

jshint:
	@jshint js/*.js

eslint:
	@eslint js/*.js

coverage:
	istanbul cover _mocha -- -R spec

coverage-display: coverage
	xdg-open coverage/lcov-report/js/index.html

cd: coverage-display

clean: cleandist
	rm -rf -- libs
	rm -rf -- node_modules

.PHONY: default help deps test clean install-libs force-install-libs upload dist cleandist coverage coverage-display cd lint jshint eslint manifest
