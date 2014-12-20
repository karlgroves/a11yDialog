#a11yDialog

This plugin is nothing more than an extension of the jQueryUI `.dialog()` widget with some added accessibility enhancements. Specifically, it "hides" actionable items from assistive technologies by adding 'aria-hidden' to them when the dialog is open and removing the aria-hidden when the dialog is closed.

This plugin overrides the jQueryUI `.dialog()`, allowing you to use this directly in place

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/karlgroves/a11yDialog/master/dist/a11yDialog.min.js
[max]: https://raw.github.com/karlgroves/a11yDialog/master/dist/a11yDialog.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/a11yDialog.min.js"></script>
<script>
jQuery(function($) {
  $('#foo').dialog(); 
});
</script>
```

## Documentation
Because this simply extends jQueryUI's `.dialog()`, you should [read the official documentation](http://jqueryui.com/dialog/) 
