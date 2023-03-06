
let bank = {
    apples: 0,
    click: 1,
    clickTick() {
        bank.apples += bank.click;
        document.querySelector(".appleBank").innerText = Math.floor(bank.apples);
    },
    multiplier: 0,
    interval: 0,
    ticker() {
        bank.apples += bank.multiplier;
        document.querySelector(".appleBank").innerText = Math.floor(bank.apples);
    }
};
document.querySelector(".appleBank").addEventListener("click", bank.clickTick);

let basket = {
    apples: 0,
    capacity: 10,
    interval: 1000,
    gather() {
        if (bank.apples >= basket.capacity) {
            basket.apples += basket.capacity;
            bank.apples -= basket.capacity;
        } else if (bank.apples <= basket.capacity) {
            basket.apples += bank.apples;
            bank.apples = 0;
        }
        document.querySelector(".basket").innerText = Math.floor(basket.apples);
        document.querySelector(".appleBank").innerText = Math.floor(bank.apples);
    },
};

document.querySelector(".basket").addEventListener("click", basket.gather);
setInterval(basket.gather, basket.interval);
class GrowUpgrade {
    constructor(name, multiplier, interval, cost) {
        this.name = name;
        this.multiplier = multiplier;
        this.interval = interval;
        this.cost = cost;
        this.purchased = false;
        document.querySelector(`.${this.name}`).addEventListener("click", this.buy.bind(this));
    };
    multiply() {
        bank.multiplier += this.multiplier;
        bank.interval += this.interval;
    };
    buy() {
        if (basket.apples >= this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            this.purchased = true;
            this.multiply();
            document.querySelector(".basket").innerText = Math.floor(basket.apples);
            document.querySelector(`.${this.name}.cost`).innerText = Math.floor(this.cost);
        }
    };
}

let seed = new GrowUpgrade("seed", 1, 1000, 10);
document.querySelector(".seed").addEventListener("click", function () {
    if (seed.purchased) {
        setInterval(bank.ticker, bank.interval);
    }
});
let sapling = new GrowUpgrade("sapling", 10, 1, 100)
