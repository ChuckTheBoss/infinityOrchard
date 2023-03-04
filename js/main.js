
let bank = {
    apples: 0,
    click: 1,
    clickTick() {
        document.querySelector(".appleBank").addEventListener("click", bank.clickTick);
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
bank.clickTick();

let basket = {
    apples: 0,
    gather() {
        basket.apples += bank.apples;
        document.querySelector(".basket").innerText = Math.floor(basket.apples);
        bank.apples = 0;
        document.querySelector(".appleBank").innerText = Math.floor(bank.apples);
    },
};

document.querySelector(".basket").addEventListener("click", basket.gather);

class PassiveUpgrade {
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
        if (basket.apples > this.cost) {
            basket.apples -= this.cost;
            this.cost *= 1.1;
            this.purchased = true;
            this.multiply();
            document.querySelector(".basket").innerText = Math.floor(basket.apples);
        }
    };

}

let granny = new PassiveUpgrade("granny", 1, 1000, 10);
document.querySelector(".granny").addEventListener("click", function () {
    if (granny.purchased) {
        setInterval(bank.ticker, bank.interval);
    }
});
let tractor = new PassiveUpgrade("tractor", 10, 1, 100)
