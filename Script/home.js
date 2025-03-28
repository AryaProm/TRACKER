import { Money } from "../Script/money.js";
import { Utils } from "../Script/utils.js";

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const incomeInput = document.getElementById("incomeInput");

const updateIncomeBtn = document.getElementById("updateIncome");
const debitBtn = document.getElementById("debit-btn");
const creditBtn = document.getElementById("credit-btn");
const incomeReceivedBtn = document.getElementById("incomeRecieved");

const M = new Money();
const utils = new Utils(M); // Pass Money instance to Utils

// Ensure UI updates with the correct Money instance
utils.updateUI();

// Update Income event
updateIncomeBtn.addEventListener("click", () => {
  const newIncome = parseFloat(incomeInput.value);
  if (!isNaN(newIncome) && newIncome >= 0) {
    M.setIncome(newIncome);
    utils.updateUI();
  } else {
    alert("Please enter a valid income amount.");
  }
});

// "Income Received" button event
incomeReceivedBtn.addEventListener("click", () => {
  let newIncome = parseFloat(incomeInput.value);
  if (isNaN(newIncome) || newIncome <= 0) {
    newIncome = M.getIncome(); // Use previous income if input is empty
  } else {
    newIncome += M.getIncome(); // Add input value to previous income
  }
  M.setIncome(newIncome);
  utils.updateUI();
});

// Debit transaction event
debitBtn.addEventListener("click", () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  M.saveTransaction(description, amount, "debit");
  utils.updateUI();

  descriptionInput.value = "";
  amountInput.value = "";
});

// Credit transaction event
creditBtn.addEventListener("click", () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  M.saveTransaction(description, amount, "credit");
  utils.updateUI();

  descriptionInput.value = "";
  amountInput.value = "";
});
