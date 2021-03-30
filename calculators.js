var numbers = document.getElementById("tecladoPrincipal").querySelectorAll("p");
var equalButton =  document.getElementById('equalButton');
var display = document.getElementById("numbersDisplay");
var resultCheck = false;

// putting value in display
function getDataToDisplay(number) {
	
	// display full condition (only works if has only number result)
	if(display.innerHTML.length === 15) {
		var calculators_1 = ["+","-","×","÷"];
		var displaystringhascalculation = false;
		var displayed = display.innerHTML;
		var newSring = "";
		for(var i = 0; i < displayed.length; i++) {
			if(calculators_1.indexOf(displayed[i]) != -1) {
				displaystringhascalculation = true;
			}
		};

		if(calculators_1.indexOf(number) != -1 && !displaystringhascalculation) {
			displayed = displayed.replace(/,/g,'');	
			if(displayed.includes(".")) {
				var pointLoc = displayed.indexOf(".");
				newSring = displayed.slice(0, (pointLoc + 5)) + number;
				display.innerHTML = newSring;
				return;
			}
		}		
	};

	// normal display operation
	if (display.innerHTML.length < 15) {
		// var num = document.createTextNode(number);
		var displayed = display.innerText;
		var calculators = ["+","-","×","÷"];
		var displayLastChar = displayed.charAt(displayed.length - 1);		

		if(displayed ==="" && calculators.indexOf(number) != -1 && number != "-") {
			displayed = "0";
		};
		
		if(calculators.indexOf(number) != -1 && calculators.indexOf(displayLastChar) != -1) {	
			displayed = displayed.slice(0, -1);
			displayed += number;				
		} else {
			displayed = displayed + number;
		};
			
		var displayed = displayed.replace(/,/g,'');	
		var displayedArray = displayed.split(/(\+)|(\-)|(\×)|(\÷)/g);
		var filteredArray = displayedArray.filter((x) => {return x !== undefined;});

		// not double points for last number
		var testForPoints = filteredArray[filteredArray.length-1].replace(/[^.]/g, "").length;		
		if(testForPoints > 1) {
			return;
		};
		
		if(number != "." && number != 0) {
			for(var i = 0; i < filteredArray.length; i++) {
			if(!isNaN(parseFloat(filteredArray[i]))) {
				var numberr = filteredArray[i]
				// numberr = numberr.replace(/,/g,'')
				numberr = parseFloat(numberr)
				numberr = numberr.toLocaleString('en', {maximumFractionDigits: 20});
				filteredArray[i] = numberr
				}
			}
		} else if(number == 0) {
			for(var i = 0; i < filteredArray.length; i++) {
				if(!isNaN(parseFloat(filteredArray[i])) && parseFloat(filteredArray[i]) > 1) {
					var numberr = filteredArray[i]
					numberr = parseFloat(numberr)
					numberr = numberr.toLocaleString('en', {maximumFractionDigits: 20});
					filteredArray[i] = numberr;
				}
			}
		}	
		
		filteredArray = filteredArray.join("");
  		display.innerHTML = filteredArray;	
	};
};

