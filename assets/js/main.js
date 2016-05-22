// $(".number").on("click", function(){
// 	console.log(this).text();
// });


model = {
	"0" : {
		value: 0,
	},
	"1" : {
		value: 1,
	},
	"2" : {
		value: 2,
	},
	"3" : {
		value: 3,
	},
	"4" : {
		value: 4,
	},
	"5" : {
		value: 5,
	},
	"6" : {
		value: 6,
	},
	"7" : {
		value: 7,
	},
	"8" : {
		value: 8,
	},
	"9" : {
		value: 9,
	},
};

var onScreen ="";
var onScreenVal;

$(".button").on("click", ".number", function(){
	console.log($(this).val());

	var val = $(this).val();
	console.log(model[""+val]);
	var modelValue = model[""+val].value;
	// onScreen = onScreen.concat(modelValue);
	renderNumberInput(modelValue);
});

function renderNumberInput(value){
	if (onScreen.length>9){
		
	} else {
		onScreen = onScreen.concat(value);
	}
	$("#display").text(onScreen);
	onScreenVal = Number(onScreen);
}