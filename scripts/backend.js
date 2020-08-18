function getFreeSlot(globalSlotsCount) {
	slot = Math.floor(Math.random() * globalSlotsCount)
	
	while(globalSlots[slot] != undefined)
		slot = Math.floor(Math.random() * globalSlotsCount)
	
	return slot
}

function getMinion(maxLevel, currentMinions) {

	if(isDebug) {
		console.log("---------------------");
		console.log("getMinion started...");
	}

	while(true) {	
		slot = Math.floor(Math.random() * globalSlotsCount)
		
		if(slot in currentMinions) {
			if(isDebug)
			console.log("Duplicate slot");
			continue
		}
		
		if(isDebug)
		console.log("Probing slot " + slot);
	
		if(globalSlots[slot].level <= maxLevel) {
			
			if(isDebug) {
				console.log("Success!")
				console.log("Level is " + globalSlots[slot].level)
				console.log("ID is " + globalSlots[slot].id)
				console.log("Name is " + globalSlots[slot].name)
				console.log("---------------------");
			}
			
			return slot;
		}
	}
}

function fillGlobalSlots() {
	
	globalSlotsCount = 0 
	
	for(i = 0; i < 6;i++)
		globalSlotsCount += tier[i].minions*tier[i].count
	
	console.log("All minions count is " + globalSlotsCount);
	
	for(tierNum = 0; tierNum < 6; tierNum++) {
		for(minion = 0; minion < tier[tierNum].minions; minion++) {
			for(count = 0; count < tier[tierNum].count; count++) {
				
				position = getFreeSlot(globalSlotsCount)
				
				minionsJSON = minionsJsonData[tierKeys[tierNum]]
				minionNames = Object.keys(minionsJSON)
				
				minionObject = new Minion(tierNum, minion, minionNames[minion], position,  "Untitled", minionsJSON[minionNames[minion]])
				globalSlots[position] = minionObject
			}
		}
	}
}

function freeSlot(slotNumber) {
	tempMinion = new Minion(10, 0, "", -1, "" , "");
	globalSlots[slotNumber] = tempMinion
}

function getRoll(maxLevel, tavernSlotsCount) {
	
	tavernSlots = []
	
	for(i = 0; i < tavernSlotsCount;i++)
		tavernSlots.push(getMinion(state.level, tavernSlots))
	
	return tavernSlots
}

function buyMinion(globalSlot, tavernSlot) {
	state.minions.push(globalSlots[globalSlot])
	freeSlot(globalSlot)
	
	currentTavern[tavernSlot] = -1
	
	clearTavernView()
	drawTavern(currentTavern)
	drawState()
}

function sellMinion(homeSlot, stateSlot) {
	globalSlots[homeSlot] = state.minions[stateSlot]
	state.minions.splice(stateSlot, 1)
	drawState()
}

function initJsonData() {

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://185.22.61.153/hsData.json');

	xhr.responseType = 'json';

	xhr.send();

	xhr.onload = function() {
	  minionsJsonData = xhr.response;
	  
	  tierKeys = Object.keys(minionsJsonData)
	  fillGlobalSlots()
	  refreshTavern()
	};	
}