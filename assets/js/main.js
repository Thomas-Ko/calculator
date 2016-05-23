// $(".number").on("click", function(){
// 	console.log(this).text();
// });


model = {
	currentInput : null,

	// toEval: "",
	toEval: [],

};

// controller

controller = {
	currentInput : "",
	sendToEval : function(value){
		model.toEval.push(value);
		controller.currentInput="";
	},
	getToEval : function(value){
		return model.toEval;
	},
	clearEval : function(){
		model.toEval=[];
	},
	evaluate: function(){
		var val = eval(controller.getToEval().join(""));
		$("#display").text(""+val);
		controller.clearEval();
		controller.currentInput="";
	}
};



view = {
	renderNumberInput: function(value){
		if (isNaN(value)){
			console.log("not a number");
			controller.currentInput=""+value;
			$("#display").text(controller.currentInput);
		
			// (controller.currentInput.length>9){
			// controller.takeAndSendtoEval(controller.currentInput);
		} else if (controller.currentInput.length === 1 && isNaN(controller.currentInput)){
			// controller.currentInput = controller.currentInput.concat(value);
			controller.sendToEval(controller.currentInput);
			controller.currentInput = controller.currentInput.concat(value);
			$("#display").text(controller.currentInput);

		} else{
		$("#display").text(controller.currentInput);
			controller.currentInput = controller.currentInput.concat(value);
			$("#display").text(controller.currentInput);
		}
	}
};

buttons = {
	numberClick : function(){
		$(".button").on("click", ".number", function(){
			// console.log("value:");
			// console.log($(this).val());
			var val = $(this).val();
			view.renderNumberInput(val);
		});
	},
	operatorClick: function(){
		$(".button").on("click", ".operator", function(){
			// console.log($(this).val());
			var val = $(this).val();

			if (controller.currentInput.length>0 && !isNaN(controller.currentInput)){
				controller.sendToEval(controller.currentInput);
				controller.currentInput = val;
			} else {
				controller.currentInput = val;
			}
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
	}
};




buttons.numberClick();
buttons.operatorClick();
buttons.equalClick();