let res = document.createElement("div");
res.id = "res";
res.innerHTML = "";
res.value = "";

function binaryParser() {
	const regexNums = /[01]+/g;
	const regexOperators = /[^01]/g;
	const regextValidate = /^[\/\*]|[^01]{2,}|[^01]$/;

	if (res.value.match(regextValidate)) {
		return 0;
	}

	var nums = res.value.match(regexNums);
	var operators = res.value.match(regexOperators);

	while (nums.length > 1 && operators.length > 0) {
		operations();
		nums = res.value.match(regexNums);
		operators = res.value.match(regexOperators);
	}
	updateRes(res.value);
}

function operations() {
	s = res.value;
	const regexSum = /[01]+\+[01]+/;
	const regexSub = /[01]+\-[01]+/;
	const regexMul = /[01]+\*[01]+/;
	const regexDiv = /[01]+\/[01]+/;
	const regexInitialOperation = /^[-+][01]+[\/\*\+\-][01]+$/;

	if (s.match(regexInitialOperation)) {
		const regexNums = /[01]+/g;
		const regexOperators = /[^01]/g;
		const nums = res.value.match(regexNums);
		const operators = res.value.match(regexOperators);
		res.value = operation(operators[0] + nums[0], operators[1], nums[1]);
	} else if (s.match(regexMul)) {
		const matched = s.match(regexMul);
		const nums = matched[0].split("*");
		res.value = res.value.replace(regexMul, operation(nums[0], "*", nums[1]));
	} else if (s.match(regexDiv)) {
		const matched = s.match(regexDiv);
		const nums = matched[0].split("/");
		res.value = res.value.replace(regexDiv, operation(nums[0], "/", nums[1]));
	} else if (s.match(regexSum)) {
		const matched = s.match(regexSum);
		const nums = matched[0].split("+");
		res.value = res.value.replace(regexSum, operation(nums[0], "+", nums[1]));
	} else if (s.match(regexSub)) {
		const matched = s.match(regexSub);
		const nums = matched[0].split("-");
		res.value = res.value.replace(regexSub, operation(nums[0], "-", nums[1]));
	}
}

function updateRes(value) {
	res.value = value;
	res.innerHTML = res.value;
}

function replaceRegex(string, regex, replacementString) {
	updateRes(string.replace(regex, replacementString));
}
function operation(num1, op, num2) {
	/* The double bitwise NOT ('~~') is a shortcut for Math.floor() */
	return (~~eval(parseInt(num1, 2) + op + parseInt(num2, 2))).toString(2);
}

let btns = document.createElement("div");
btns.id = "btns";

let btn0 = document.createElement("button");
btn0.id = "btn0";
btn0.innerHTML = "0";
btn0.onclick = () => {
	updateRes(res.value + "0");
};

let btn1 = document.createElement("button");
btn1.id = "btn1";
btn1.innerHTML = "1";
btn1.onclick = () => {
	updateRes(res.value + "1");
};

let btnClr = document.createElement("button");
btnClr.id = "btnClr";
btnClr.innerHTML = "C";
btnClr.onclick = () => {
	updateRes("");
};

let btnEql = document.createElement("button");
btnEql.id = "btnEql";
btnEql.innerHTML = "=";
btnEql.onclick = () => binaryParser();

let btnSum = document.createElement("button");
btnSum.id = "btnSum";
btnSum.innerHTML = "+";
btnSum.onclick = () => {
	updateRes(res.value + "+");
};

let btnSub = document.createElement("button");
btnSub.id = "btnSub";
btnSub.innerHTML = "-";
btnSub.onclick = () => {
	updateRes(res.value + "-");
};

let btnMul = document.createElement("button");
btnMul.id = "btnMul";
btnMul.innerHTML = "*";
btnMul.onclick = () => {
	updateRes(res.value + "*");
};

let btnDiv = document.createElement("button");
btnDiv.id = "btnDiv";
btnDiv.innerHTML = "/";
btnDiv.onclick = () => {
	updateRes(res.value + "/");
};

btns.appendChild(res);
btns.appendChild(btn0);
btns.appendChild(btn1);
btns.appendChild(btnClr);
btns.appendChild(btnEql);
btns.appendChild(btnSum);
btns.appendChild(btnSub);
btns.appendChild(btnMul);
btns.appendChild(btnDiv);

document.body.appendChild(btns);
