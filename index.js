var Promise = require('promise');

function redacted(){};

module.exports = function(protractor) {
	if (protractor == null) return;
	var ElementFinder = protractor.ElementFinder;
	var ElementArrayFinder = protractor.ElementArrayFinder;

	//Support the old version. This should be phased out, but this is a massive change.
	//Let's try to ease people into version 2.
	if (ElementFinder === undefined) {
		return redacted(this.global);
	}

	//Add global methods
	this.global.sleep = function(time) {
		var timeout = time || this.default || 2000;
		//Returns promise
		return browser.driver.sleep(timeout);
	}

	//Add containsText
	function containsText(against) {
		var self = this;
		return new Promise(function(resolve, reject) {
			self.getText().then(function(text) {
				if (text.indexOf(against) != -1) {
					//Resolves if it works
					resolve(true);
				}
				//Reject if it doesn't
				reject(false);
			});
		});
	}
	ElementFinder.prototype.containsText = containsText;
	ElementArrayFinder.prototype.containsText = containsText;

	//Add elementHasAttribute
	function hasAttribute(attr, val) {
		
	}
}

/*
function redacted(global) {

	this.sleep = function(time) {
		//Defaults to 2000
		if (time == undefined) {
			time = 2000;
		}
		//Returns promise
		return browser.driver.sleep(time);
	}

	this.elementContainsText = function(element, against) {

		//Validation
		if(element == null || against == null) {
			return undefined;
		}

		//Return a promise
		return new Promise(function(resolve, reject) {
			element.getText().then(function(text) {
				if (text.indexOf(against) != -1) {
					//Resolves if it works
					resolve(true);
				}
				//Reject if it doesn't
				reject(false);
			});
		});
	}

	this.elementHasAttribute = function(element, attribute, value) {
		//Validation
		if(element == null || attribute == null) {
			return undefined;
		}

		waitFor(element);

		return new Promise(function(resolve, reject) {
			element.getAttribute(attribute).then(function(attr) {
				if (attr != null && (attribute == undefined || attribute == attr)) {
					resolve(attr);
				}
				reject(attr);
			},function() {
				reject(false);
			});
		});
	}

	//Does not return a promise
	this.elementFromAttribute = function(attribute, value) {
		//Validation
		if (element == null || attribute == null) {
			return undefined;
		}
		var selector = '[' + attribute + '="' + value + '"]';
		return element(by.css(selector));
	}

	//Find element from an element.all object that has against text.
	this.elementFromText = function(elements, against, strict) {

		//If we do not have enough information
		if (elements == null || against == null) {
			return undefined;
		}

		//Helper compare function
		function matched(text1, text2) {
			if (strict == true) {
				return text1 == text2
			}
			return text1.indexOf(text2) != -1;
		}

		//Iterate and find the right text.
		return new Promise(function(resolve, reject) {
			elements.each(function(el) {
				el.getText().then(function(text) {
					if (matched(text, against)) {
						resolve(el);
					}
				});
			})
			.then(function() {
				resolve(undefined);
			});
		});
	}

	//Add a wait function to wait for element
	this.waitFor = function(element, timeout) {

		//Default timeout is 3000ms
		if (timeout == undefined) {
			timeout = 3000;
		}

		var waitFunc;

		//Check for multiple elements
		if (element.each != undefined) {
			waitFunc =	function() {
		       return element.count(function (count) {
		            return count > 0;
		        });
			}
		//Otherwise check if the element exists
		} else {
			waitFunc = function() {
				return element.isPresent()
			}
		}

		return new Promise(function(resolve, reject) {
			browser.wait(waitFunc, timeout).then(resolve);
		});
	}

	this.waitInvisible = function (element) {
		return browser.driver.wait(
			protractor.until.elementIsNotVisible(element),
			3000
		);
	}
    //Click an element that is not in view to the user.
    this.clickOutOfView = function(el) {

        return browser.executeScript(function() {
            arguments[0].click();

        }, el.getWebElement());
    }

    //Move the mouse over an element
    this.mouseOver = function(el) {
        browser.actions().mouseMove(el).perform();
        return browser.driver.sleep(200);
    }

    //Scrolls the element into view
    this.scrollIntoView = function(el) {
        return browser.executeScript(function() {
                arguments[0].scrollIntoView(true);
        }, el.getWebElement());
    }

	//If global is
	if (global != undefined) {
		global.sleep = this.sleep;

		global.elementContainsText = this.elementContainsText;
		global.elementFromText = this.elementFromText;
		global.elementFromAttribute = this.elementFromAttribute;
		global.elementHasAttribute = this.elementHasAttribute;

		global.waitFor = this.waitFor;
		global.waitInvisible = this.waitInvisible;

		global.clickOutOfView = this.clickOutOfView;
		global.mouseOver = this.mouseOver;
		global.scrollIntoView = this.scrollIntoView;
	}
}*/