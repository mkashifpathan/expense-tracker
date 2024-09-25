let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add an expense
function addExpense() {
    const expenseName = document.getElementById('expenseName').value.trim();
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0 ) {
        showFeedback('Please enter a valid name and amount.', 'error');
        highlightInvalidFields();
        return;
    }

    expenses.push({ name: expenseName, amount: expenseAmount, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
    showFeedback('Expense added successfully!', 'success', expenses.length - 1);
    clearForm();
}

// Function to show feedback messages
function showFeedback(message, type, highlightIndex) {
    const feedbackElement = document.createElement('div');
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
    document.body.appendChild(feedbackElement);

    if (highlightIndex !== undefined) {
        setTimeout(() => {
            const expenseItems = document.querySelectorAll('.expense-item');
            if (expenseItems[highlightIndex]) {
                expenseItems[highlightIndex].classList.add('highlight');
                setTimeout(() => {
                    expenseItems[highlightIndex].classList.remove('highlight');
                }, 2000); // Remove highlight after 2 seconds
            }
        }, 300); // Delay highlight effect for visual feedback
    }

    setTimeout(() => {
        feedbackElement.remove();
    }, 3000);
}

// Function to clear form fields
function clearForm() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'Food'; // Reset to default
}

// Function to highlight invalid input fields
function highlightInvalidFields() {
    document.querySelectorAll(".input-field").forEach(field => {
        if (field.value.trim() === '' || isNaN(parseFloat(field.value)) || parseFloat(field.value) <= 0) {
            field.style.border = "1px solid red";
        } else {
            field.style.border = "1px solid #ccc";
        }
    });
}

// Function to update the UI with expense data
function updateUI() {
    const expenseList = document.getElementById('expenseList');
    const entryDropdown = document.getElementById('entryDropdown');
    expenseList.innerHTML = '';
    entryDropdown.innerHTML = '<option value="-1">Select an Entry</option>';

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const listItem = document.createElement('li');
        listItem.classList.add('expense-item');
        listItem.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)} (${expense.category})
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Entry ${index + 1}`;
        entryDropdown.appendChild(option);
        
        expenseList.appendChild(listItem);
    });

    const totalElement = document.getElementById('totalDisplay') || document.createElement('div');
    totalElement.id = 'totalDisplay';
    totalElement.className = 'total';
    totalElement.innerHTML = `Total: <span class="amount">$${total.toFixed(2)}</span>`;
    document.querySelector('.result-container').appendChild(totalElement);
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateUI();
    showFeedback('Expense deleted successfully!', 'success');
}

// Function to display details of the selected expense
function displaySelected() {
    const selectedIndex = document.getElementById('entryDropdown').value;
    const selectedDetails = document.getElementById('selectedDetails');
    if (selectedIndex !== '-1') {
        const expense = expenses[selectedIndex];
        selectedDetails.textContent = `Name: ${expense.name}, Amount: $${expense.amount.toFixed(2)}, Category: ${expense.category}`;
    } else {
        selectedDetails.textContent = '';
    }
}

// Initialize the UI with saved data
updateUI();

// Event listener for DOMContentLoaded to initialize expenses and UI
document.addEventListener('DOMContentLoaded', () => {
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updateUI();
});

// Event delegation for edit and delete button clicks
document.addEventListener('click', (event) => {
    if (event.target.matches('.edit-btn')) {
        const index = event.target.dataset.index;
        editExpense(index); // Ensure you have an editExpense function defined
    } else if (event.target.matches('.delete-btn')) {
        const index = event.target.dataset.index;
        deleteExpense(index);
    }
});
