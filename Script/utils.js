import { Money } from "../Script/money.js";

export class Utils {
  constructor() {
    this.incomeDisplay = document.getElementById("income");
    this.balanceDisplay = document.getElementById("balance");
    this.incomeInput = document.getElementById("incomeInput");
    this.transactionsList = document.getElementById("transaction-list");

    this.M = new Money();
  }
  updateUI() {
    this.expensesDisplay = document.getElementById("expenses");

    this.incomeDisplay.innerHTML = `$${this.M.getIncome()}`;
    this.balanceDisplay.innerHTML = `$${this.M.getBalance()}`;

    // Calculate and display total expenses
    const totalExpenses = this.M.getTransactions()
      .filter((t) => t.type === "credit")
      .reduce((acc, t) => acc + t.amount, 0);

    this.expensesDisplay.innerHTML = `$${totalExpenses}`;

    this.incomeInput.placeholder = this.M.getIncome();
    this.renderTransactions();
  }
  renderTransactions() {
    this.transactionsList.innerHTML = "";
    const transactions = this.M.getTransactions();
  
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
        utils.updateUI();
      });
  
      listItem.appendChild(btn);
      transactionsList.appendChild(listItem);
    });
  }
}
