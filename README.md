[![Gravity Department](https://cdn.gravitydept.com/github/repo-header.png)](https://gravitydept.com/)

# GravDept Typeahead

Fast, lightweight typeahead to enhance text inputs.

## Demo

[todo]

## Features

- Efficient — Create multiple typeahead instances from a lean constructor prototype.
- Customizable — Simple configuration object.
- Simple rendering — Override the `render` method to match any data source.
- Multiple facets — Supports multiple grouped facets in one response.
- Touch-friendly — Appropriate padding on target sizes.
- Keyboard-friendly — Supports <kbd>tab</kbd> and <kbd>shift + tab</kbd>.
- Two display modes — Block or absolutely positioned results.
- Click outside the input or response to close typeahead.

**Form behavior**

- Submit forms naturally,
- Or prevent submission for typeahead only use.

**Loading behavior**

- Render typeahead instantly on new response,
- Or show loading indicator for slow-loading requests.

**Valid response behavior**

- Click link to follow immediately,
- Or delegated event for external handling.

**Empty response behavior**

- Custom messaging for empty responses,
- Or simply hide the typeahead.

## Dependencies

- jQuery

## Usage

Add JS templates to the page:

```
See: /html/js-templates.html
```

Add the script to the page:

```html
<script src="path/to/typeahead.js"></script>
```

Initialize with options:

```javascript
var searchTypeahead = new Typeahead();

searchTypeahead.render = function (json) {
    // Process your JSON and return HTML
    return html;
};

searchTypeahead.init({
    elements: {
        button:   'search-button',
        form:     'search-form',
        input:    'search-input',
        response: 'search-response'
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
        button:   'search-button',  // {string} - ID of submit buttton
        form:     'search-form',    // {string} - ID of form
        input:    'search-input',   // {string} - ID of text input
        response: 'search-response' // {string} - ID of response element
    },
    paramNameForQuery: null,  // {string}  - Param name for which the query value is passed.
    preventFormSubmit: false, // {boolean} - Prevent form submit if no "action" exists
    queryMinimum:      3,     // {number}  - Minimum characters to start typeahead
    requestData:       {},    // {object}  - URL params to attach to request
    showEmpty:         false, // {boolean} - Show message if response has no results
    showLoading:       false, // {boolean} - Show loading between request and response
    url:               null   // {string}  - URL to query for data
}
```
