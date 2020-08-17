titleWidthDivider = 1
titleHeightDivider = 1
cardDivider = 1

function screenInit() {
	screenWidth  = window.screen.width
	screenHeight = window.screen.height
	
	title = document.getElementById("title")
	//titleCrop = document.getElementById("title_crop")
	
	if(screenWidth < 1000) {
		titleWidthDivider = 3
		titleHeightDivider = 4
		cardDivider  = 5
		
		//title.hidden = true
		//titleCrop.hidden = true
	}
	else {
		titleWidthDivider = 3
		titleHeightDivider = 5
		cardDivider  = 8
	}
	
	tavernView = document.getElementById("tavern")
	tavernView.setAttribute("height", screenHeight / 4)
	
	stateView = document.getElementById("state")
	stateView.setAttribute("height", screenHeight / 4)

	title.style.width = screenWidth / titleWidthDivider
	title.style.height = screenHeight / titleHeightDivider
	
	//titleCrop.style.width = screenWidth / titleDivider
	//titleCrop.style.height = screenHeight / titleDivider
	//title.setAttribute("height", screenHeight / 4)
}

function clearTavernView() {
	tavernView = document.getElementById("tavern")
	tavernView.innerHTML = ""
}

function clearStateView() {
	stateView = document.getElementById("state")
	stateView.innerHTML = ""
}

function refreshTavern() {
	
	clearTavernView()
	currentTavern = getRoll(state.level, state.tavernSlots)
	drawTavern(currentTavern)
}

function drawTavern(tavern) {
	tavernView = document.getElementById("tavern")
	
	tr = document.createElement("tr")
	
	tavern.forEach(function(item, index) {
		
		if(item != -1){
			td  = document.createElement("td")
			
			img = document.createElement("img")
			img.setAttribute("src", globalSlots[item].image)
			img.setAttribute("width", screenWidth / cardDivider)
			img.setAttribute("onClick", "buyMinion(" + globalSlots[item].homeSlot + "," + index + ")")
			
			td.append(img)
			
			tr.append(td)
		}
	});
	
	tavernView.append(tr)
}

function drawState() {
	clearStateView()
	
	tavernView = document.getElementById("state")
	
	tr = document.createElement("tr")
	
	state.minions.forEach(function(item, index) {
		
		if(item != -1){
			td  = document.createElement("td")
			
			img = document.createElement("img")
			img.setAttribute("src", item.image)
			img.setAttribute("width", screenWidth / cardDivider)
			
			img.setAttribute("onClick", "sellMinion(" + item.homeSlot + "," + index + ")")
			
			td.append(img)
			
			tr.append(td)
		}
	});
	
	tavernView.append(tr)
}