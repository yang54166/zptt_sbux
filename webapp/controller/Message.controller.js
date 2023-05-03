sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.Message", {

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("MessageDisplay").attachMatched(this.attachMatchedMessageDisplay, this);
            },
            onAfterRendering: function () {

            },
            attachMatchedMessageDisplay: function (oEvent) {
                setTimeout(function () {
                    var bPullFlag = this.getOwnerComponent().getModel("MessageModel").getProperty("/PullFlag");
                    if (bPullFlag) {
                        this.getOwnerComponent().getRouter().navTo("Main");
                    } else {
                        var sHeaderID = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/HeaderID");
                        this.getOwnerComponent().getRouter().navTo("RequestList", { ObjectId: sHeaderID });
                    }
                }.bind(this), 3000);

            }

        });
    });
