// $(".number").on("click", function(){
// 	console.log(this).text();
// });


model = {
	// toEval: "",
	toEval: [],
	// decimalClicked: false,
	// isPositive: true,
	
};

// controller

controller = {
	currentInput : "0",
	justEvaluated : false,
	sendToEval : function(value){
		console.log("start controller.sendtoEval");
		
		model.toEval.push(value);
		controller.clearCurrentInput();

		
	},
	getToEval : function(value){
		console.log("start controller.getToEval");
		return model.toEval;
	},
	clearEval : function(){
		console.log("controller.clearEval();");
		model.toEval=[];
	},
	clearCurrentInput : function(){
		console.log("controller.clearCurrentInput();");
		currentInput="";
	},

	// decimal : {
	// 	getStatus: function(){
	// 		return model.decimalClicked;
	// 	},
	// 	setStatus: function(tOrF){
	// 		model.decimalClicked = tOrF;
	// 	}
	// },

	// justEvaluated: {
	// 	getStatus: function(){
	// 		return model.justEvaluated;
	// 	},
	// 	setStatus: function(tOrF){
	// 		model.justEvaluated=tOrF;
	// 	}
	// },

	// posOrNeg : {
	// 	getStatus: function(){
	// 		return model.isPositive;
	// 	},
	// 	setStatus: function(tOrF){
	// 		model.isPositive = tOrF;
	// 	}
	// },

	

	evaluate: function(){
		console.log("start controller.evaluate()");
		console.log(model.toEval);
		var lastArrayItem = model.toEval[model.toEval.length-1];
		

		//if the last button pressed was an operator, it will be removed from the model.toEval array so it won't be evaluated
		if (["-","+","/","*"].indexOf(lastArrayItem)>-1){
			model.toEval.pop();
		}
		console.log("last item is:" +lastArrayItem);
		var str = controller.getToEval().join("");

		//subtracting a negative number doesn't get evaluated in the eval function, so this just replaces two negations in a row to a plus operator
		str = str.replace("--","+");
		
		var val = eval(str);
		// if(controller.justEvaluated===false){
		if (val>999999999){
			$("#display").text("E");
			controller.clearEval();
			controller.sendToEval("0");
			controller.currentInput="0";
		} else {

			if(val.length>9){
				val = val.splice(0,9);
			}

			$("#display").text(""+val);
			controller.clearEval();
			console.log("cleared eval now it is");
			console.log(model.toEval);

			controller.sendToEval(val);
			controller.currentInput=""+val;
		}

			
			
		// }

		controller.justEvaluated = true;

		console.log("end controller.evaluate()");
		console.log(model.toEval);
	}
};




buttons = {

	init: function(){
		this.numberClick();
		this.operatorClick();
		this.equalClick();
		this.decimalClick();
		this.negateClick();
		this.allClearClick();
		this.clearClick();
	},

	numberClick : function(){
		$(".button").on("click", ".number", function(){
			// console.log("value:");
			// console.log($(this).val());
			var val = $(this).val();
			console.log(val);

			//checks if previous button pressed was an operator and if it was sends operator to model
			if(["*","/","-","+"].indexOf(controller.currentInput)>-1){
				controller.sendToEval(controller.currentInput);
				controller.currentInput="0";
			}

			//this resets everything to be evaluated; this is used when a user starts a new number after evaluating something.
			if (controller.getToEval().length===1){
				controller.clearEval();
				controller.currentInput="";
			}

			/*if the first number of a new input is not zero, then put it on display; this is used so a user can't keep pressing zero to a get number like
			00000023; instead it would display 23*/
			if(val>0 && (controller.currentInput==="0")){
				controller.currentInput="";
				controller.currentInput= controller.currentInput.concat(val);
				$("#display").text(controller.currentInput);
				controller.justEvaluated = false;
			//allows user to append any number to his input
			} else if(controller.currentInput!=="0"){
				if(controller.currentInput.length<9){
					controller.currentInput= controller.currentInput.concat(val);
					$("#display").text(controller.currentInput);
					controller.justEvaluated = false;
				}
			}
							

			console.log("number click " + val);
			console.log(model.toEval);
		});
	},
	operatorClick: function(){
		$(".button").on("click", ".operator", function(){
			var val = $(this).val();

			console.log("operator click " + val);


			if (controller.currentInput.length>0 && !isNaN(controller.currentInput) && controller.justEvaluated === false){
				controller.sendToEval(controller.currentInput);
				
			} 
				controller.currentInput = ""+ val;
				// controller.decimal.setStatus(false);
				$("#display").text(controller.currentInput);
				controller.justEvaluated = false;
		});
	},

	equalClick:function(){
		$("#equal").on("click", function(){
			if(controller.justEvaluated===false){
				controller.sendToEval(controller.currentInput);
			}
			// controller.currentInput="";
			// $("#display").text("");

			// console.log (controller.getToEval().join(""));
			
			// var val = eval(controller.getToEval().join(""));
			// $("#display").text(""+val);
			// controller.clearEval();
			// controller.currentInput=""+val;

			controller.evaluate();

			
		});
	},

	decimalClick: function(){
		$("#decimal").on("click", function(){
			if(["*","/","-","+"].indexOf(controller.currentInput)>-1){
				controller.sendToEval(controller.currentInput);

				controller.currentInput="0";
			}
			
			// if(!controller.decimal.getStatus() && controller.justEvaluated===false){
			if(controller.currentInput.indexOf(".")===-1 && controller.justEvaluated===false){
				controller.currentInput= controller.currentInput.concat(".");
				$("#display").text(controller.currentInput);
				// controller.decimal.setStatus(true);
			}
		});
	},

	negateClick: function(){
		$("#negate").on("click", function(){
			//if current input is a number and not zero;
			if(!isNaN(controller.currentInput) && controller.currentInput!=="0" && controller.justEvaluated === false){
					
				//if the number is positive, change to negative
				if(controller.currentInput[0]!=="-"){
					controller.currentInput = "-" + controller.currentInput;
					$("#display").text(controller.currentInput);
					// controller.posOrNeg.setStatus(false);
				} else if (controller.currentInput[0]==="-"){
					//if the number is negative, change to positive
						console.log("that needs to be removed");
						controller.currentInput = controller.currentInput.slice(1);
						$("#display").text(controller.currentInput);
						// controller.posOrNeg.setStatus(true);
					}
				
				// controller.currentInput =
			}
		});
	},

	allClearClick: function(){
		$("#allClear").on("click", function(){
			controller.clearEval();
			controller.currentInput ="0";
			$("#display").text("0");
			controller.justEvaluated = false;
		});
	},

	clearClick: function(){
		$("#clear").on("click", function(){
			if(!isNaN(controller.currentInput) && controller.justEvaluated===false){
				controller.currentInput="0";
				$("#display").text("0");
			}
		});
	},

};



buttons.init();