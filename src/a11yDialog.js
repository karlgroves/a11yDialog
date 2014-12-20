;(function ($, window, document, undefined) {
    $.widget("ui.dialog", $.ui.dialog, {

        /**
         * The open function has been rewritten to improve the accessibility of modal dialogs.
         * It does so by taking otherwise focusable elements and removing them from the tab order.
         * It also "hides" them from screen readers by adding aria-hidden to them.
         * @returns {*}
         */
        open: function () {
            var modal = this.options.modal;

            // do this stuff *only* if the dialog is modal
            if (modal === true) {
                this._setOption('dialogClass', 'a11y-ui-dialog-open');

                // select the focusable things that are not in the dialog
                var couldFocus = $('a[href], area, input:not(input[type=hidden]), button, select, textarea, *[tabindex=0]').filter(':visible').not('.a11y-ui-dialog-open *');
                couldFocus.attr({
                    'tabindex': '-1',
                    'aria-hidden': 'true'
                }).addClass('ui-dialog-hidden-by-modal');
            }

            // do all the other stuff this function would normally do
            return this._super();
        },

        /**
         * The close function undoes all of the above
         * @returns {*}
         */
        close: function () {
            var modal = this.options.modal;

            if (modal === true) {
                $('.ui-dialog-hidden-by-modal').attr({
                    'tabindex': '0'
                }).removeAttr('aria-hidden').removeClass('ui-dialog-hidden-by-modal');

            }

            return this._super();
        }

    });

})(jQuery, window, document);