// $(".number").on("click", function(){
// 	console.log(this).text();
// });


model = {
	display : null,

	toEval: "",

};

// controller

controller = {
	takeAndSendToEval : function(value){
		model.toEval = model.toEval.concat(value);
		view.display="";
	},
};



view = {
	display : "",
	renderNumberInput: function(value){
		if (isNaN(value)){
			console.log("not a number");
			this.display=""+value;
			$("#display").text(this.display);
		
			// (this.display.length>9){
			// controller.takeAndSendtoEval(this.display);
		} else if (this.display.length === 1 && isNaN(this.display)){
			// this.display = this.display.concat(value);
			controller.takeAndSendToEval(this.display);
			this.display = this.display.concat(value);
			$("#display").text(this.display);

		} else{
		$("#display").text(this.display);
			this.display = this.display.concat(value);
			$("#display").text(this.display);
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
			console.log($(this).val());
			var val = $(this).val();
			if (view.display.length>0){
				controller.takeAndSendToEval(view.display);
				view.renderNumberInput(val);
			}
		});
	}
};




buttons.numberClick();
buttons.operatorClick();