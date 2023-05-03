sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sbux/zptt/utils/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.RequestDetail", {
            formatter: formatter,
            onInit: function () {
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/layout","TwoColumnsMidExpanded");

            }
        });
    });
