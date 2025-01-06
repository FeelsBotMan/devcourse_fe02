class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.form = document.getElementById('expenseForm');
        this.expenseList = document.getElementById('expenseList');
        
        this.initializeEventListeners();
        this.renderExpenses();
        this.updateSummary();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });
    }

    addExpense() {
        const expense = {
            id: Date.now(),
            date: document.getElementById('date').value,
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value
        };

        this.expenses.push(expense);
        this.saveToLocalStorage();
        this.renderExpenses();
        this.updateSummary();
        this.form.reset();
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveToLocalStorage();
        this.renderExpenses();
        this.updateSummary();
    }

    renderExpenses() {
        this.expenseList.innerHTML = '';
        this.expenses.forEach(expense => {
            const d = new Date(expense.date);
            const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${expense.description}</td>
                <td>${expense.amount.toLocaleString()}원</td>
                <td>${expense.type === 'income' ? '수입' : '지출'}</td>
                <td>
                    <button class="delete-btn" onclick="expenseTracker.deleteExpense(${expense.id})">
                        삭제
                    </button>
                </td>
            `;
            this.expenseList.appendChild(row);
        });
    }

    updateSummary() {
        const totalIncome = this.expenses
            .filter(expense => expense.type === 'income')
            .reduce((sum, expense) => sum + expense.amount, 0);

        const totalExpense = this.expenses
            .filter(expense => expense.type === 'expense')
            .reduce((sum, expense) => sum + expense.amount, 0);

        const balance = totalIncome - totalExpense;

        document.getElementById('totalIncome').textContent = totalIncome.toLocaleString();
        document.getElementById('totalExpense').textContent = totalExpense.toLocaleString();
        document.getElementById('balance').textContent = balance.toLocaleString();
    }

    saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
}

const expenseTracker = new ExpenseTracker();

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 현재 날짜와 시간을 YYYY-MM-DDThh:mm 형식으로 가져오기
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('date').value = currentDateTime;
}); 