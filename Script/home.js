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
const creditBtn = document.getElementById("credit-btn");
const incomeReceivedBtn = document.getElementById("incomeRecieved");

const M = new Money();

// Initialize displayed values
function updateUI() {
  const expensesDisplay = document.getElementById("expenses");

  incomeDisplay.innerHTML = `$${M.getIncome()}`;
  balanceDisplay.innerHTML = `$${M.getBalance()}`;

  // Calculate and display total expenses
  const totalExpenses = M.getTransactions()
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + t.amount, 0);

  expensesDisplay.innerHTML = `$${totalExpenses}`;

  incomeInput.placeholder = M.getIncome();
  renderTransactions();
}

// Render Transactions and Add Remove Button
function renderTransactions() {
  transactionsList.innerHTML = "";
  const transactions = M.getTransactions();

  transactions.forEach(({ description, amount, type }, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${description}: ${
      type === "debit" ? "+" : "-"
    }$${amount}`;
    listItem.style.color = type === "debit" ? "green" : "red";

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.className = "remove-btn";
    btn.style.color = "white";
    btn.style.backgroundColor = "red";
    btn.style.border = "none";
    btn.style.marginLeft = "10px";
    btn.style.padding = "5px 10px";
    btn.style.cursor = "pointer";

    // Remove transaction when clicking the button
    btn.addEventListener("click", () => {
      M.removeTransaction(index);
      updateUI();
    });

    listItem.appendChild(btn);
    transactionsList.appendChild(listItem);
  });
}

// Update Income event
updateIncomeBtn.addEventListener("click", () => {
  const newIncome = parseFloat(incomeInput.value);
  if (!isNaN(newIncome) && newIncome >= 0) {
    M.setIncome(newIncome);
    updateUI();
  } else {
    alert("Please enter a valid income amount.");
  }
});

// "Income Received" button event
incomeReceivedBtn.addEventListener("click", () => {
  let newIncome = parseFloat(incomeInput.value);
  if (isNaN(newIncome) || newIncome <= 0) {
    newIncome = M.getIncome(); // If input is empty, use previous income
  } else {
    newIncome += M.getIncome(); // Add input value to previous income
  }
  M.setIncome(newIncome);
  updateUI();
});

updateUI();

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

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.body.style.setProperty(
    "--mouse-x", `${x}px`
  );
  document.body.style.setProperty(
    "--mouse-y", `${y}px`
  );

  document.body.style.background = `
    radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, black 30%)
  `;
});
