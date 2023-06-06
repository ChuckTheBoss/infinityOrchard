// Quality of Life stuff are held in the game object. 
let game = {
    fps: 30,
    saveData: () => {
        return [
            { "currentBasketApples": basket.apples },
            { "currentCostSeeds": seed.cost },
            { "currentCountSeeds": seed.count },
            { "currentCostSaplings": sapling.cost },
            { "currentCountSaplings": sapling.count },
            { "currentCostTrees": tree.cost },
            { "currentCountTrees": tree.count },
            { "currentCostAcres": acre.cost },
            { "currentCountAcres": acre.count },
            { "currentCostOrchards": orchard.cost },
            { "currentCountOrchards": orchard.count },
            { "currentCostGrannys": granny.cost },
            { "currentCountGrannys": granny.count },
            { "currentCostFarmHands": farmHand.cost },
            { "currentCountFarmHands": farmHand.count },
            { "currentCostHarvesters": harvester.cost },
            { "currentCountHarvesters": harvester.count },
        ]
    },
    saveGame: () => {
        game.saveData().forEach(obj => {
            //console.log(obj, Object.keys(obj), Object.values(obj))
            if (!localStorage.getItem(Object.keys(obj))) {
                localStorage.setItem(Object.keys(obj), Object.values(obj));
            } else if (Object.values(obj) !== localStorage.getItem(Object.values(obj))) {
                localStorage.setItem(Object.keys(obj), Object.values(obj))
            }
        });
        dq(".gameSaved").classList.remove("hidden")
        setTimeout(() => dq(".gameSaved").classList.add("hidden"), 1000)
        game.autoSave();
        console.log(localStorage);
    },
    autoSave: () => {
        if (!game.autoSaveInterval) {
            setInterval(game.saveGame, 60000);
            game.autoSaveInterval = true;
        }
    },
    loadGame: () => {
        game.saveData().forEach(obj => {
            //console.log(obj, Object.keys(obj), Object.values(obj))
            if (!localStorage.getItem(Object.keys(obj))) {
                console.log("No save data found");
                return "No save data found";
            } else {
            }
            localStorage.getItem(Object.keys(obj), Object.values(obj))
            basket.apples = Number(localStorage.getItem("currentBasketApples"))
            seed.cost = Number(localStorage.getItem("currentCostSeeds"))
            seed.count = Number(localStorage.getItem("currentCountSeeds"))
            seed.buy()
            sapling.cost = Number(localStorage.getItem("currentCostSaplings"))
            sapling.count = Number(localStorage.getItem("currentCountSaplings"))
            sapling.buy()
            tree.cost = Number(localStorage.getItem("currentCostTrees"))
            tree.count = Number(localStorage.getItem("currentCountTrees"))
            tree.buy();
            acre.cost = Number(localStorage.getItem("currentCostAcres"))
            acre.count = Number(localStorage.getItem("currentCountAcres"))
            acre.buy();
            orchard.cost = Number(localStorage.getItem("currentCostOrchards"))
            orchard.count = Number(localStorage.getItem("currentCountOrchards"))
            orchard.buy();
            granny.cost = Number(localStorage.getItem("currentCostGrannys"))
            granny.count = Number(localStorage.getItem("currentCountGrannys"))
            granny.buy();
            farmHand.cost = Number(localStorage.getItem("currentCostFarmHands"))
            farmHand.count = Number(localStorage.getItem("currentCountFarmHands"))
            farmHand.buy();
            harvester.cost = Number(localStorage.getItem("currentCostHarvesters"))
            harvester.count = Number(localStorage.getItem("currentCountHarvesters"))
            harvester.buy();
            this.purchased = true;
            basket.clickTick();
            basket.ticker();
            startGrowing();
        });
        console.log(localStorage);
        game.autoSave();
    },
    autoSaveInterval: false
};


//I use document.querySelector a lot, so this just makes it so I don't have to type it every time. 
const dq = (element) => { return document.querySelector(element) };
const dqa = (element) => { return document.querySelector(element) };


//SAVE GAME
// things I need to save: 
//  total apples,
//  seeds, sapplings, trees, acres, orchards. Count and cost
//  grannys, farmhands, harvesters, count and cost. 
//  upgrades count and cost. 

dq(".save").addEventListener("click", game.saveGame);
dq(".load").addEventListener("click", game.loadGame);
dq('#mainApple').oncontextmenu = function (event) { // fixes long-pressing on the apple on mobile bringing up the image in a new window. 
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
};
// Basket contains the apple countand some associated functions
let basket = {
    apples: 0,
    // apples: 100000, // starting apples
    click: 1, // apples per mouse click
    clickTick() { //increases apple count by clicking
        basket.apples += basket.click;
        dq(".basket").innerText = Math.floor(basket.apples);
    },
    multiplier() {
        let perSecond = ((seed.multiply()) + (sapling.multiply()) + (tree.multiply()) + (acre.multiply()) + (orchard.multiply())) / game.fps;
        //console.log(perSecond);
        return perSecond
    },
    ticker() { // increases apple count per second
        if (!bank.limit()) {
            basket.apples += basket.multiplier();
            //console.log(basket.apples.toFixed(2));
        } else if (bank.limit()) {
            basket.apples += bank.capacity;
        };
        dq(".basket").innerText = Math.floor(basket.apples); //updates apples in the DOM
        let applesSec = Math.floor((basket.multiplier()) * game.fps * 10) / 10;
        let applesSecLimit = Math.floor(bank.capacity * game.fps);
        if (applesSec >= applesSecLimit) {
            dq(".applesPerSec").innerText = applesSecLimit;
        } else {
            dq(".applesPerSec").innerText = applesSec;
        }; //updates apples/sec in the DOM
    },
    mouseHold() {
        onmousedown = () => {
            basket.clickTick();
            hold = setInterval(basket.clickTick, (1 / game.fps) * 10000);
        };
    },
    mouseUnhold() {
        clearInterval(hold);
    },
    mouseUnholdLeave() {
        clearInterval(hold);
        onmousedown = () => {
            return false;
        };
    }
};

