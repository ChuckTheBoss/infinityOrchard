
let basket = {
    //apples: 0,
    apples: 100000,
    click: 1,
    clickTick() {
        basket.apples += basket.click;
        document.querySelector(".basket").innerText = Math.floor(basket.apples);
    },
    multiplier: 0,
    ticker() {
        basket.apples += basket.multiplier;
        //console.log(basket.apples.toFixed(2));
        document.querySelector(".basket").innerText = Math.floor(basket.apples);
    }
};
document.querySelector(".basket").addEventListener("click", basket.clickTick);
var intervalSet = false;
var purchased = false;

// let basket = {
//     apples: 0,
//     capacity: 10,
//     interval: 1000,
//     gather() {
//         if (bank.apples >= basket.capacity) {
//             basket.apples += basket.capacity;
//             bank.apples -= basket.capacity;
//         } else if (bank.apples <= basket.capacity) {
//             basket.apples += bank.apples;
//             bank.apples = 0;
//         }
//         document.querySelector(".basket").innerText = Math.floor(basket.apples);
//         document.querySelector(".appleBank").innerText = Math.floor(bank.apples);
//     },
// };

// document.querySelector(".basket").addEventListener("click", basket.gather);
// setInterval(basket.gather, basket.interval);
class GrowUpgrade {
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
        basket.multiplier += (this.multiplier / 30);
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

let seed = new GrowUpgrade("seed", 0.1, 10);
let sapling = new GrowUpgrade("sapling", 1, 100);
let tree = new GrowUpgrade("tree", 10, 1000);
let acre = new GrowUpgrade("acre", 100, 10000);
let orchard = new GrowUpgrade("orchard", 1000, 100000);

document.querySelectorAll(".button").forEach(upgrade => {
    upgrade.addEventListener("click", function () {
        if (purchased && !intervalSet) {
            setInterval(basket.ticker, 33.33);
            intervalSet = true;
        }
    });
});


