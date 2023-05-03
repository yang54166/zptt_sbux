sap.ui.define([
    "./RequestCalculator",
    "sbux/zptt/utils/formatter",
    'sap/m/GroupHeaderListItem',
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    'sap/ui/model/Sorter',
    "sbux/zptt/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, GroupHeaderListItem, MessageBox, Filter, Sorter, models) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.RequestCalculator", {
            formatter: formatter,
            models: models,
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RequestList").attachMatched(this.attachMatchedRequestList, this);
                this.setMessageModel();
            },
            onAfterRendering: function () {
                this.attachClickEvent();
            },
            // attachClickEvent: function () {
            //     var oItems = this.getView().byId("idKeyPadTable").getItems()
            //     var oCells = oItems[0].getCells();
            //     oCells[0].attachBrowserEvent("click", function () {
            //         this.onClickMinus(this)
            //     }.bind(this));
            //     oCells[2].attachBrowserEvent("click", function () {
            //         this.onClickPlus(this)
            //     }.bind(this));
            //     oCells = oItems[1].getCells();
            //     oCells[0].attachBrowserEvent("click", this.onClickOne);
            //     oCells[1].attachBrowserEvent("click", this.onClickTwo);
            //     oCells[2].attachBrowserEvent("click", this.onClickThree);
            //     oCells = oItems[2].getCells();
            //     oCells[0].attachBrowserEvent("click", this.onClickFour);
            //     oCells[1].attachBrowserEvent("click", this.onClickFive);
            //     oCells[2].attachBrowserEvent("click", this.onClickSix);
            //     oCells = oItems[3].getCells();
            //     oCells[0].attachBrowserEvent("click", this.onClickSeven);
            //     oCells[1].attachBrowserEvent("click", this.onClickEight);
            //     oCells[2].attachBrowserEvent("click", this.onClickNine);
            //     oCells = oItems[4].getCells();
            //     oCells[1].attachBrowserEvent("click", this.onClickZero);
            //     oCells[2].attachBrowserEvent("click", this.onClickDelete);
            // },
            // onClickMinus: function (_this) {
            //     let oInput = _this.getVisibleInput();
            //     if(isNaN(parseInt(oInput.getValue()))){
            //         oInput.setValue(0);
            //     }else{
            //        let sValue=parseInt(oInput.getValue())-1;
            //        if(sValue<0){
            //         oInput.setValue(0);
            //        }else{
            //         oInput.setValue(sValue);
            //        }
            //     }
            //     oInput.fireChange();
            // }.bind(this),
            // onClickPlus: function (_this) {
            //     let oInput = _this.getVisibleInput();
            //     if(isNaN(parseInt(oInput.getValue()))){
            //         oInput.setValue(1);
            //     }else{
            //        let sValue=parseInt(oInput.getValue())+1;
            //        if(sValue<0){
            //         oInput.setValue(0);
            //        }else{
            //         oInput.setValue(sValue);
            //        }
            //     }
            //     oInput.fireChange();
            // },
            getBindList: function () {
                var aFilterList = [];
                aFilterList.push(new Filter("HeaderID", sap.ui.model.FilterOperator.EQ, this.HeaderID));
                var oList = this.getView().byId("idHideList");
                oList.bindItems("/Headers", oList.getBindingInfo("items").template, null, aFilterList)
            },
            attachMatchedRequestList: function (oEvent) {
                this.getView().byId("idVboxRequestDetails").setVisible(false);
                this.getView().byId("idVboxNoData").setVisible(true);
                this.HeaderID = oEvent.getParameter("arguments").ObjectId;
                try {
                    var oSelectedTile = this.getOwnerComponent().getModel("TileSelectedTile").getData();
                    this.ThawTime = oSelectedTile.ThawTime;
                } catch (oError) {
                    this.ThawTime = 180;
                }
                this.updateListModel();
                this.getBindList();
                //   this.getItemList(oSelectedTile);

            },
            updateListModel: function () {
                var aFilterList = [];
                var sHeaderId = this.HeaderID;
                aFilterList.push(new Filter("HeaderID_HeaderID", sap.ui.model.FilterOperator.EQ, parseInt(sHeaderId)));
                aFilterList.push(new Filter("ThawTime", sap.ui.model.FilterOperator.EQ, this.ThawTime));
                var oList = this.getView().byId("idProductList");
                var aSorters = [];
                aSorters.push(new Sorter("DeptSubClass", false, true));
                oList.bindItems("/Items", oList.getBindingInfo("items").template, aSorters, aFilterList);

                // var oModel=this.getOwnerComponent().getModel("Main");
                // let sPath="/Items";
                // this.models.executeRead(oModel,sPath,this,aFilterList).then(
                //     function(oData){              
                //     }.bind(this),
                //     function(oError){
                //         debugger
                //     }
                // )

            },
            getItemList: function (oSelectedTile) {
                var obj = {
                    "_this": this,
                    "HeaderID": oSelectedTile.HeaderID
                }
                jQuery.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "/catalog/Items",
                    dataType: "json",
                    data: { HeaderID: "1000000" },
                    success: function (data, textStatus, jqXHR) {
                        var oItemList = [];
                        var sHeaderID = this.HeaderID;
                        $.each(data.value, function (i, oItem) {
                            if (oItem.HeaderID_HeaderID === parseInt(sHeaderID)) {
                                oItemList.push(oItem)
                            }
                        })
                        var oProductModel = new sap.ui.model.json.JSONModel();
                        oProductModel.setData({
                            "ProductList": oItemList
                        })
                        this._this.getOwnerComponent().setModel(oProductModel, "ProductModel");
                    }.bind(obj),
                    error: function (oError) {
                    }
                });

                // var scheduleList = this._oModel.bindList('/Forecast', undefined, undefined, andFilter, undefined);

            },
            setProductModel: function () {
                var oProductModel = new sap.ui.model.json.JSONModel("localData/ProductListSet.json");
                oProductModel.attachRequestCompleted(function (oEvent) {
                    var oProductModel = oEvent.getSource();
                    this.getOwnerComponent().setModel(oProductModel, "ProductModel");

                }.bind(this));
            },
            getGroupHeader: function (oGroup) {
                return new GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: false
                });
            },
            getSubClass: function (oContext) {
                var obj = oContext.getObject();
                return obj.DeptSubClass;

            },
            onPressExit: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("Main");
            },
            onSelectListItem: function (oEvent) {
                this.getView().byId("idVboxRequestDetails").setVisible(true);
                this.getView().byId("idVboxNoData").setVisible(false);
                var sPath = oEvent.getSource().getSelectedContextPaths()[0];
                var oItemData = oEvent.getSource().getSelectedContexts()[0].getObject();
                var oProductItem = new sap.ui.model.json.JSONModel();
                oProductItem.setData(oItemData);
                this.getOwnerComponent().setModel(oProductItem, "ProductItem");
                this.setForecastModel(oItemData);
            },
            handleChangeBOH: function (oEvent) {
                let sValue = oEvent.getSource().getValue();
                let oItemContext = this.getView().byId("idProductList").getSelectedItems()[0].getBindingContext();
                oItemContext.setProperty('BOHQty', parseInt(sValue));
                this.setUpdatedListCount();
            },
            handleChangeFOH: function (oEvent) {
                let sValue = oEvent.getSource().getValue();
                let oItemContext = this.getView().byId("idProductList").getSelectedItems()[0].getBindingContext();
                oItemContext.setProperty('FOHQty', parseInt(sValue));
                //Update Carryover 
                let oSelectedObject = oItemContext.getObject();
                let sFOHQty = oSelectedObject.FOHQty;
                let sBOHQty = oSelectedObject.BOHQty;
                oItemContext.setProperty('Carryover', parseInt(sFOHQty + sBOHQty));
                this.setUpdatedListCount();
            },

            handleChangeCarryOver: function (oEvent) {
                let sValue = oEvent.getSource().getValue();
                let oItemContext = this.getView().byId("idProductList").getSelectedItems()[0].getBindingContext();
                oItemContext.setProperty('ClacPull', parseInt(sValue));
                this.setUpdatedListCount();
            },
            onPressPull: function (oEvent) {
                var oItem = oEvent.getSource().getBindingContext().getObject();
                let oItemContext = oEvent.getSource().getBindingContext();
                if (oEvent.getSource().getText() === "Pull") {
                    let sValue = this.getPullQty(oItem.ClacPull, oItem.Carryover, oItem.ActualPullQty, oItem.ItemNo);
                    oItemContext.setProperty('ActualPullQty', parseInt(sValue));
                    // let sValue = '';
                    // if (oItem.Carryover === null) {
                    //     sValue = oItem.FOHQty + oItem.BOHQty;
                    // } else {
                    //     sValue = oItem.Carryover;
                    // }
                    // debugger;
                    ///      oItemContext.setProperty('ActualPullQty', parseInt(sValue));
                } else {
                    oItemContext.setProperty('ActualPullQty', null);
                }
                this.setUpdatedListCount();
            },
            getPullQty: function (sClacPull, sCarryover, sActualPullQty, sItemNo) {
                try {
                    if (sActualPullQty === null) {
                        if (sClacPull !== null) {
                            return sClacPull;
                        }
                        var sHH = new Date().getHours();
                        var sForcastQty = 0;
                        let sMinDiff = 24;
                        let oForcastList = this.getOwnerComponent().getModel("ForeCastListModel").getProperty("/" + sItemNo);

                        for (let i = 0; i < oForcastList.length; i++) {
                            if (i === 0) {
                                sForcastQty = oForcastList[i].Quantity;
                            }
                            let sTimeDiff = sHH - parseInt(oForcastList[i].Hour);
                            if (sTimeDiff >= 0) {
                                if (sMinDiff > sTimeDiff) {
                                    sMinDiff = sTimeDiff;
                                    sForcastQty = oForcastList[i].Quantity;
                                }
                            }
                        }
                        if ((sForcastQty - sCarryover) < 0) {
                            return 0;
                        }
                        return (sForcastQty - sCarryover);
                    } else {
                        return sActualPullQty;
                    }
                } catch (oError) {
                    return 0;
                }
            },
            setUpdatedListCount: function () {
                try {

                    var oList = this.getView().byId("idProductList").getItems()
                    var sTotalCount = 0, sCompletedBOH = 0, sCompletedFOH = 0, sActualPullQty = 0;
                    $.each(oList, function (i, oItem) {
                        if (oItem.getBindingContext() !== undefined) {
                            sTotalCount = sTotalCount + 1;
                            if (oItem.getBindingContext().getObject().BOHQty !== null) {
                                sCompletedBOH = sCompletedBOH + 1;
                            }
                            if (oItem.getBindingContext().getObject().FOHQty !== null) {
                                sCompletedFOH = sCompletedFOH + 1;
                            }
                            if (oItem.getBindingContext().getObject().ActualPullQty !== null) {
                                sActualPullQty = sActualPullQty + 1;
                            }
                        }
                    })
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/TotalCount", sTotalCount);
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/CompletedBOH", sCompletedBOH);
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/CompletedFOH", sCompletedFOH);
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/ActualPullQty", sActualPullQty);

                } catch (oError) {

                }
            },
            onUpdateFinishList: function (oEvent) {
                this.setUpdatedListCount();
                //Check              
            },
            handleBOHDone: function (oEvent) {
                if(this.oBoHDoneDialog===undefined){
                    this.oBoHDoneDialog = new sap.m.Dialog({
                        showHeader:false,
                        contentHeight:"8rem",
                        contentWidth:"30rem",
                        content: [
                            new sap.m.VBox({
                                class:"sapUiSmallMargin",
                                items:[
                                    new sap.m.Text({
                                        text:this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Uncounteditems")
                                    }).addStyleClass("sbuxTextBold"),
                                    new sap.m.Text({
                                        text:this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Alluncounteditems")
                                    }).addStyleClass("sapUiSmallMarginTopBottom")
                                ]
                            }).addStyleClass("sapUiSmallMargin")
                        ],
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "Cancel",
                            press: function () {
                                this.oBoHDoneDialog.close();
                            }.bind(this)
                        }).addStyleClass("sbuxDialogButtonNoColor"),
                        endButton: new sap.m.Button({
                            text: "Assign",
                            press: function () {
                                this.setBoHZero();
                                this.oBoHDoneDialog.close();
                            }.bind(this)
                        }).addStyleClass("sbuxDialogButton")
                    }).addStyleClass("sbuxDialogFooter");  
                       // to get access to the controller's model
                     this.getView().addDependent(this.oBoHDoneDialog); 
                }
           
             
                

                let sTotalCount = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/TotalCount");
                let sCompletedBoh = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/CompletedBOH");
                if (sTotalCount === sCompletedBoh) {
                    this.setCompletedBoH();
                } else {
                    //     MessageBox.warning(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("YouHaveUncounteditems"), {
                    //         actions: [MessageBox.Action.CANCEL, "Assign"],
                    //         emphasizedAction: "Assign",
                    //         onClose: function (oAction) {
                    //             if (oAction === 'Assign') {
                    //                 this.setBoHZero();
                    //             }
                    //         }.bind(this)
                    //     });

                    this.oBoHDoneDialog.open();
                    // to get access to the controller's model
                    // this.getView().addDependent(this.oDefaultDialog);
                    // this.oDefaultDialog.open();
                }

            },
            handleFOHDone: function (oEvent) {
                if(this.oFoHDoneDialog===undefined){
                    this.oFoHDoneDialog = new sap.m.Dialog({
                        showHeader:false,
                        contentHeight:"8rem",
                        contentWidth:"30rem",
                        content: [
                            new sap.m.VBox({
                                class:"sapUiSmallMargin",
                                items:[
                                    new sap.m.Text({
                                        text:this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Uncounteditems")
                                    }).addStyleClass("sbuxTextBold"),
                                    new sap.m.Text({
                                        text:this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Alluncounteditems")
                                    }).addStyleClass("sapUiSmallMarginTopBottom")
                                ]
                            }).addStyleClass("sapUiSmallMargin")
                        ],
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "Cancel",
                            press: function () {
                                this.oFoHDoneDialog.close();
                            }.bind(this)
                        }).addStyleClass("sbuxDialogButtonNoColor"),
                        endButton: new sap.m.Button({
                            text: "Assign",
                            press: function () {
                                this.setFoHZero();
                                this.oFoHDoneDialog.close();
                            }.bind(this)
                        }).addStyleClass("sbuxDialogButton")
                    }).addStyleClass("sbuxDialogFooter");  
                       // to get access to the controller's model
                     this.getView().addDependent(this.oFoHDoneDialog); 
                }
                let sTotalCount = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/TotalCount");
                let sCompletedFOH = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/CompletedFOH");
                if (sTotalCount === sCompletedFOH) {
                    this.setCompletedFoH();
                } else {
                    
                    this.oFoHDoneDialog.open();
                    // MessageBox.warning(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("YouHaveUncounteditems"), {
                    //     actions: [MessageBox.Action.CANCEL, "Assign"],
                    //     emphasizedAction: "Assign",
                    //     onClose: function (oAction) {
                    //         if (oAction === 'Assign') {
                    //             this.setFoHZero();
                    //         }
                    //     }.bind(this)
                    // });
                }
            },
            handleCompletePull: function (oEvent) {
                // MessageBox.confirm(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("DoYouWantToCompleteThePull"), {
                //     actions: [MessageBox.Action.CANCEL, MessageBox.Action.OK],
                //     emphasizedAction: "OK",
                //     onClose: function (oAction) {
                //         if (oAction === 'OK') {
                            this.setCompletedPull();
                //         }
                //     }.bind(this)
                // });
            },
            setCompletedPull: function (oEvent) {
                var oContext = this.getView().byId("idHideList").getItems()[0].getBindingContext();
                if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '18') {
                    oContext.setProperty("PullFlag18", true);
                } else if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '3') {
                    oContext.setProperty("PullFlag3", true);
                }
                this.getOwnerComponent().getModel("MessageModel").setProperty("/BOHFlag", false);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/FOHFlag", false);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/PullFlag", true);
                this.getOwnerComponent().getRouter().navTo("MessageDisplay", { ObjectId: this.HeaderID });
                // MessageBox.success(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("PullCompletedMessage"), {
                //     onClose: function (oAction) {
                //         this.getOwnerComponent().getRouter().navTo("Main");
                //     }.bind(this)
                // });
            },
            setCompletedBoH: function (oEvent) {
                var oContext = this.getView().byId("idHideList").getItems()[0].getBindingContext();
                if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '18') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/BOHFlag18", true)
                    oContext.setProperty("BOHFlag18", true);

                } else if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '3') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/BOHFlag3", true)
                    oContext.setProperty("BOHFlag3", true);

                }

                this.getOwnerComponent().getModel("TileSelectedTile").refresh(true);
                // MessageBox.success(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("BOHCompletedMessage"));
                this.getOwnerComponent().getModel("MessageModel").setProperty("/BOHFlag", true);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/FOHFlag", false);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/PullFlag", false);
                this.getOwnerComponent().getRouter().navTo("MessageDisplay", { ObjectId: this.HeaderID });
                this.getView().getModel().refresh();

            },
            onPressNav: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("MessageDisplay", { ObjectId: this.HeaderID });
                //   this.getOwnerComponent().getRouter().navTo("MessageDisplay");
            },
            setBoHZero: function () {
                if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '18') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/BOHFlag18", true)
                } else if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '3') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/BOHFlag3", true)
                }

                var oList = this.getView().byId("idProductList").getItems();
                $.each(oList, function (i, oItem) {
                    if (oItem.getBindingContext() !== undefined) {
                        if (oItem.getBindingContext().getObject().BOHQty === null) {
                            oItem.getBindingContext().setProperty('BOHQty', 0);
                        }
                    }
                })
                this.setUpdatedListCount();
                this.setCompletedBoH();
            },
            setCompletedFoH: function (oEvent) {
                var oContext = this.getView().byId("idHideList").getItems()[0].getBindingContext();
                if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '18') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/FOHFlag18", true)
                    oContext.setProperty("FOHFlag18", true);
                } else if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '3') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/FOHFlag3", true)
                    oContext.setProperty("FOHFlag3", true);
                }
                this.getOwnerComponent().getModel("TileSelectedTile").refresh(true);
                // MessageBox.success(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("FOHCompletedMessage"));
                this.getOwnerComponent().getModel("MessageModel").setProperty("/BOHFlag", false);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/FOHFlag", true);
                this.getOwnerComponent().getModel("MessageModel").setProperty("/PullFlag", false);
                this.getOwnerComponent().getRouter().navTo("MessageDisplay", { ObjectId: this.HeaderID });
                this.getView().getModel().refresh();



            },
            setFoHZero: function () {
                if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '18') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/FOHFlag18", true)
                } else if (this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest") === '3') {
                    this.getOwnerComponent().getModel("TileSelectedTile").setProperty("/FOHFlag3", true)
                }
                var oList = this.getView().byId("idProductList").getItems();
                $.each(oList, function (i, oItem) {
                    if (oItem.getBindingContext() !== undefined) {
                        if (oItem.getBindingContext().getObject().FOHQty === null) {
                            //                          oItem.getBindingContext().setProperty('BOHQty', null);
                            oItem.getBindingContext().setProperty('FOHQty', 0);
                            let oSelectedObject = oItem.getBindingContext().getObject();
                            let sFOHQty = oSelectedObject.FOHQty;
                            let sBOHQty = oSelectedObject.FOHQty;
                            oItem.getBindingContext().setProperty('Carryover', parseInt(sFOHQty + sBOHQty));
                        }
                    }
                })
                this.setUpdatedListCount();
                this.setCompletedFoH();
            },
            resetStore: function () {
                var oList = this.getView().byId("idProductList").getItems();
                $.each(oList, function (i, oItem) {
                    if (oItem.getBindingContext() !== undefined) {
                        oItem.getBindingContext().setProperty('BOHQty', null);
                        oItem.getBindingContext().setProperty('FOHQty', null);
                        oItem.getBindingContext().setProperty('Carryover', null);
                        oItem.getBindingContext().setProperty('ActualPullQty', null);
                        oItem.getBindingContext().setProperty('ClacPull', null);


                    }
                })
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("BOHFlag18", false)
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("BOHFlag3", false)
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("FOHFlag18", false);
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("FOHFlag3", false)
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("PullFlag18", false);
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("PullFlag3", false)

                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("Started18", false)
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("Started", false);
                this.getView().byId("idHideList").getItems()[0].getBindingContext().setProperty("StartedEmg", false)
            },
            setForecastModel: function (oItem) {
                var sLocation = this.getOwnerComponent().getModel("ApplicationModel").getProperty("/StoreNo");
                var sItemNo = oItem.ItemNo;
                var aFilterList = [];
                aFilterList.push(new Filter("ItemNo", sap.ui.model.FilterOperator.EQ, sItemNo));
                aFilterList.push(new Filter("Location", sap.ui.model.FilterOperator.EQ, sLocation));
                aFilterList.push(new Filter("BusinessDate", sap.ui.model.FilterOperator.EQ, new Date()));
                var oModel = this.getOwnerComponent().getModel("Main");
                let sPath = '/Forecast';
                this.models.executeRead(oModel, sPath, this, aFilterList).then(
                    function (oData) {
                        var sHH = new Date().getHours();
                        var oForecastItem = {};
                        let sMinDiff = 24;
                        for (let i = 0; i < oData.results.length; i++) {
                            if (i === 0) {
                                oForecastItem = oData.results[i];
                            }
                            let sTimeDiff = sHH - parseInt(oData.results[i].Hour);
                            if (sTimeDiff >= 0) {
                                if (sMinDiff > sTimeDiff) {
                                    sMinDiff = sTimeDiff;
                                    oForecastItem = oData.results[i];
                                }
                            }
                        }
                        var oForeCastModel = new sap.ui.model.json.JSONModel();
                        oForeCastModel.setData(oForecastItem);
                        this.getOwnerComponent().setModel(oForeCastModel, "ForeCastModel");
                    }.bind(this),
                    function (oError) {
                    }
                )
            },
            setMessageModel: function () {
                let oMessageModel = new sap.ui.model.json.JSONModel();
                oMessageModel.setData({
                    "BOHFlag": false,
                    "FOHFlag": false,
                    "PullFlag": false
                })
                this.getOwnerComponent().setModel(oMessageModel, "MessageModel");
            },
            handLiveChangeInput:function(oEvent){
                let sValue=oEvent.getSource().getValue();
                if(sValue.length>3){
                    sValue=sValue.substring(0,3);
                    oEvent.getSource().setValue(sValue);  
                }
                oEvent.getSource().fireChange();
            }




        });
    });
