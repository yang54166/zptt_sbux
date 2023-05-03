sap.ui.define([
], function () {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		getRequestSrc: function (sValue) {
			if (sValue === "3") {
				return "./Image/" + sValue + "Hours.svg";
			} else {
				return "./Image/" + sValue + "Hours.svg";
			}
		},
		getRequestName: function (sValue) {
			if (sValue === "3") {
				return "3hr Pull";
			} else if (sValue === "18") {
				return "18hr Pull";
			} else {
				return "Emergency Pull"
			}
		},
		getStatusText: function (sValue) {
			if (sValue) {
				return "In Progress";
			} else {
				return 'Not Started';
			}
		},
		getButtonText: function (sValue) {
			if (sValue) {
				return "Resume ";
			} else {
				return 'Start';
			}
		},
		getStatusEmergencyText: function (sValue) {
			return 'Optional';

		},
		getStatus: function (sValue) {
			if (sValue) {
				return "Success";
			} else {
				return 'Error';
			}
		},
		getPullDay: function (oDate) {
			const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let sEndText = "th";
			if (oDate.getDate() === 1) {
				sEndText = "st";
			} else if (oDate.getDate() === 2) {
				sEndText = "nd";
			} else if (oDate.getDate() === 3) {
				sEndText = "rd";
			}
			var sDateSting = weekday[oDate.getDay()] + "," + monthNames[oDate.getMonth()] + " " + oDate.getDate() + sEndText;
			return sDateSting;
			// var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd",displayFormat:"long" });   
			// var dateFormatted = dateFormat.format(oDate);
		},
		getProductQuantity: function (sValue) {
			//debugger;
			if (sValue === '' || sValue === null) {
				return '_ _'
			} else {
				return sValue;
			}
		},
		getProductQuantity1: function (sValue) {
			debugger;
			if (sValue === '' || sValue === null) {
				return '__'
			} else {
				return sValue;
			}
		},
		getCheckIconVisibilityBoH: function (sBohValue) {
			debugger;
			if ((!bBoH18) && (!bBoH3)) {
				if (sBoh !== undefined && sBoh !== null) {
					return true;
				}
			}
			return false;
		},
		getCheckIconVisibilityFoH: function (bBoH18, bBoH3, bFoH18, bFoH3, sFohValue) {
			if (bBoH18 || bBoH3) {
				if ((!bFoH18) && (!bFoH3)) {
					if (sFoH !== undefined && sFoh !== null) {
						return true;
					}
				}
			}
			return false;
		},
		getStartButtonVisibility: function (sBOHQty, sFOHQty) {
			try {
				var sBOHFlag18 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/BOHFlag18")
				var sBOHFlag3 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/BOHFlag3")
				var sFOHFlag18 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/FOHFlag18")
				var sFOHFlag3 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/FOHFlag3")
				var sPullRequest = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest");
				if (sPullRequest === '3') {
					if (sBOHFlag3) {

						if (sFOHFlag3) {
							return false;
						} else {
							if (sFOHQty !== undefined && sFOHQty !== null) {
								return true;
							}
						}
						//return false;
					} else {
						if (sBOHQty !== undefined && sBOHQty !== null) {
							return true;
						}
					}
				}
				if (sPullRequest === '18') {
					if (sBOHFlag18) {

						if (sFOHFlag18) {
							return false;
						} else {
							if (sFOHQty !== undefined && sFOHQty !== null) {
								return true;
							}
						}
						//return false;
					} else {
						if (sBOHQty !== undefined && sBOHQty !== null) {
							return true;
						}
					}
				}
				// if (sBOHFlag18 || sBOHFlag3) {

				// 	if (sFOHFlag18 || sFOHFlag3) {
				// 		return false;
				// 	} else {
				// 		if (sFOHQty !== undefined && sFOHQty !== null) {
				// 			return true;
				// 		}
				// 	}
				// 	//return false;
				// } else {
				// 	if (sBOHQty !== undefined && sBOHQty !== null) {
				// 		return true;
				// 	}
				// }
				return false;
			} catch (oError) {
				return false;
			}

		},
		getPullButton: function (sCarryover, sFOHQty) {
			try {
				var sBOHFlag18 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/BOHFlag18");
				var sBOHFlag3 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/BOHFlag3");
				var sFOHFlag18 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/FOHFlag18");
				var sFOHFlag3 = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/FOHFlag3");
				var sPullRequest = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest");
				if (sPullRequest === '3') {
					if (sFOHFlag3) {
						return true;
					} else {
						return false;
					}
				}
				if (sPullRequest === '18') {
					if (sFOHFlag18) {
						return true;
					} else {
						return false;
					}
				}
				// if (sFOHFlag18 || sFOHFlag3) {
				// 	return true;
				// } else {
				// 	return false;
				// }
			} catch (oError) {
				return false;
			}

		},
		getPullButtonText: function (sCarryover) {
			if (sCarryover !== undefined && sCarryover !== null) {
				return "Undo";
			} else {
				return "Pull"
			}

		},
		getPullValue: function (sBOHQty, sFOHQty, sQuantity) {
			if (sQuantity === undefined || sQuantity === null) {
				sQuantity = 0;
			}
			var sRequiredQty = sQuantity - (sBOHQty + sFOHQty);
			if (sRequiredQty > 0) {
				return parseInt(sRequiredQty);
			} else {
				return 0;
			}
			// if(sCarryover===null||sCarryover===undefined){
			// 	return sBOHQty+sFOHQty;
			// }else{
			// 	return sCarryover;
			// }
		},
		getHBoxVisibleBoH: function (sRequestType, bBoH18, bBoH3) {
			if (sRequestType === '18') {
				if (bBoH18) {
					return false
				} else {
					return true
				}
			}
			if (sRequestType === '3') {
				if (bBoH3) {
					return false
				} else {
					return true
				}
			}
		},
		getHBoxVisibleFoH: function (sRequestType, bFoH18, bFoH3, bBoH18, bBoH3) {
			if (sRequestType === '18' && bBoH18) {
				if (bFoH18) {
					return false
				} else {
					return true
				}
			}
			if (sRequestType === '3' && bBoH3) {
				if (bFoH3) {
					return false
				} else {
					return true
				}
			}
			return false;
		},
		getHBoxVisiblePull: function (sRequestType, bFoH18, bFoH3, bBoH18, bBoH3) {
			if (sRequestType === '18' && bBoH18 && bFoH18) {
				return true
			}
			if (sRequestType === '3' && bBoH3 && bFoH3) {
				return true
			}
			return false;
		},
		getCompletedTask: function (sCompletedBOH, sTotalCount) {
			return sCompletedBOH / sTotalCount * 100
		},
		getCompletePullButton: function (sCompleted, sTotalCount) {
			if (sCompleted === sTotalCount) {
				return true;
			} else {
				return false;
			}
		},
		getSelectedKey: function (sBOHFlag18, sBOHFlag3, sFOHFlag18, sFOHFlag3) {
			var sPullRequest = this.getOwnerComponent().getModel("TileSelectedTile").getProperty("/PullRequest");
			if (sPullRequest === '3') {
				if (sBOHFlag3) {
					return 'FoH'
				} else {
					return 'BoH';
				}
			}
			if (sPullRequest === '18') {
				if (sBOHFlag18) {
					return 'FoH'
				} else {
					return 'BoH';
				}
			}
			// if (sBOHFlag18 || sBOHFlag3) {
			// 	return 'FoH'
			// } else {
			// 	return 'BoH';
			// }
		},
		getIconVisibility: function (sRequestType, sBOHFlag18, sBOHFlag3, sFOHFlag18, sFOHFlag3) {
			if (sRequestType === '3') {
				if ((sBOHFlag3) && (sFOHFlag3)) {
					return false;
				} else {
					return true;
				}
			}
			if (sRequestType === '18') {
				if ((sBOHFlag18) && (sFOHFlag18)) {
					return false;
				} else {
					return true;
				}
			}
			// if ((sBOHFlag18 || sBOHFlag3) && (sFOHFlag18 || sFOHFlag3)) {
			// 	return false;
			// } else {
			// 	return true;
			// }
		},
		getCarryOverQnt: function (sBoh, sFoh, sCarryover) {
			if (sCarryover !== null) {
				return sCarryover;
			} else {
				if (sFoh === null && sBoh === null) {
					return "_ _";
				}
				else if (sFoh === null && sBoh !== null) {
					return sBoh;
				} else if (sFoh !== null) {
					return sFoh + sBoh
				}
			}
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
					if((sForcastQty - sCarryover)<0){
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
		getForcastQty: function (sItemNo) {
		},
		
		getQltOrDash:function(sValue){
			if(sValue===null){
				return '__';
			}else{
				return sValue;
			}
		}
	};

}
);