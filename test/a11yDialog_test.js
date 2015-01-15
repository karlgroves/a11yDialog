(function ($) {

    QUnit.test('Nothing in the dialog should have aria-hidden', function () {
        var tehDialog = _$('.a11y-ui-dialog-open');
        var tehChildren = tehDialog.children('[aria-hidden="true"]');
        equal(tehChildren.length, 0);
    });


    QUnit.test('Actionable items outside the dialog should have aria-hidden', function () {
        var couldFocus = _$('a[href], area, input:not(input[type=hidden]), button, select, textarea, *[tabindex=0]').filter(':visible').not('.a11y-ui-dialog-open *');
        var hasAriaHidden = couldFocus.filter('[aria-hidden="true"]');
        equal(24, hasAriaHidden.length);
    });


    QUnit.test('Actionable items outside the dialog should have tabindex=-1', function () {
        var couldFocus = _$('a[href], area, input:not(input[type=hidden]), button, select, textarea, *[tabindex=0]').filter(':visible').not('.a11y-ui-dialog-open *');
        var hasTabindexNegative = couldFocus.filter('[tabindex="-1"]');
        equal(24, hasTabindexNegative.length);
    });


    QUnit.test('Actionable items outside the dialog should have class ui-dialog-hidden-by-modal', function () {
        var couldFocus = _$('a[href], area, input:not(input[type=hidden]), button, select, textarea, *[tabindex=0]').filter(':visible').not('.a11y-ui-dialog-open *');
        var hasHiddenClass = couldFocus.filter('.ui-dialog-hidden-by-modal');
        equal(24, hasHiddenClass.length);
    });


    QUnit.test('The dialog itself must have class a11y-ui-dialog-open', function () {
        equal(1, _$('.a11y-ui-dialog-open').length);
    });


    QUnit.test('Invisible stuff SHOULD NOT be affected by the dialog accessibility enhancements', function () {
        equal(0, _$('.a11y-ui-dialog-open').children('.ui-dialog-hidden-by-modal').length);
    });

    QUnit.test('The dialog must have alertdialog role', function () {
        var tehDialogRole = _$('.a11y-ui-dialog-open').attr('role');
        equal('alertdialog', tehDialogRole);
    });

}(jQuery));
