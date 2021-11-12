const box = document.querySelector("#Box");
const countDrivers = document.querySelector("#Count");

const load = async () => {
	try{
		let download = await fetch("/api/load");
		let json = await download.json();
		return json;
	} catch(e) {
		console.log(e);
	}
}

const upload = async (name, value, count) => {
	let eventObject = {
		name,
		value,
		count
	}

	try {
		const optionsPost = {
			method: "POST",
			body: JSON.stringify(eventObject),
			headers: {
	        'Content-Type': 'application/json'
	    }}

    	let send = await fetch("/api/upload", optionsPost);
    	let frame = await fetch("/api/read");
    	let frameJson = await frame.json();
    	countDrivers.textContent = frameJson.number;

	} catch(e) {
		console.log(e);
	}
	
}

const eventClick = (e) => {
	let elementValue = e.target.getAttribute("value");
	let elementClass = e.target.getAttribute("class")
	let elementText = e.target.textContent;

	if(elementValue == 1){
		upload(elementText, "0", true)
		.then(res => {
			e.target.setAttribute("class", "Lines_Off");
			e.target.setAttribute("value", "0");
		})
		.then(res => {
			if(countDrivers.textContent == 1){
				const redElements = document.querySelectorAll(".Lines_Over");
				const redLength = redElements.length;
				for(var i = 0; i < redLength; i++){
					redElements[i].setAttribute("class", "Lines_On");
				}
			}
		})
		.catch(e => console.log(e));
		
	}else if(elementValue == 0 && countDrivers.textContent != 0){
		upload(elementText, "1", false)
		.then(res => {
			e.target.setAttribute("class", "Lines_On");
			e.target.setAttribute("value", "1");
		})
		.then(res => {
			if(countDrivers.textContent == 0){
				const redElements = document.querySelectorAll(".Lines_On");
				const redLength = redElements.length;
				for(var i = 0; i < redLength; i++){
					redElements[i].setAttribute("class", "Lines_Over");
				}
			}
		})
		.catch(e => console.log(e));
	}

	
}


const printScreen = async() => {
	const data = await load();
	let delivery = data.load_Delivery[0].number;
	let dataDelivery = data.load_Data;

	countDrivers.textContent = delivery;

	dataDelivery.forEach(item => {
		let element = document.createElement("div");
		element.textContent = item.name;
		let possibleValue = item.value == 0 ? element.setAttribute("class", "Lines_Off") : element.setAttribute("class", "Lines_On");
		let endValue = item.value == 1 && delivery == 0 ? element.setAttribute("class", "Lines_Over"): "";
		element.setAttribute("value", item.value);
		box.appendChild(element);
		element.addEventListener("click", eventClick);
	});
}

printScreen();