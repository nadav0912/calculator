const screen = document.querySelector(".display-screen");
const text = screen.children[0];

const ac = document.querySelector("#ac");
const del = document.querySelector("#del");
const equal = document.querySelector("#equal");

const signsElements = Array.from(document.querySelectorAll(".sign"));
const numbersElements = Array.from(document.querySelectorAll(".num"));

// Calculator Object
const calculator = {
  items: [],

  lastItem() {
    if (this.items.length === 0) return;

    return this.items[this.items.length - 1];
  },

  itemType(item) {
    if (item === "/" || item === "+" || item === "-" || item === "*")
      return "sign";

    return "num";
  },

  changeLastItem(newItem) {
    this.items[this.items.length - 1] = newItem;
  },

  addNewItem(newItem) {
    this.items.push(newItem);
  },

  addNum(newNum) {
    // *newNum is type string
    if (this.lastItem() === "/" && newNum === "0")
      return alert("Can`t divide by zero");

    if (
      newNum === "." &&
      (this.itemType(this.lastItem()) === "sign" ||
        this.lastItem().slice(-1) === "." ||
        this.items.length === 0)
    )
      return alert("Must have number befor dot!");

    if (newNum === "." && this.lastItem().includes("."))
      return alert("Can`t have more then one dot in a number!");

    if (this.lastItem() && this.lastItem().length === 33)
      return alert("Number length can not be more than 33!");

    if (this.itemType(this.lastItem()) === "sign" || this.items.length === 0)
      this.addNewItem(newNum);
    else this.changeLastItem(this.lastItem() + newNum);
  },

  addSign(newSign) {
    if (this.items.length === 0) alert("can`t begin with a aign!");
    else if (this.itemType(this.lastItem()) === "sign")
      alert("can`t have sign after aign!");
    else this.addNewItem(newSign);
  },

  deleteLast() {
    if (this.items.length === 0) return;

    if (this.lastItem().length > 1)
      this.changeLastItem(this.lastItem().slice(0, -1));
    else this.items.pop();
  },

  deleteAll() {
    this.items = [];
  },

  calculateResult() {
    if (this.items.length < 3) {
      return alert("complete the math exercis");
    }

    let sign, num;

    for (let i = 1; i < this.items.length; i += 2) {
      sign = this.items[i];
      console.log(sign);

      if (sign === "/")
        this.items.splice(
          i - 1,
          3,
          (Number(this.items[i - 1]) / Number(this.items[i + 1])).toString()
        );
      else if (sign === "*")
        this.items.splice(
          i - 1,
          3,
          (Number(this.items[i - 1]) * Number(this.items[i + 1])).toString()
        );
    }

    let result = Number(this.items[0]);

    for (let i = 2; i < this.items.length; i += 2) {
      num = Number(this.items[i]);
      sign = this.items[i - 1];

      if (sign === "+") result += num;
      else if (sign === "-") result -= num;
    }

    this.items = [result.toString()];
  },
};

// Update text inside Screen by calculator.items
function updateScreen() {
  text.textContent = calculator.items.join(" ");
}

// Creats Event Listenerss
equal.addEventListener("click", () => {
  calculator.calculateResult();
  updateScreen();
});

ac.addEventListener("click", () => {
  calculator.deleteAll();
  updateScreen();
});

del.addEventListener("click", () => {
  calculator.deleteLast();
  updateScreen();
});

signsElements.forEach((signElement) => {
  signElement.addEventListener("click", () => {
    calculator.addSign(signElement.textContent);
    updateScreen();
  });
});

numbersElements.forEach((numberElement) => {
  numberElement.addEventListener("click", () => {
    calculator.addNum(numberElement.textContent);
    updateScreen();
  });
});
