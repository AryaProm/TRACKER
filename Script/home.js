import { Money } from "../Script/money.js";

// Select elements efficiently
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const incomeInput = document.getElementById("incomeInput");
const incomeDisplay = document.getElementById("income");
const balanceDisplay = document.getElementById("balance");
const transactionsList = document.getElementById("transaction-list");
const updateIncomeBtn = document.getElementById("updateIncome");
const debitBtn = document.getElementById("debit-btn");
const creditBtn = document.querySelector("button[style='background-color: red;']");

const M = new Money();

// Initialize displayed values
function updateUI() {
  incomeDisplay.innerHTML = M.getIncome();
  balanceDisplay.innerHTML = M.getBalance();
  incomeInput.placeholder = M.getIncome();
  renderTransactions();
}
updateUI();

function renderTransactions() {
  transactionsList.innerHTML = "";
  const transactions = M.getTransactions();
  transactions.forEach(({ description, amount, type }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${description}: ${type === "debit" ? "+" : "-"}$${amount}`;
    listItem.style.color = type === "debit" ? "green" : "red";
    transactionsList.appendChild(listItem);
  });
}

// Update income event
updateIncomeBtn.addEventListener("click", () => {
  const newIncome = parseFloat(incomeInput.value);
  if (!isNaN(newIncome) && newIncome >= 0) {
    M.setIncome(newIncome);
    updateUI();
  } else {
    alert("Please enter a valid income amount.");
  }
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
  updateUI();

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
  updateUI();

  descriptionInput.value = "";
  amountInput.value = "";
});
