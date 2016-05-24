// $(".number").on("click", function(){
// 	console.log(this).text();
// });


model = {
	// toEval: "",
	toEval: [],
	decimalClicked: false,
};

// controller

controller = {
	currentInput : "0",
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

	decimal : {
		getStatus: function(){
			return model.decimalClicked;
		},
		setStatus: function(tOrF){
			model.decimalClicked = tOrF;
		}
	},

	

	evaluate: function(){
		console.log("start controller.evaluate()");
		console.log(model.toEval);
		var lastArrayItem = model.toEval[model.toEval.length-1];
		
		//if the last button pressed was an operator, it will be removed from the model.toEval array so it won't be evaluated
		if (["-","+","/","*"].indexOf(lastArrayItem)>-1){
			model.toEval.pop();
		}
		console.log("last item is:" +lastArrayItem);
		var val = eval(controller.getToEval().join(""));
		$("#display").text(""+val);
		controller.clearEval();

		this.sendToEval(val);
		controller.currentInput=val;

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
		// this.allClearClick();
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

			/*if the first number of a new input is not zero, then put it on display; this is used so a user can't keep pressing zero to a get number like
			00000023; instead it would display 23*/
			if(val>0 && controller.currentInput==="0"){
				controller.currentInput="";
				controller.currentInput= controller.currentInput.concat(val);
				$("#display").text(controller.currentInput);
			//allows user to append any number to his input
			} else if(controller.currentInput!=="0"){
				controller.currentInput= controller.currentInput.concat(val);
				$("#display").text(controller.currentInput);
			}
							

			console.log("number click " + val);
			console.log(model.toEval);
		});
	},
	operatorClick: function(){
		$(".button").on("click", ".operator", function(){
			var val = $(this).val();

			console.log("operator click " + val);


			if (controller.currentInput.length>0 && !isNaN(controller.currentInput)){
				controller.sendToEval(controller.currentInput);
				// controller.evaluate();
				
			} 
				controller.currentInput = ""+ val;
				controller.decimal.setStatus(false);

			
		});
	},

	equalClick:function(){
		$("#equal").on("click", function(){
			controller.sendToEval(controller.currentInput);
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
			
			if(!controller.decimal.getStatus()){
				controller.currentInput= controller.currentInput.concat(".");
				$("#display").text(controller.currentInput);
				controller.decimal.setStatus(true);
			}
		});
	},

	allClearClick: function(){
		$("#allClear").on("click", function(){
			controller.clearEval();
			controller.clearCurrentInput();
			$("#display").text("");
		});
	}
};




buttons.init();