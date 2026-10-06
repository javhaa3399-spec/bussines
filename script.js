const sizes = {
    "Маленький": [100, 200],
    "Средний": [150, 300],
    "Большой": [200, 400]
};

const extras = {
    "Сироп": 30,
    "Молоко": 20,
    "Лед": 10
};


const sizeInputs =
    document.querySelectorAll('input[name="size"]');

const syrup =
    document.getElementById("syrup");

const milk =
    document.getElementById("milk");

const ice =
    document.getElementById("ice");

const hint =
    document.getElementById("hint");

const summary =
    document.getElementById("summary");

const result =
    document.getElementById("result");

const drink =
    document.getElementById("drink");

const volume =
    document.getElementById("volume");

const coffee =
    document.getElementById("coffee");

const steam =
    document.getElementById("steam");


function getSize() {

    for (const input of sizeInputs) {

        if (input.checked) {
            return input.value;
        }
    }
}


function update() {

    const size = getSize();

    const price = sizes[size][0];
    const ml = sizes[size][1];

    const small =
        size === "Маленький";


    /* Small cup cannot have ice */

    if (small) {
        ice.checked = false;
    }

    ice.disabled = small;


    if (small) {

        hint.textContent =
            "Маленький стакан: лед недоступен.";

    } else {

        hint.textContent =
            "Можно выбрать несколько добавок.";
    }


    /* Selected extras */

    let selected = [];


    if (syrup.checked) {
        selected.push(
            "Сироп +" + extras["Сироп"] + " ₽"
        );
    }

    if (milk.checked) {
        selected.push(
            "Молоко +" + extras["Молоко"] + " ₽"
        );
    }

    if (ice.checked) {
        selected.push(
            "Лед +" + extras["Лед"] + " ₽"
        );
    }


    summary.textContent =
        "Кофе: " + price + " ₽\n" +
        "Добавки: " +
        (selected.length
            ? selected.join(", ")
            : "без добавок");


    result.textContent =
        "Нажмите «Рассчитать»";

    result.style.color = "#817469";
    result.style.fontSize = "12px";


    /* Drink name */

    if (ice.checked) {

        drink.textContent =
            "Iced Coffee";

    } else if (milk.checked) {

        drink.textContent =
            "Coffee with Milk";

    } else {

        drink.textContent =
            "Classic Coffee";
    }


    volume.textContent =
        size + " / " + ml + " мл";


    /* Coffee color */

    if (milk.checked) {

        coffee.style.background =
            "#B48255";

    } else {

        coffee.style.background =
            "#513323";
    }


    /* Steam */

    steam.style.display =
        ice.checked ? "none" : "block";
}


function calculate() {

    const size = getSize();

    let total =
        sizes[size][0];


    if (syrup.checked) {
        total += extras["Сироп"];
    }

    if (milk.checked) {
        total += extras["Молоко"];
    }

    if (ice.checked) {
        total += extras["Лед"];
    }


    result.textContent =
        "Итого: " + total + " ₽";

    result.style.color =
        "#244F42";

    result.style.fontSize =
        "23px";
}


function reset() {

    document.querySelector(
        'input[value="Средний"]'
    ).checked = true;

    syrup.checked = false;
    milk.checked = false;
    ice.checked = false;

    update();
}


/* Events */

sizeInputs.forEach(input => {

    input.addEventListener(
        "change",
        update
    );

});


syrup.addEventListener(
    "change",
    update
);

milk.addEventListener(
    "change",
    update
);

ice.addEventListener(
    "change",
    update
);


document.getElementById(
    "calculate"
).addEventListener(
    "click",
    calculate
);


document.getElementById(
    "reset"
).addEventListener(
    "click",
    reset
);


/* Start */

update();
