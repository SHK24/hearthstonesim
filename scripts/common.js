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
	"gold" 			: 0,
	"level"			: 6,
	"tavernSlots"	: 6,
	"minions" 		: []
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
	
  constructor(level, id, name, homeSlot, type, image) {
    this.level 		= level;
	this.id 		= id;
    this.name 		= name;
	this.homeSlot 	= homeSlot;
	this.image 		= image;
	this.type 		= type;
  }
}