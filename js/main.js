
let basket = {
    apples: 0,
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
intervalSet = false;

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
        document.querySelector(`.${this.name}`).addEventListener("click", this.buy.bind(this));
    };
    multiply() {
        basket.multiplier += (this.multiplier / 30);
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            this.purchased = true;
            this.multiply();
            document.querySelector(".basket").innerText = Math.floor(basket.apples);
            document.querySelector(`.${this.name}.cost`).innerText = Math.floor(this.cost);
            console.log(basket.multiplier);
        }
    };
};

let seed = new GrowUpgrade("seed", 0.1, 10);
document.querySelector(".seed").addEventListener("click", function () {
    if (seed.purchased && !intervalSet) {
        setInterval(basket.ticker, 33.33);
        intervalSet = true;
    }
});
let sapling = new GrowUpgrade("sapling", 1, 100);
