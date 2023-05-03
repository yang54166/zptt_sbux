sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            executeUpdate: function (oModel, sEntity, oPayload, bMerge, oController, sBatchGroupId) {
                return new Promise(function (resolve, reject) {
                    oModel.update(sEntity, oPayload, {
                        batchGroupId: sBatchGroupId,
                        merge: bMerge,
                        success: function (oData, oResponse) {
                            resolve(oData);
                        },
                        error: function (oError) {
                            reject(oError);
                        }

                    })
                })
            },
            executeRead: function (oModel, sEntity, oController, oFilter) {
                return new Promise(function (resolve, reject) {
                    oModel.read(encodeURI(sEntity),
                        {
                            filters:oFilter,
                            success: function (oData, oResponse) {
                                resolve(oData);
                            },
                            error: function (oError) {
                                reject(oError);
                            }

                        })
                }.bind(this))
            }


        };
    });