function handleKeyboard(event) {
	var button_value = event.key;

	if(button_value === "h" || button_value === "H") {
		$('#button').click();
	}

	var tempArray = ["1","2","3","4","5","6","7","8","9","+","-","*","/",".","0", "Enter", "C", "c", "Backspace"];
	if(tempArray.indexOf(button_value) != -1) {
		if(!resultCheck) {
			var buttonCheck = false;
			var numberCheck = false;
			if (button_value === "+" || button_value ==="-" || button_value === "×" ||button_value === "÷") {
				buttonCheck = true;
			} else {
				numberCheck = true;
			};
			
			switch(button_value) {
				case "*":
					var button_value2 = "×";
					buttonCheck = true;
					if((resultCheck === true && buttonCheck ===true)) {						
						resultCheck = false;
					} else if (resultCheck === true && numberCheck === true) {
						display.innerHTML = "";
						resultCheck = false;
					}		
					
					getDataToDisplay(button_value2);
        			break;

				case "/":
					var button_value2 = "÷";
					buttonCheck = true;
					if((resultCheck === true && buttonCheck ===true)) {						
						resultCheck = false;
					} else if (resultCheck === true && numberCheck === true) {
						display.innerHTML = "";
						resultCheck = false;
					}		
					getDataToDisplay(button_value2);
        			break;

				case "c":
					display.innerHTML ="0";
					break;

				case "C":
					display.innerHTML ="0";
					break;

				case "Backspace":
					var displayed = display.innerHTML;
					displayed = displayed.replace(/,/g,'');
					displayed = displayed.slice(0, (displayed.length - 1));
					var displayedArray = displayed.split(/(\+)|(\-)|(\×)|(\÷)/g);
					var filteredArray = displayedArray.filter((x) => {return x !== undefined;});
					// displayed = displayed.toLocaleString('en');

					for(var i = 0; i < filteredArray.length; i++) {
						if(!isNaN(parseFloat(filteredArray[i]))) {
							var numberr = filteredArray[i]
							// numberr = numberr.replace(/,/g,'')
							numberr = parseFloat(numberr)
							numberr = numberr.toLocaleString('en', {maximumFractionDigits: 14});
							filteredArray[i] = numberr
						}
					}

					filteredArray = filteredArray.join("");
					if(filteredArray === "") {
						filteredArray = "0";
					}
					display.innerHTML = filteredArray;
					break;
					
				case "Enter":
					equalButton.click();
					break;

				default:        
					if((resultCheck === true && buttonCheck ===true)) {						
						resultCheck = false;
					} else if (resultCheck === true && numberCheck === true) {
						display.innerHTML = "";
						resultCheck = false;
					}
					
					var forCOrEnter = ["c", "C", "Enter", "Backspace"];
					if(forCOrEnter.indexOf(button_value) === -1) {
						if(display.innerHTML === "0" && button_value != ".") {
							display.innerHTML = "";
						}
						getDataToDisplay(button_value);
					}        			
        			break;
			};					


		} else {			
			resultCheck = false;
			if(button_value === "+" || button_value ==="-" || button_value === "*" ||button_value === "/") {
				switch(button_value) {
					case "*":
						var button_value2 = "×";
						buttonCheck = true;
						if((resultCheck === true && buttonCheck ===true)) {						
							resultCheck = false;
						} else if (resultCheck === true && numberCheck === true) {
							display.innerHTML = "";
							resultCheck = false;
						}		
						
						getDataToDisplay(button_value2);
						break;
						case "/":
							var button_value2 = "÷";
						buttonCheck = true;
						if((resultCheck === true && buttonCheck ===true)) {						
							resultCheck = false;
						} else if (resultCheck === true && numberCheck === true) {
							display.innerHTML = "";
							resultCheck = false;
						}		
						getDataToDisplay(button_value2);
						break;
					default:
						getDataToDisplay(button_value);
				}
			} else {
				var forCOrEnter = ["c", "C", "Enter", "Backspace"];
				if(forCOrEnter.indexOf(button_value) === -1) {
					display.innerHTML = button_value;
				}				
			};
		};
	};
};

// getting each button value as text
for (var i = 0; i < numbers.length; i++) {
	if (resultCheck === false) {
		numbers[i].addEventListener("click", function() {
			var button_value = this.textContent;
			var buttonCheck = false;
			var numberCheck = false;


			if (button_value === "+" || button_value ==="-" || button_value === "×" ||button_value === "÷") {
				buttonCheck = true;
			} else {
				numberCheck = true;
			};

			switch(button_value) {
				case "C":
					display.innerHTML ="0";
					break;				

				default:        
					if((resultCheck === true && buttonCheck ===true)) {						
						resultCheck = false;
					} else if (resultCheck === true && numberCheck === true) {
						display.innerHTML = "";
						resultCheck = false;
					}					

					if(display.innerHTML === "0" && button_value != ".") {
						display.innerHTML = "";
					}

        			getDataToDisplay(button_value);
        			break;
			};			
		});
	} else {
		display.innerHTML = "";
		resultCheck = false;
	};
};
	
