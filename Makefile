node_modules := node_modules
bower_components := bower_components

npm := $(shell which npm)
bower := $(node_modules)/.bin/bower
babel := $(node_modules)/.bin/babel
lint := $(node_modules)/.bin/eslint
r.js := $(node_modules)/.bin/r.js

src := src
src.* := $(shell find $(src) \
	-name '*.es6' -print -o \
	-name '*.js' -print -o \
	-name '*.jade' -print)

build := build
build.* := \
	$(src.*:$(src)/%.es6=$(build)/%.js) \
	$(src.*:$(src)/%.js=$(build)/%.js) \
	$(src.*:$(src)/%.jade=$(build)/%.jade) \
	$(build)/lib/webapp/public/vendors

all: deps compile minify

deps: $(node_modules) $(bower_components)

compile: $(build.*)

minify: $(build)/lib/webapp/public/js/apps/4xxi-todo/main.min.js

$(node_modules): package.json
	$(npm) i
	touch $@

$(bower_components): bower.json
	$(bower) i
	touch $@

$(build)/%.js: $(src)/%.es6
	@mkdir -p $(@D)
	$(babel) $< -o $@

$(build)/lib/webapp/public/js/%.js: $(src)/lib/webapp/public/js/%.es6
	@mkdir -p $(@D)
	$(babel) --modules amd $< -o $@

$(build)/%.js: $(src)/%.js
	@mkdir -p $(@D)
	cp $< $@

$(build)/%.jade: $(src)/%.jade
	@mkdir -p $(@D)
	cp $< $@

$(build)/lib/webapp/public/vendors: $(bower_components)
	@rm -rf $@
	@mkdir -p $(@D)
	cp -R $< $@

$(build)/lib/webapp/public/js/apps/4xxi-todo/main.min.js: $(build.*)
	$(r.js) -o \
		baseUrl=$(@D) \
		name=main \
		out=$@ \
		mainConfigFile=$(build)/lib/webapp/public/js/apps/4xxi-todo/main.js

clean: buildclean depsclean

buildclean:
	rm -rf $(build)

depsclean:
	rm -rf $(node_modules) $(bower_components)

lint:
	$(lint) --ext es6,js $(src)

.PHONY: all deps clean buildclean depsclean lint
