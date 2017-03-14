/**
* Gravity Department - Typeahead
* https://github.com/gravitydepartment/typeahead
*
* @author     Brendan Falkowski
* @copyright  2017 Gravity Department. All rights reserved.
*/


// ==============================================
// Typeahead
// ==============================================

function Typeahead () {
    this.config = {
        debounceTime: 300,  // {number} - Milliseconds to pause before querying
        elements: {
            button:   null, // {string} - ID of submit buttton
            form:     null, // {string} - ID of form
            input:    null, // {string} - ID of text input
            response: null  // {string} - ID of response element
        },
        preventFormSubmit: false, // {boolean} - Prevent form submit if no "action" exists
        queryMinimum:      3,     // {number}  - Minimum characters to start typeahead
        requestData:       {},    // {object}  - URL params to attach to request
        showEmpty:         false, // {boolean} - Show message if response has no results
        showLoading:       false, // {boolean} - Show loading between request and response
        url:               null   // {string}  - URL to query for data
    };

    // Selectors
    this.$button   = null;
    this.$form     = null;
    this.$input    = null;
    this.$response = null;

    // Templates
    this.template = {
        empty:       jQuery('[data-js-template="typeahead-empty"]').html(),
        group:       jQuery('[data-js-template="typeahead-group"]').html(),
        itemLink:    jQuery('[data-js-template="typeahead-item-link"]').html(),
        itemProduct: jQuery('[data-js-template="typeahead-item-product"]').html(),
        loading:     jQuery('[data-js-template="typeahead-loading"]').html()
    };
}

Typeahead.prototype = {
    /**
     * @param {object} settings - Object to override default config
     */
    init: function (settings) {
        // Extend defaults
        jQuery.extend(this.config, settings);

        this.cacheSelectors();
        this.addEvents();
    },

    addEvents: function () {
        var thisRef = this;

        // Listen for typing
        this.$input.on('input', this.debounce(function (e) {
            thisRef.onInput();
        }, this.config.debounceTime));

        // Keyboard nav enhancement
        this.$input.on('keydown', function (e) {
            // Press "tab" to focus the first typeahead link
            if (e.keyCode === 9) {
                e.preventDefault(); // Don't tab to "submit" button
                thisRef.$response.find('.typeahead_link').first().focus();
            }
        });

        // Listen for form submit
        this.$form.on('submit', function (e) {
            if (this.config.preventFormSubmit) {
                e.preventDefault();
            } else {
                thisRef.hideTypeahead();
            }
        });

        // Click outside form to close typeahead
        jQuery(document).on('click', function (e) {
            var $target  = jQuery(e.target);
            var $parents = $target.parents();

            if ($parents.index(thisRef.$form) === -1) {
                thisRef.hideTypeahead();
            }
        });

        // Click typeahead link shows loading + follows link
        this.$form.on('click', '.typeahead_link', function (e) {
            e.stopPropagation(); // Prevent bubbling to "document" and triggering other events
            thisRef.showLoading();
        });
    },

    cacheSelectors: function () {
        this.$button   = jQuery('#' + this.config.elements.button);
        this.$form     = jQuery('#' + this.config.elements.form);
        this.$input    = jQuery('#' + this.config.elements.input);
        this.$response = jQuery('#' + this.config.elements.response);
    },

    // See: https://remysharp.com/2010/07/21/throttling-function-calls
    debounce: function (fn, delay) {
        var timer = null;

        return function () {
            var context = this;
            var args = arguments;

            clearTimeout(timer);

            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },

    hideTypeahead: function () {
        this.$response.addClass('hide');
    },

    /**
     * Override this method during init to modify the user's input before querying.
     *
     * @param {string} query
     * @return {string}
     */
    modifyQuery: function (query) {
        return query;
    },

    onInput: function () {
        // Modify query before sending request
        var query = this.modifyQuery(
            this.$input.val()
        );

        // Send query or hide response
        if (query.length && query.length >= this.config.queryMinimum) {
            this.sendRequest(query);
        } else {
            this.hideTypeahead();
        }
    },

    /**
     * Override this method during init to suit the data source.
     *
     * @param {object|string} response - {object} as JSON to be parsed | {string} as HTML to render
     * @return {string|boolean} - {string} as HTML to render | {boolean} false to not render
     */
    render: function (response) {
        return response;
    },

    /**
     * @param {string} title - Title of the group
     * @param {string} body  - Items in the group
     * @return {string}
     */
    renderGroup: function (title, body) {
        var group = this.template.group;
        group = group.replace(/TYPEAHEAD_GROUP_TITLE/, title);
        group = group.replace(/TYPEAHEAD_GROUP_BODY/,  body);
        return group;
    },

    resetInput: function () {
        this.$input.val('');
    },

    /**
     * @param {string} query - query value
     */
    sendRequest: function (query) {
        var thisRef = this;

        var data = this.config.requestData;
        data[this.$input.attr('name')] = query;

        jQuery.ajax({
            beforeSend: function () {
                if (thisRef.config.showLoading) {
                    thisRef.showLoading();
                }
            },
            data: data,
            url: thisRef.config.url
        }).fail(function () {
            thisRef.hideTypeahead();
        }).done(function (json) {
            if (typeof json === 'string') {
                json = JSON.parse(json);
            }

            var html = thisRef.render(json);

            if (html !== false) {
                thisRef.showTypeahead(html);
            }
        });
    },

    showEmpty: function () {
        if (this.config.showEmpty) {
            this.showTypeahead(this.template.empty);
        } else {
            this.hideTypeahead();
        }
    },

    showLoading: function () {
        this.$response
            .html(this.template.loading)
            .removeClass('hide');
    },

    /**
     * @param {string} markup - HTML to display
     */
    showTypeahead: function (html) {
        this.$response
            .html(html)
            .removeClass('hide');
    }
};
