sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.App", {
            onInit: function () {
                this.setApplicationModel();
                this.getOwnerComponent().getRouter().navTo("Main");
               // var oModel=new sap.ui.model.ODa
            },
            setApplicationModel: function () {
                var oApplicationModel = new sap.ui.model.json.JSONModel();
                oApplicationModel.setProperty("/layout","OneColumn");
                oApplicationModel.setProperty("/HeaderID",1000011);
                oApplicationModel.setProperty("/StoreNo",102);
                oApplicationModel.setProperty("/StoreName","2nd & Madison");
                
                this.getOwnerComponent().setModel(oApplicationModel, "ApplicationModel");
            }
        });
    });
