#a11yDialog

This plugin extends the jQueryUI `.dialog()` widget with some added accessibility enhancements. Specifically it does the following additional tasks:

1. Removes all actionable items outside the dialog from the tab order
2. "Hides" actionable items from assistive technologies by adding 'aria-hidden' to them when the dialog is open and removing the aria-hidden when the dialog is closed.
3. Allows you to explicitly declare the proper 'role' on the dialog for the specific purpose you intend [1].

This plugin overrides the jQueryUI `.dialog()`, allowing you to add this to your site and call the `.dialog()` as normal, using all of the existing [properties](http://jqueryui.com/dialog/) the jQueryUI dialog ships with. 

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/karlgroves/a11yDialog/master/dist/a11yDialog.min.js
[max]: https://raw.github.com/karlgroves/a11yDialog/master/src/a11yDialog.js

You can install this with Bower:

```
bower install a11y-dialog --save
```

In your web page:

```html
<script src="jquery.js"></script>
<script src="jquery-ui.js"></script>
<script src="dist/a11yDialog.min.js"></script>
<script>
jQuery(function($) {
  // this creates a basic dialog
  $('#foo').dialog(); 
  
  // this creates a modal dialog with the 'alertdialog' role
  $("#bar").dialog({
      autoOpen: false,
       modal: true,
       role: 'alertdialog'
  });
  
});
</script>
```

For more examples, see the /demo/ folder in this repo.


## Documentation
Because this simply extends jQueryUI's `.dialog()`, you should [read the official documentation](http://jqueryui.com/dialog/).

The only noteworthy difference between this plugin and jQueryUI dialog is the addition of the 'role' option. Left alone, this option will default to "dialog", which is the default behavior from jQueryUI
