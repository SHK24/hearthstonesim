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
				
				minionObject = new Minion(tierNum, minion, minionNames[minion], position, minionsJSON[minionNames[minion]]['cost'], minionsJSON[minionNames[minion]]['type'], minionsJSON[minionNames[minion]]['src'])
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

    if(state.gold < 3) return;

    state.gold -= 3;

    changedGold(state.gold);

	state.minions.push(globalSlots[globalSlot])
	freeSlot(globalSlot)
	
	currentTavern[tavernSlot] = -1
	
	clearTavernView()
	drawTavern(currentTavern)
	drawState()
}

function sellMinion(homeSlot, stateSlot) {
	globalSlots[homeSlot] = state.minions[stateSlot]
    state.gold += state.minions[stateSlot].cost;	

    state.minions.splice(stateSlot, 1)
	drawState()

    changedGold(state.gold);
}

function levelUp() {
    if(state.level < 6) {
        
        if(state.gold >= state.updateCost) {
            state.level += 1
            drawLevel(state.level)

            state.gold -= state.updateCost

            state.updateCost = updateCost[state.level]
            drawUpdateCost(state.updateCost)

            changedGold()
        }
    }

    state.tavernSlots = slots[state.level]
}

function changedGold() {
    drawGold(state.gold)
}

function nextTurn() {

    state.turn += 1

    if(state.turn <= 7)
        state.gold = turns[state.turn]
    else
        state.gold = 10
    state.updateCost -= 1
    drawUpdateCost(state.updateCost)

    refreshTavern()

    state.isFreez = false
}

function setFreez() {
    state.isFreez = !state.isFreez
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
