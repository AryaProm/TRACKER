export class Money {
    constructor() {
      this.amount = 0;
    }
  
    setIncome(amount) {
      if (isNaN(amount) || amount < 0) {
        console.error("Invalid income value.");
        return;
      }
      localStorage.setItem("income", Number(amount));
      this.setBalance(); // Recalculate balance when income is updated
    }
  
    getIncome() {
      const storedIncome = localStorage.getItem("income");
      return storedIncome ? Number(storedIncome) : 0;
    }
  
    setBalance() {
      const income = this.getIncome();
      const transactions = this.getTransactions();
      let balance = income;
      transactions.forEach(({ amount, type }) => {
        balance += type === "debit" ? amount : -amount;
      });
      localStorage.setItem("balance", Number(balance));
    }
  
    getBalance() {
      return Number(localStorage.getItem("balance")) || 0;
    }
  
    saveTransaction(description, amount, type) {
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      transactions.push({ description, amount, type, date: new Date().toISOString() });
      localStorage.setItem("transactions", JSON.stringify(transactions));
      this.setBalance(); // Update balance after each transaction
    }
  
    getTransactions() {
      return JSON.parse(localStorage.getItem("transactions")) || [];
    }
  }