var valuesForHistoryPage = [];
// getting equalButton sign
equalButton.onclick = () => {
	// getting display text
    var mathOpText = display.textContent;
	var historyCalculus = mathOpText;
	var had_calculus = false;

	// if the first number is negative
	if (mathOpText[0] === "-") {
		mathOpText = "0"+ mathOpText;
	};
	
	mathOpText = mathOpText.replace(/,/g,'');
	// separating numbers from operators
	var onlyNumbers = mathOpText.split(/(\+)|(\-)|(\×)|(\÷)/g);
	
	var filteredOnlyNumbers = onlyNumbers.filter((x) => {
		return x !== undefined;
	});
	
	var result = display.innerHTML;
	while (filteredOnlyNumbers.indexOf("×") > -1) {
		had_calculus = true;
		var operPosition = filteredOnlyNumbers.indexOf("×");
		var firstNumber = operPosition - 1, secondNumber = operPosition + 1;
		result = parseFloat(filteredOnlyNumbers[firstNumber]) * parseFloat(filteredOnlyNumbers[secondNumber]);
		filteredOnlyNumbers[secondNumber] = result;
		filteredOnlyNumbers.splice(firstNumber, 2);
	};

	while (filteredOnlyNumbers.indexOf("÷") > -1) {
		had_calculus = true;
		var operPosition = filteredOnlyNumbers.indexOf("÷");
		var firstNumber = operPosition - 1, secondNumber = operPosition + 1;
		result = parseFloat(filteredOnlyNumbers[firstNumber]) / parseFloat(filteredOnlyNumbers[secondNumber]);
		filteredOnlyNumbers[secondNumber] = result;
		filteredOnlyNumbers.splice(firstNumber, 2);
	};

    while ((filteredOnlyNumbers.indexOf("+") > -1) || (filteredOnlyNumbers.indexOf("-") > -1)) {
		had_calculus = true;

		var op = [];
		filteredOnlyNumbers.forEach((item, i) => {
			if (item === "+" || item === "-") {
				op.push({
					op: item,
					opIndex:i
				});
			};
		});		
		var operPosition = op[0].opIndex;
		var firstNumber = operPosition - 1, secondNumber = operPosition + 1;

		if (op[0].op == "+") {
			result = parseFloat(filteredOnlyNumbers[firstNumber]) + parseFloat(filteredOnlyNumbers[secondNumber]);
			filteredOnlyNumbers[secondNumber] = result;
			filteredOnlyNumbers.splice(firstNumber, 2);	
		} else {
			result = parseFloat(filteredOnlyNumbers[firstNumber]) - parseFloat(filteredOnlyNumbers[secondNumber]);
			filteredOnlyNumbers[secondNumber] = result;
			filteredOnlyNumbers.splice(firstNumber, 2);	
		};
	};

	// handling result errors with floating points due to javascript limitations
	var resultSignal = false;
	if(result < 0) {
		result = result*(-1);
		resultSignal = true;
	};

	var trunc = Math.trunc(result);
	if(trunc > 1) {
		var rest = result - trunc;	
		if(rest < 0.0000000001) {
			result = trunc;
		}	
	} else if(trunc === 0 && result != 0) {
		var result2 = result;
		var counter = 0;
		
		while(result2 <= 1) {
			result2 = result2*10;			
			counter++;
		};

		var trunc2 = Math.trunc(result2);
		var rest2 = result2 - trunc2
		if(rest2 < 0.0000000001) {
			result2 = trunc2;
		}

		result = result2/Math.pow(10, counter);		
	};	

	if(resultSignal) {
		result = result*(-1);
	};

	var resultChecker = isNaN(result);
	var lettercount = Math.trunc(result).toLocaleString('en').length;
	var afterpoints = 14 - lettercount;
	result = result.toLocaleString('en', {maximumFractionDigits: afterpoints});
	var historyResult = result;

	var toHistory = makeArray(historyCalculus, historyResult);
	if(!resultChecker && had_calculus) {
		valuesForHistoryPage.push(toHistory);
	}
	updateHistory();

	display.innerHTML = result;
	resultCheck = true;
};

window.addEventListener('keydown', handleKeyboard);
display.innerHTML = 0;


function makeArray(historyValue, resultValue) {
	return {
		history_calculus:historyValue,
		history_result:resultValue
	};
};

function updateHistory() {
	var history_page = document.getElementById('history-track');
	history_page.innerHTML = "";

	if(valuesForHistoryPage.length > 5) {
		valuesForHistoryPage.shift();
	};

	valuesForHistoryPage.forEach((value) => {
		var historyDiv = document.createElement('div');
		historyDiv.setAttribute('class', 'historyDiv');
		var historyP = document.createElement('p');
		var historyH3 = document.createElement('h3');

		var history_calculus_only_numbers = value.history_calculus.split(/(\+)|(\-)|(\×)|(\÷)/g);
		var filtered_only_numbers = history_calculus_only_numbers.filter((x) => {
			return x !== undefined;
		});

		var new_array = [];		
		filtered_only_numbers.forEach((numberfromarray) => {

			if(!new_array) {
				new_array = numberfromarray;
			}
			new_array += numberfromarray;
			new_array += " ";
		})

		historyP.innerHTML = new_array + "=";
		historyH3.innerHTML = value.history_result;

		historyDiv.appendChild(historyP);
		historyDiv.appendChild(historyH3);		
		history_page.appendChild(historyDiv);
	});
};