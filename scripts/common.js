tier = [
	//Существа таверны уровня 1
	{
		"minions" : 15,
		"count"	  : 20
	},
	//Существа таверны уровня 2
	{
		"minions" : 15,
		"count"	  : 18
	},
	//Существа таверны уровня 3
	{
		"minions" : 15,
		"count"	  : 15
	},
	//Существа таверны уровня 4
	{
		"minions" : 15,
		"count"	  : 12
	},
	//Существа таверны уровня 5
	{
		"minions" : 17,
		"count"	  : 9
	},
	//Существа таверны уровня 6
	{
		"minions" : 14,
		"count"	  : 6
	}	
]

state = {
	"gold" 			: 4,
	"level"			: 0,
	"tavernSlots"	: 3,
    "turn"          : 1,
    "updateCost"    : 5,
    "isFreez"       : false,
	"minions" 		: []
}

slots = {
	0 			: 3,
	1			: 4,
	2	        : 4,
	3           : 5,
    4           : 5,
    5           : 6
}

turns = {
	0 			: 3,
	1			: 4,
	2	        : 5,
	3           : 6,
    4           : 7,
    5           : 8,
    6           : 9,
    7           : 10
}

updateCost = {
    0 : 5,
    1 : 7,
    2 : 8,
    3 : 9,
    4 : 10,
    5 : 10,
    6 : 10
}

isDebug = true


//Существа в таверне
currentTavern = []

//Общий пул существ
globalSlots = []
globalSlotsCount = 0

minionsJsonData = []
tierKeys = []

class Minion {
	
	isGold = false;
	homeSlot = 0;
	
  constructor(level, id, name, homeSlot, cost, type, image) {
    this.level 		= level;
	this.id 		= id;
    this.cost 		= cost;
    this.name 		= name;
	this.homeSlot 	= homeSlot;
	this.image 		= image;
	this.type 		= type;
  }
}
