export class Money {
  constructor() {
    this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    this.income = parseFloat(localStorage.getItem("income")) || 0;
  }

  getIncome() {
    return this.income;
  }

  setIncome(newIncome) {
    this.income = newIncome;
    localStorage.setItem("income", newIncome);
  }

  getBalance() {
    const totalExpenses = this.transactions
      .filter((t) => t.type === "debit")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalCredits = this.transactions
      .filter((t) => t.type === "credit")
      .reduce((acc, t) => acc + t.amount, 0);

    return this.income + totalCredits - totalExpenses;
  }
  getTransactions() {
    return this.transactions;
  }

  saveTransaction(description, amount, type) {
    this.transactions.push({ description, amount, type });
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  removeTransaction(index) {
    this.transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }
}