dq("#mainApple").addEventListener("mouseenter", basket.mouseHold); //makes the apple a button.
dq("#mainApple").addEventListener("mouseleave", basket.mouseUnholdLeave);
dq("body").addEventListener("mouseup", basket.mouseUnhold);
// Don't start counting until a grower is purchased. 
var intervalSet = false;
var purchased = false;
//Grow class makes making upgrades SUPER easy. 
class Grow {
    constructor(name, multiplier, cost) {
        this.name = name;
        this.multiplier = multiplier;
        this.cost = cost;
        this.purchased = false;
        this.count = 0;
        this.upgrade = 1;
        dq(`.${this.name}`).addEventListener("click", this.buy.bind(this));
        dq(`.${this.name}.count`).innerText = this.count;
    };
    multiply() {
        return (this.multiplier * this.count * this.upgrade);
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            purchased = true;
            this.purchased = true;
            this.count += 1;
            this.multiply();
        }
        dq(".basket").innerText = Math.floor(basket.apples);
        dq(`.${this.name}.cost`).innerText = Math.floor(this.cost);
        dq(`.${this.name}.count`).innerText = this.count;
        //console.log(basket.multiplier);
    };
};

// Creates all the upgrades. 
let seed = new Grow("seed", 0.1, 10);
let sapling = new Grow("sapling", 1, 100);
let tree = new Grow("tree", 10, 1000);
let acre = new Grow("acre", 100, 10000);
let orchard = new Grow("orchard", 1000, 100000);

// Doesn't start increasing automatically unless a grower is bought. 
function startGrowing() {
    document.querySelectorAll(".growerItem").forEach(upgrade => {
        upgrade.addEventListener("click", function () {
            if (purchased && !intervalSet) {
                setInterval(basket.ticker, (1 / game.fps) * 1000);
                intervalSet = true;
            }
        });
    })
};
startGrowing();


class Gather {
    constructor(name, multiplier, cost) {
        this.name = name;
        this.multiplier = multiplier;
        this.cost = cost;
        this.purchased = false;
        this.count = 0;
        dq(`.${this.name}`).addEventListener("click", this.buy.bind(this));
        dq(`.${this.name}.count`).innerText = this.count;
    };
    multiply() {
        return this.count * this.multiplier
        //bank.capacity += this.capacity / game.fps;
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            this.purchased = true;
            this.count += 1;
        }
        this.multiply();
        dq(".basket").innerText = Math.floor(basket.apples);
        dq(`.${this.name}.cost`).innerText = Math.floor(this.cost);
        dq(`.${this.name}.count`).innerText = this.count;
    };
};

let granny = new Gather("granny", 10, 1000);
let farmHand = new Gather("farmHand", 100, 10000);
let harvester = new Gather("harvester", 1000, 100000);

class Tool {
    constructor(name, multiplier, cost, tiedTo) {
        this.name = name;
        this.multiplier = multiplier;
        this.cost = cost;
        this.tiedTo = tiedTo;
        this.purchased = false;
        this.count = 0;
        dq(`.${this.name}`).addEventListener("click", this.buy.bind(this));
        dq(`.${this.name}.count`).innerText = this.count;
    };
    multiply() {
        const upgradeTarget = this.tiedTo;
        upgradeTarget.multiplier *= (this.multiplier);
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.purchased = true;
            this.count += 1;
            this.multiply();
            dq(".basket").innerText = Math.floor(basket.apples);
            dq(`.${this.name}.cost`).innerText = Math.floor(this.cost);
            dq(`.${this.name}.count`).innerText = this.count;
            dq(`.${this.name}`).classList.add("hidden")
            console.log(basket.multiplier);
        }
    };
};

let fertilizer = new Tool("fertilizer", 2, 500, seed)
let tiller = new Tool("tiller", 2, 5000, sapling)
let automaticSprinklers = new Tool("automaticSprinklers", 2, 50000, tree)
let glasses = new Tool("glasses", 2, 5000, granny)


let bank = {
    capacity: 10,
    limit() { //limits apples/sec
        this.capacity = (10 + (granny.multiply()) + (farmHand.multiply()) + (harvester.multiply())) / game.fps;
        if (basket.multiplier > bank.capacity) {
            return true;
        } else {
            return false;
        }
    },
};