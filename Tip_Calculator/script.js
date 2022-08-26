const billInput = document.getElementById("billTotalInput");
const tipInput = document.getElementById("tipInput");
const numberOfPeopleDiv = document.getElementById("numberOfPeople");
const perPersonTotalDiv = document.getElementById("perPersonTotal");

let numberOfPeople = Number(numberOfPeopleDiv.innerText);

const calculateBill = () => {
  let bill = Number(billInput.value);

  let tip = Number(tipInput.value) / 100;

  if (isNaN(bill)) bill = 0;
  if (isNaN(tip)) tip = 0;

  let totalTip = bill * tip;
  let total = bill + totalTip;

  let perPersonTotal = total / numberOfPeople;
  perPersonTotal = perPersonTotal.toFixed(2)

  perPersonTotalDiv.innerHTML = perPersonTotal;
};

const increasePeople = () => {
  numberOfPeople++;
  numberOfPeopleDiv.innerText = numberOfPeople;
  calculateBill();
};

const decreasePeople = () => {
  if (numberOfPeople <= 1) return;

  numberOfPeople--;
  numberOfPeopleDiv.innerText = numberOfPeople;
  calculateBill();
};
