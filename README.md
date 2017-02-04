# GravDept Typeahead

Fast, lightweight typeahead to enhance text inputs.

[![Gravity Department](http://gravitydept.com/_themes/gravdept/img/logo-footer.png)](http://gravitydept.com/)

## Demo

[todo]

## Features

- Efficient — Create multiple typeahead instances from a lean constructor prototype.
- Customizable — Simple configuration object.
- Simple — Override the `render` method to match any data source.
- Touch-friendly
- Keyboard-friendly

**Form behavior**

- Submit forms naturally,
- Or prevent submission for typeahead only use.

**Loading behavior**

- Render typeahead instantly on new response,
- Or show loading indicator for slow-loading requests.

**Empty response behavior**

- Custom messaging for empty responses,
- Or simply hide the typeahead.

## Dependencies

- jQuery

## Usage

[todo]

Include the script in your page:

```html
<script src="path/to/gravdept.typeahead.min.js"></script>
```

And initialize with the options you need:

```javascript
var siteTypeahead = new Typeahead();

siteTypeahead.render = function (json) {
    // Process your JSON and return HTML
    return html;
};

siteTypeahead.init({
    elements: {
        button:   'site-search-button',
        form:     'site-search-form',
        input:    'site-search-input',
        response: 'site-search-response'
    },
    url: 'http://example.com/ajax/typeahead'
});
```

## Documentation

[todo]

### Options

```javascript
var config = {
    debounceTime: 300, // {number} - Milliseconds to pause before querying
    elements: {
        button:   'site-search-button',  // {string} - ID of submit buttton
        form:     'site-search-form',    // {string} - ID of form
        input:    'site-search-input',   // {string} - ID of text input
        response: 'site-search-response' // {string} - ID of response element
    },
    preventFormSubmit: false, // {boolean} - Prevent form submit if no "action" exists
    queryMinimum:      3,     // {number}  - Minimum characters to start typeahead
    requestData:       {},    // {object}  - URL params to attach to request
    showEmpty:         false, // {boolean} - Show message if response has no results
    showLoading:       false, // {boolean} - Show loading between request and response
    url:               null   // {string}  - URL to query for data
}
```
