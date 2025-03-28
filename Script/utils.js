export class Utils {
  constructor(M) {
    this.M = M; 

    this.incomeDisplay = document.getElementById("income");
    this.balanceDisplay = document.getElementById("balance");
    this.expensesDisplay = document.getElementById("expenses");
    this.transactionsList = document.getElementById("transaction-list");
    this.incomeInput = document.getElementById("incomeInput");

    this.updateUI();
  }

  updateUI() {
    this.incomeDisplay.innerHTML = `$${this.M.getIncome()}`;
    this.balanceDisplay.innerHTML = `$${this.M.getBalance()}`;

    
    const totalExpenses = this.M.getTransactions()
      .filter((t) => t.type === "debit") 
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
      listItem.textContent = `${description}: ${type === "debit" ? "-" : "+"}$${amount}`;
      listItem.style.color = type === "debit" ? "red" : "green";

      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.className = "remove-btn";
      btn.style.color = "white";
      btn.style.backgroundColor = "red";
      btn.style.border = "none";
      btn.style.marginLeft = "10px";
      btn.style.padding = "5px 10px";
      btn.style.cursor = "pointer";

     
      btn.addEventListener("click", () => {
        this.M.removeTransaction(index);
        this.updateUI();
      });

      listItem.appendChild(btn);
      this.transactionsList.appendChild(listItem);
    });
  }
}
