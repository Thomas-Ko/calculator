/*====================
	MODEL
====================*/

model = {
	//this is where the numbers and operators that need to be evaluated will be stored;
	toEval: [],
};


/*====================
	CONTROLLER
====================*/

controller = {

	//this function is used to start the app;
	init: function(){
		controller.clearEval();
		controller.clearCurrentInput();
		buttons.init();
	},

	//this holds the current input of the user
	currentInput : "0",
	
	//this tells you if the user just pressed the equals button
	justEvaluated : false,

	//sends a number or operator to model.toEval;
	sendToEval : function(value){
		model.toEval.push(value);
		controller.clearCurrentInput();
	},

	//retrieves model.toEval data;
	getToEval : function(value){
		return model.toEval;
	},

	//clears the data in model.toEval;
	clearEval : function(){
		model.toEval=[];
	},

	clearCurrentInput : function(){
		console.log("controller.clearCurrentInput();");
		currentInput="0";
	},

	//evaluates everything inside toEval;
	evaluate: function(){
		var lastArrayItem = model.toEval[model.toEval.length-1];
		
		//if the last button pressed was an operator, it will be removed from the model.toEval array so it won't be evaluated
		if (["-","+","/","*"].indexOf(lastArrayItem)>-1){
			model.toEval.pop();
		}
		
		//convert model.toEval array into a string;
		var str = controller.getToEval().join("");
		//subtracting a negative number doesn't get evaluated in the eval function, so this just replaces two negations in a row to a plus operator
		str = str.replace("--","+");
		//use eval method to evaluate the string;
		var val = eval(str);
		
		//if value is greater than this number, return error message
		if (val>999999999){
			$("#display").text("E");
			controller.clearEval();
			controller.sendToEval("0");
			controller.currentInput="0";
		
		/*this is used to cut off a number that is less than the error number, but that may have a huge deciaml;
		for example; 54095.0000000000000004 would get cut down to not show a bunch of zeros and the 4 at the end */
		} else {
			val = val +"";
			if(val.length>9){
				val = val.slice(0,9);
			}

			$("#display").text(""+val);
			controller.clearEval();
			controller.sendToEval(val);
			controller.currentInput=""+val;
		}

		controller.justEvaluated = true;
	}
};


/*====================
	VIEW
====================*/

buttons = {

	//invoked inside the controller.init function
	init: function(){
		this.numberClick();
		this.operatorClick();
		this.equalClick();
		this.decimalClick();
		this.negateClick();
		this.allClearClick();
		this.clearClick();
	},

	//when a user presses a number;
	numberClick : function(){
		$(".button").on("click", ".number", function(){
			var val = $(this).val();

			//checks if previous button pressed was an operator and if it was sends operator to model
			if(["*","/","-","+"].indexOf(controller.currentInput)>-1){
				controller.sendToEval(controller.currentInput);
				controller.currentInput="0";
			}
			//this resets everything to be evaluated; this is used when a user starts a new number after evaluating something.
			if (controller.getToEval().length===1){
				controller.clearEval();
				controller.currentInput="0";
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
		});
	},

	//when a user presses the /, +, *, or - button
	operatorClick: function(){
		$(".button").on("click", ".operator", function(){
			var val = $(this).val();

			//if the currentInput was greater than zero and a number, then push that input into the model.toEval array
			if (controller.currentInput.length>0 && !isNaN(controller.currentInput) && controller.justEvaluated === false){
				controller.sendToEval(controller.currentInput);
			} 
			//this displays the pressed operator button
			controller.currentInput = ""+ val;
			$("#display").text(controller.currentInput);
			controller.justEvaluated = false;
		});
	},

	//when a user presses the = button
	equalClick:function(){
		$("#equal").on("click", function(){
			//send the previous number or operator into the model.toEval array
			if(controller.justEvaluated===false){
				controller.sendToEval(controller.currentInput);
			}
			//evaluate expression
			controller.evaluate();	
		});
	},

	//when a user presses the . button
	decimalClick: function(){
		$("#decimal").on("click", function(){
			
			//if the previous input was an operator, send it to model.toEval and make the current input 0;
			if(["*","/","-","+"].indexOf(controller.currentInput)>-1){
				controller.sendToEval(controller.currentInput);
				controller.currentInput="0";
			}
			
			//if there is no decimal in the number, allow the user to use the decimal button
			if(controller.currentInput.indexOf(".")===-1 && controller.justEvaluated===false){
				controller.currentInput= controller.currentInput.concat(".");
				$("#display").text(controller.currentInput);
			}
		});
	},

	//when the user presses the +/- button
	negateClick: function(){
		$("#negate").on("click", function(){
			
			//if current input is a number and not zero;
			if(!isNaN(controller.currentInput) && controller.currentInput!=="0" && controller.justEvaluated === false){
					
				//if the number is positive, change to negative
				if(controller.currentInput[0]!=="-"){
					controller.currentInput = "-" + controller.currentInput;
					$("#display").text(controller.currentInput);
					
				//if the number is negative, change to positive;	
				} else if (controller.currentInput[0]==="-"){
					//if the number is negative, change to positive
						console.log("that needs to be removed");
						controller.currentInput = controller.currentInput.slice(1);
						$("#display").text(controller.currentInput);
					}
			}
		});
	},

	//when the user presses the AC button
	allClearClick: function(){
		$("#allClear").on("click", function(){
			controller.clearEval();
			controller.currentInput ="0";
			$("#display").text("0");
			controller.justEvaluated = false;
		});
	},

	//when the user presses the C button
	clearClick: function(){
		$("#clear").on("click", function(){
			if(!isNaN(controller.currentInput) && controller.justEvaluated===false){
				controller.currentInput="0";
				$("#display").text("0");
			}
		});
	},

};  //end buttons object


/*====================
	INITIALIZE
====================*/

buttons.init();