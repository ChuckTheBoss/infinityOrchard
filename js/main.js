

function Bank() {
    this.apples = 0;
    this.clickTick = () => {
        this.apples += multiplier;
        document.querySelector(".appleBank").innerText = this.apples;
    }
    let multiplier = 1;
}
let bank = new Bank();

document.querySelector(".appleBank").addEventListener("click", bank.clickTick);

let interval = 1000;

setInterval(bank.clickTick, interval);

function Basket() {
    this.apples = 0;
    this.gather = () => {
        this.apples += bank.apples;
        document.querySelector(".basket").innerText = this.apples;
        bank.apples = 0;
        document.querySelector(".appleBank").innerText = bank.apples;
    }
}

let basket = new Basket();
document.querySelector(".basket").addEventListener("click", basket.gather);