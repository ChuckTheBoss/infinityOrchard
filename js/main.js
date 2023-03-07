// Quality of Life stuff are held in the game object. 
let game = {
    fps: 30,
};

// Basket contains the apple countand some associated functions
let basket = {
    //apples: 0,
    apples: 100000, // starting apples
    click: 1, // apples per mouse click
    clickTick() { //increases apple count by clicking
        basket.apples += basket.click;
        document.querySelector(".basket").innerText = Math.floor(basket.apples);
    },
    multiplier: 0, // basically apples per second
    ticker() { // increases apple count per second
        if (!bank.limit()) {
            basket.apples += basket.multiplier;
            //console.log(basket.apples.toFixed(2));
        } else if (bank.limit()) {
            basket.apples += bank.capacity;
        };
        document.querySelector(".basket").innerText = Math.floor(basket.apples); //updates apples in the DOM
        let applesSec = Math.floor((basket.multiplier) * game.fps * 10) / 10;
        let applesSecLimit = Math.floor(bank.capacity * game.fps);
        if (applesSec >= applesSecLimit) {
            document.querySelector(".applesPerSec").innerText = applesSecLimit;
        } else {
            document.querySelector(".applesPerSec").innerText = applesSec;
        }; //updates apples/sec in the DOM
    }
};

document.querySelector(".basket").addEventListener("click", basket.clickTick); //makes the number a button.
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
        document.querySelector(`.${this.name}`).addEventListener("click", this.buy.bind(this));
        document.querySelector(`.${this.name}.count`).innerText = this.count;
    };
    multiply() {
        basket.multiplier += (this.multiplier / game.fps);
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            purchased = true;
            this.count += 1;
            this.multiply();
            document.querySelector(".basket").innerText = Math.floor(basket.apples);
            document.querySelector(`.${this.name}.cost`).innerText = Math.floor(this.cost);
            document.querySelector(`.${this.name}.count`).innerText = this.count;
            console.log(basket.multiplier);
        }
    };
};

// Creates all the upgrades. 
let seed = new Grow("seed", 0.1, 10);
let sapling = new Grow("sapling", 1, 100);
let tree = new Grow("tree", 10, 1000);
let acre = new Grow("acre", 100, 10000);
let orchard = new Grow("orchard", 1000, 100000);

// Doesn't start increasing automatically unless a grower is bought. 
document.querySelectorAll(".button").forEach(upgrade => {
    upgrade.addEventListener("click", function () {
        if (purchased && !intervalSet) {
            setInterval(basket.ticker, (1 / game.fps) * 1000);
            intervalSet = true;
        }
    });
});

let bank = {
    capacity: 10 / game.fps,
    limit() { //limits apples/sec
        if (basket.multiplier > bank.capacity) {
            return true;
        } else {
            return false;
        }
    },
};
class Gather {
    constructor(name, capacity, cost) {
        this.name = name;
        this.capacity = capacity;
        this.cost = cost;
        this.purchased = false;
        this.count = 0;
        document.querySelector(`.${this.name}`).addEventListener("click", this.buy.bind(this));
        document.querySelector(`.${this.name}.count`).innerText = this.count;
    };
    multiply() {
        bank.capacity += this.capacity / game.fps;
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            this.purchased = true;
            this.count += 1;
            this.multiply();
            document.querySelector(".basket").innerText = Math.floor(basket.apples);
            document.querySelector(`.${this.name}.cost`).innerText = Math.floor(this.cost);
            document.querySelector(`.${this.name}.count`).innerText = this.count;
        }
    };
};

let granny = new Gather("granny", 10, 100)
let farmHand = new Gather("farmHand", 100, 1000);
let picker = new Gather("picker", 1000, 10000)