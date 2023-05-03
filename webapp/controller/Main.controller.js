sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sbux/zptt/utils/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sbux/zptt/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, Filter, FilterOperator, Fragment, models) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.Main", {
            formatter: formatter,
            models: models,
            onInit: function () {
                this.getView().setBusyIndicatorDelay(0);
                this.getOwnerComponent().getRouter().getRoute("Main").attachMatched(this.attachMatchedMain, this);
                // this.setTileModel();
                this.getStoreId().then(
                    function (sHeaderID) {
                        this.setTileListModel(sHeaderID);
                    }.bind(this)
                )
            },
            onAfterRendering: function () {
                this.setForcastModel();
                this.setStoreModel();
            },
            attachMatchedMain: function (oEvent) {
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/layout", "OneColumn");
                this.getStoreId().then(
                    function (sHeaderID) {
                        this.setTileListModel(sHeaderID);
                    }.bind(this)
                )

            },
            setForcastModel: function () {
                var sLocation = this.getOwnerComponent().getModel("ApplicationModel").getProperty("/StoreNo");
                var aFilterList = [];
                aFilterList.push(new Filter("Location", sap.ui.model.FilterOperator.EQ, sLocation));
                aFilterList.push(new Filter("BusinessDate", sap.ui.model.FilterOperator.EQ, new Date()));
                var oModel = this.getOwnerComponent().getModel("Main");
                let sPath = '/Forecast';
                this.models.executeRead(oModel, sPath, this, aFilterList).then(
                    function (oData) {
                        var oForeCastModel = new sap.ui.model.json.JSONModel();
                        var aItemList = {};
                        $.each(oData.results, function (i, oItem) {
                            if (aItemList[oItem.ItemNo] === undefined) {
                                aItemList[oItem.ItemNo] = [];
                                aItemList[oItem.ItemNo].push(oItem);
                            } else {
                                aItemList[oItem.ItemNo].push(oItem);
                            }
                        })
                        oForeCastModel.setData(aItemList);
                        this.getOwnerComponent().setModel(oForeCastModel, "ForeCastListModel");
                    }.bind(this),
                    function (oError) {
                    }
                )
            },
            getStoreId: function () {
                return new Promise(function (resolve, rject) {
                    var sHeaderID = ''
                    try {
                        sHeaderID = this.getOwnerComponent().getModel("ApplicationModel").getProperty("/HeaderID");
                    } catch (oError) {
                        sHeaderID = 1000050;
                    }

                    resolve(sHeaderID)
                }.bind(this))
            },
            setTileListModel: function (sHeaderID) {
                // var obj = {
                //     "HeaderID": parseInt(sHeaderID),
                //     "_this": this
                // }
                // jQuery.ajax({
                //     type: "GET",
                //     contentType: "application/json",
                //     url: "/catalog/Headers("+sHeaderID+")",
                //     dataType: "json",
                //     success: function (data, textStatus, jqXHR) {
                //         this._this.RequestData=data;
                //         var oStoreHeader=data;
                //         var oItem = Object.assign({},oStoreHeader)
                //         var o18hItem = Object.assign({}, oItem);
                //         var o3hItem = Object.assign({}, oItem);
                //         var oEmergencyItem = Object.assign({}, oItem);
                //         oEmergencyItem.Src = "./Image/Emergency.svg";
                //         oEmergencyItem.PullRequest = "Emergency";
                //         if (oStoreHeader.Started18 === true) {
                //             o18hItem.started = true;
                //         } else {
                //             o18hItem.started = false;
                //         }
                //         o18hItem.PullRequest = "18";
                //         o18hItem.Src = "./Image/18Hours.svg";
                //         if (o3hItem.Started === true) {
                //             o3hItem.started = true;
                //         } else {
                //             o3hItem.started = false;
                //         }
                //         o3hItem.PullRequest = "3";
                //         o3hItem.Src = "./Image/3Hours.svg";
                //         var oList = {
                //             "RequestList": [],
                //             "EmergencyList": [oEmergencyItem],
                //             "CompletedPull": []
                //         }
                //         if (oStoreHeader.PullFlag18) {
                //             oList.CompletedPull.push(o18hItem);
                //         } else {
                //             oList.RequestList.push(o18hItem);
                //         }

                //         if (oStoreHeader.BOHFlag3) {
                //             oList.CompletedPull.push(o3hItem);
                //         } else {
                //             oList.RequestList.push(o3hItem);
                //         }
                //         var oTileModel = new sap.ui.model.json.JSONModel();
                //         oTileModel.setData(oList);
                //         oTileModel.setProperty("/TodayDate", new Date());
                //         this._this.getOwnerComponent().setModel(oTileModel, "TileModel");
                //     }.bind(obj),
                //     error: function (oError) {
                //     }
                // });


                //      this.updateItems();
                //  this.getView().bindElement("/Headers");
                // var scheduleList = this.getOwnerComponent().getModel().bindList('/Forecast', undefined, undefined, andFilter, undefined);
                this.setHeaderItemModel(sHeaderID)
            },
            setHeaderItemModel: function (sHeaderID) {
                this.getView().setBusy(true);
                var obj = {
                    "HeaderID": parseInt(sHeaderID),
                    "_this": this
                }
                var oModel = this.getOwnerComponent().getModel("Main");
                let sPath = "/Headers(" + sHeaderID + ")";
                this.models.executeRead(oModel, sPath, this).then(
                    function (oData) {
                        this._this.RequestData = oData;
                        var oStoreHeader = oData;
                        var oItem = Object.assign({}, oStoreHeader)
                        var o18hItem = Object.assign({}, oItem);
                        var o3hItem = Object.assign({}, oItem);
                        var oEmergencyItem = Object.assign({}, oItem);
                        oEmergencyItem.Src = "./Image/Emergency.svg";
                        oEmergencyItem.PullRequest = "Emergency";
                        if (oStoreHeader.Started18 === true) {
                            o18hItem.started = true;
                        } else {
                            o18hItem.started = false;
                        }
                        o18hItem.PullRequest = "18";
                        o18hItem.Src = "./Image/18Hours.svg";
                        if (o3hItem.Started === true) {
                            o3hItem.started = true;
                        } else {
                            o3hItem.started = false;
                        }
                        o3hItem.PullRequest = "3";
                        o3hItem.Src = "./Image/3Hours.svg";
                        var oList = {
                            "RequestList": [],
                            "EmergencyList": [oEmergencyItem],
                            "CompletedPull": []
                        }
                        if (oStoreHeader.PullFlag18) {
                            oList.CompletedPull.push(o18hItem);
                        } else {
                            oList.RequestList.push(o18hItem);
                        }

                        if (oStoreHeader.PullFlag3) {
                            oList.CompletedPull.push(o3hItem);
                        } else {
                            oList.RequestList.push(o3hItem);
                        }
                        var oTileModel = new sap.ui.model.json.JSONModel();
                        oTileModel.setData(oList);
                        oTileModel.setProperty("/TodayDate", new Date());
                        this._this.getOwnerComponent().setModel(oTileModel, "TileModel");
                        this._this.getView().setBusy(false);
                    }.bind(obj),
                    function (oError) {
                    }
                )
            },
            updateItems: function () {
                //     var sHeaderID=1000000;
                //var sPath="/HeaderID("+sHeaderID+")";
                //  this.getView().bindElement("{/HeaderID('1000000')}");
                var aFilterList = [];
                aFilterList.push(new Filter("HeaderID", sap.ui.model.FilterOperator.EQ, 1000000));
                aFilterList.push(new Filter("StoreNo", sap.ui.model.FilterOperator.EQ, parseInt(101)))
                var oList = this.getView().byId("idHideList");
                oList.bindItems("/Headers", oList.getBindingInfo("items").template, null, aFilterList)
                // oList.bindItems({
                //     path : "/Headers",
                //     parameters : {
                //         "$filter" : "HeaderID eq '1000000'",
                //     }
                // });
            },

            setTileModel: function () {
                var oTileModel = new sap.ui.model.json.JSONModel("localData/TileSet.json");
                oTileModel.attachRequestCompleted(function (oEvent) {
                    var oTileModel = oEvent.getSource();
                    oTileModel.setProperty("/TodayDate", new Date());
                    this.getOwnerComponent().setModel(oTileModel, "TileModel");

                }.bind(this));
            },
            onPressStart: function (oEvent) {
                let sPath = oEvent.getSource().getBindingContext("TileModel").getPath();
                var oSelectedTile = this.getView().getModel("TileModel").getProperty(sPath)
                var sPullRequest = this.getView().getModel("TileModel").getProperty(sPath + "/PullRequest");
                var sPullRequestText = this.formatter.getRequestName(sPullRequest);
                var oTileSelectedTile = new sap.ui.model.json.JSONModel();
                oTileSelectedTile.setData(oSelectedTile);
                if (sPullRequest === '18') {
                    oTileSelectedTile.setProperty("/ThawTime", 1080);
                } else {
                    oTileSelectedTile.setProperty("/ThawTime", 180);
                }
                this.updateStartFlag(sPullRequest);
                this.getOwnerComponent().setModel(oTileSelectedTile, "TileSelectedTile");
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/RequestTile", sPullRequestText);
                //  this.getOwnerComponent().getModel("ApplicationModel").setProperty("/RequestTile", sName);
                // this.getOwnerComponent().getRouter().navTo("RequestList");  
                let sHeaderID = this.getOwnerComponent().getModel("ApplicationModel").getProperty("/HeaderID");
                this.getOwnerComponent().getRouter().navTo("RequestList", { ObjectId: sHeaderID });

            },
            updateStartFlag: function (sPullRequest) {
                if (sPullRequest === '18') {
                    this.RequestData.Started18 = true;
                } else {
                    this.RequestData.Started = true
                }
                var oModel = this.getOwnerComponent().getModel("Main");
                var sPath = "/Headers(" + this.RequestData.HeaderID + ")";
                this.models.executeUpdate(oModel, sPath, this.RequestData, true, this).then(
                    function (oData) {
                        //  debugger;
                    },
                    function (oError) {
                        //debugger;
                    }
                )
            },
            handleUserPopup: function (oEvent) {
                var oButton = oEvent.getSource();
                this.byId("actionSheet").openBy(oButton);
            },
            onPressRefresh: function (oEvent) {
                window.location.reload();
            },
            onPressChangeStore: function (oEvent) {
                this.openLocationDialog();
            },
            openLocationDialog: function (oEvent) {
                let oView = this.getView();
                if (!this.oLocationDialog) {
                    this.oLocationDialog = Fragment.load({
                        name: "sbux.zptt.Fragment.StoreList",
                        controller: this
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this.oLocationDialog.then(function (oValueHelpDialog) {
                    oValueHelpDialog.open();
                }.bind(this));
            },
            onSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                let aFilterList = [];
                var oFilter = new Filter("StoreDescription", FilterOperator.Contains, sValue);
                aFilterList.push(oFilter)
                // if(!isNaN(sValue)){
                //  var oFilter = new Filter("StoreNo", FilterOperator.Contains, parsent(sValue));
                //  aFilterList.push(oFilter)

                // }
                // var oFilter = new Filter("StoreNo", FilterOperator.Contains, sValue);
                // aFilterList.push(oFilter)

                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter(aFilterList);
            },

            onValueHelpDialogClose: function (oEvent) {
                let oSelectedItem = oEvent.getParameter("selectedItem");
                let oItem = oSelectedItem.getBindingContext("StoreModel").getObject();
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/HeaderID", oItem.HeaderID);
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/StoreNo", oItem.StoreNo);
                this.getOwnerComponent().getModel("ApplicationModel").setProperty("/StoreName", oItem.StoreDescription);
                this.getStoreId().then(
                    function (sHeaderID) {
                        this.setTileListModel(sHeaderID);
                        this.setForcastModel();
                    }.bind(this)
                )
            },
            setStoreModel: function () {

                var oModel = this.getOwnerComponent().getModel("Main");
                let sPath = '/Headers';
                this.models.executeRead(oModel, sPath, this).then(
                    function (oData) {
                        var aStoreList=[];
                        var oStoreList=[];
                        $.each(oData.results,function(i,oItem){
                            if(aStoreList.indexOf(oItem.StoreNo)===-1){
                                oStoreList.push(oItem)  
                                aStoreList.push(oItem.StoreNo);
                            }
                        })
                        
                        var oStoreModel = new sap.ui.model.json.JSONModel();
                        oStoreModel.setData({"StoreList":oStoreList});
                        this.getOwnerComponent().setModel(oStoreModel, "StoreModel");
                        debugger;
                    }.bind(this),
                    function (oError) {
                    }
                )
            }
        });
    });
