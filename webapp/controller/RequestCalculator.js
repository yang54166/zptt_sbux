sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, GroupHeaderListItem, MessageBox, Filter, Sorter, models) {
        "use strict";

        return Controller.extend("sbux.zptt.controller.RequestList", {
            attachClickEvent: function () {
                var oItems = this.getView().byId("idKeyPadTable").getItems()
                //Code for First Row 
                var oCells = oItems[0].getCells();
                oCells[0].attachBrowserEvent("click", function () {
                    this.onClickMinus(this);
                }.bind(this));
                oCells[2].attachBrowserEvent("click", function () {
                    this.onClickPlus(this);
                }.bind(this));
                // oCells[2].attachBrowserEvent("click", this.onClickPlus)
                //second Row
                oCells = oItems[1].getCells();
                oCells[0].attachBrowserEvent("click", function () {
                    this.onClickOne(this);
                }.bind(this))
                oCells[1].attachBrowserEvent("click", function () {
                    this.onClickTwo(this);
                }.bind(this))
                oCells[2].attachBrowserEvent("click", function () {
                    this.onClickThree(this);
                }.bind(this))
                // oCells[0].attachBrowserEvent("click", this.onClickOne);
                // oCells[1].attachBrowserEvent("click", this.onClickTwo);
                // oCells[2].attachBrowserEvent("click", this.onClickThree);

                oCells = oItems[2].getCells();
                oCells[0].attachBrowserEvent("click", function () {
                    this.onClickFour(this);
                }.bind(this));
                oCells[1].attachBrowserEvent("click", function () {
                    this.onClickFive(this);
                }.bind(this));
                oCells[2].attachBrowserEvent("click", function () {
                    this.onClickSix(this);
                }.bind(this));
                // oCells[0].attachBrowserEvent("click", this.onClickFour);
                // oCells[1].attachBrowserEvent("click", this.onClickFive);
                // oCells[2].attachBrowserEvent("click", this.onClickSix);

                oCells = oItems[3].getCells();
                oCells[0].attachBrowserEvent("click", function () {
                    this.onClickSeven(this);
                }.bind(this));
                oCells[1].attachBrowserEvent("click", function () {
                    this.onClickEight(this);
                }.bind(this));
                oCells[2].attachBrowserEvent("click", function () {
                    this.onClickNine(this);
                }.bind(this))
                // oCells[0].attachBrowserEvent("click", this.onClickSeven);
                // oCells[1].attachBrowserEvent("click", this.onClickEight);
                // oCells[2].attachBrowserEvent("click", this.onClickNine);
                oCells = oItems[4].getCells();
                oCells[1].attachBrowserEvent("click", function () {
                    this.onClickZero(this);
                }.bind(this));
                oCells[2].attachBrowserEvent("click", function () {
                    this.onClickDelete(this);
                }.bind(this))
                // oCells[1].attachBrowserEvent("click", this.onClickZero);
                // oCells[2].attachBrowserEvent("click", this.onClickDelete);


            },
            onClickMinus: function (_this) {
                // this=oEvent
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(0);
                } else {
                    let sValue = parseInt(oInput.getValue()) - 1;
                    if (sValue < 0) {
                        oInput.setValue(0);
                    } else {
                        oInput.setValue(sValue);
                    }
                }
                oInput.fireChange();
            }.bind(this),
            onClickPlus: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(1);
                } else {
                    let sValue = parseInt(oInput.getValue()) + 1;
                    if (sValue < 0) {
                        oInput.setValue(0);
                    } else {
                        oInput.setValue(sValue);
                    }
                }
                oInput.fireChange();
            },
            onClickOne: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(1);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 1;
                    } else {
                        sValue = parseInt(sValue.toString() + 1)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickTwo: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(2);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 2;
                    } else {
                        sValue = parseInt(sValue.toString() + 2)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickThree: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(3);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 3;
                    } else {
                        sValue = parseInt(sValue.toString() + 3)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickFour: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(4);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 4;
                    } else {
                        sValue = parseInt(sValue.toString() + 4)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickFive: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(5);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 5;
                    } else {
                        sValue = parseInt(sValue.toString() + 5)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickSix: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(6);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 6;
                    } else {
                        sValue = parseInt(sValue.toString() + 6)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickSeven: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(7);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 7;
                    } else {
                        sValue = parseInt(sValue.toString() + 7)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickEight: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(8);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 8;
                    } else {
                        sValue = parseInt(sValue.toString() + 8)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickNine: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(9);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = sValue + 9;
                    } else {
                        sValue = parseInt(sValue.toString() + 9)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickZero: function (_this) {
                let oInput = _this.getVisibleInput();
                if (isNaN(parseInt(oInput.getValue()))) {
                    oInput.setValue(0);
                } else {
                    let sValue = parseInt(oInput.getValue());
                    if (sValue === 0) {
                        sValue = 0;
                    } else {
                        sValue = parseInt(sValue.toString() + 0)
                    }
                    oInput.setValue(sValue);
                }
                oInput.fireChange();
            },
            onClickDelete:function (_this) {
                let oInput = _this.getVisibleInput();
                if(oInput.getValue()!==''){
                    let sValue = oInput.getValue().substring(0,oInput.getValue().length-1); 
                    sValue = parseInt(sValue);
                    if(isNaN(sValue)){
                        oInput.setValue('');
                    }else{
                        oInput.setValue(sValue);
                    }
                    
                    // let = parseInt(oInput.getValue());
                }
                // if (isNaN(parseInt(oInput.getValue()))) {
                //     oInput.setValue(0);
                // } else {
                //     let sValue = parseInt(oInput.getValue());
                //     if (sValue === 0) {
                //         sValue = 0;
                //     } else {
                //         sValue = parseInt(sValue.toString() + 0)
                //     }
                //     oInput.setValue(sValue);
                // }
                oInput.fireChange();
            },
            getVisibleInput: function () {
                try {
                    var oTileSelectedTile = this.getOwnerComponent().getModel("TileSelectedTile").getData();
                    let bFlag = this.formatter.getHBoxVisibleBoH(oTileSelectedTile.PullRequest, oTileSelectedTile.BOHFlag18, oTileSelectedTile.BOHFlag3);
                    if (bFlag) {
                        return this.getView().byId("idBoHInput");
                    }
                    bFlag = this.formatter.getHBoxVisibleFoH(oTileSelectedTile.PullRequest, oTileSelectedTile.FOHFlag18, oTileSelectedTile.FOHFlag3,oTileSelectedTile.BOHFlag18, oTileSelectedTile.BOHFlag3);
                    if (bFlag) {
                        return this.getView().byId("idFoHInput");
                    }

                    bFlag = this.formatter.getHBoxVisiblePull(oTileSelectedTile.PullRequest, oTileSelectedTile.FOHFlag18, oTileSelectedTile.FOHFlag3, oTileSelectedTile.BOHFlag18, oTileSelectedTile.BOHFlag3);
                    if (bFlag) {
                        return this.getView().byId("idPullInput");
                    }
                } catch (oError) {

                }

            },
        });
    });
