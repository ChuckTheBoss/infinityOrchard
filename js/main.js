

let bank = {
    apples: 0,
    name: "margaret",
    clickTick() {
        bank.apples += bank.multiplier;
        document.querySelector(".appleBank").innerText = bank.apples;
        return bank.apples;
    },
    multiplier: 1,
};

document.querySelector(".appleBank").addEventListener("click", bank.clickTick);
console.log(bank.apples, bank.multiplier, bank.clickTick())

let interval = 1000;

setInterval(bank.clickTick, interval);

let basket = {
    apples: 0,
    gather() {
        basket.apples += bank.apples;
        document.querySelector(".basket").innerText = basket.apples;
        bank.apples = 0;
        document.querySelector(".appleBank").innerText = bank.apples;
    },
};

document.querySelector(".basket").addEventListener("click", basket.gather);