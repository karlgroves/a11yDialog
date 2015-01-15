;(function ($, window, document, undefined) {
    $.widget("ui.dialog", $.ui.dialog, {

        _createWrapper: function () {
            this.uiDialog = $("<div>")
                .addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
                this.options.dialogClass)
                .hide()
                .attr({
                    // Setting tabIndex makes the div focusable
                    tabIndex: -1,
                    role: this.options.role || 'dialog'
                })
                .appendTo(this._appendTo());

            this._on(this.uiDialog, {
                keydown: function (event) {
                    if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
                        event.keyCode === $.ui.keyCode.ESCAPE) {
                        event.preventDefault();
                        this.close(event);
                        return;
                    }

                    // prevent tabbing out of dialogs
                    if (event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented()) {
                        return;
                    }
                    var tabbables = this.uiDialog.find(":tabbable"),
                        first = tabbables.filter(":first"),
                        last = tabbables.filter(":last");

                    if (( event.target === last[0] || event.target === this.uiDialog[0] ) && !event.shiftKey) {
                        this._delay(function () {
                            first.focus();
                        });
                        event.preventDefault();
                    } else if (( event.target === first[0] || event.target === this.uiDialog[0] ) && event.shiftKey) {
                        this._delay(function () {
                            last.focus();
                        });
                        event.preventDefault();
                    }
                },
                mousedown: function (event) {
                    if (this._moveToTop(event)) {
                        this._focusTabbable();
                    }
                }
            });

            // We assume that any existing aria-describedby attribute means
            // that the dialog content is marked up properly
            // otherwise we brute force the content as the description
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                });
            }
        },

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