let expenses = [];

        function addExpense() {
            const expenseName = document.getElementById('expenseName').value.trim();
            const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

            if (expenseName && !isNaN(expenseAmount)) {
                expenses.push({ name: expenseName, amount: expenseAmount });
                updateUI();
            }

            document.getElementById('expenseName').value = '';
            document.getElementById('expenseAmount').value = '';
        }

        function updateUI() {
            const expenseList = document.getElementById('expenseList');
            const entryDropdown = document.getElementById('entryDropdown');
            
            // Clear the existing entries
            expenseList.innerHTML = '';
            entryDropdown.innerHTML = '<option value="-1">Select an Entry</option>';

            let total = 0;

            // Display only the last entry below the form
            if (expenses.length > 0) {
                const lastExpense = expenses[expenses.length - 1];

                const listItem = document.createElement('li');
                listItem.classList.add('expense-item');

                const itemName = document.createElement('span');
                itemName.textContent = lastExpense.name;

                const itemAmount = document.createElement('span');
                itemAmount.textContent = `$${lastExpense.amount.toFixed(2)}`;
                itemAmount.classList.add('amount');

                listItem.appendChild(itemName);
                listItem.appendChild(itemAmount);
                expenseList.appendChild(listItem);
            }

            // Populate the dropdown with all entries
            expenses.forEach((expense, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `Entry ${index + 1}`;
                entryDropdown.appendChild(option);

                total += expense.amount;
            });

            const totalElement = document.createElement('li');
            totalElement.textContent = 'Total:';
            totalElement.classList.add('total');

            const totalAmount = document.createElement('span');
            totalAmount.textContent = `$${total.toFixed(2)}`;
            totalAmount.classList.add('amount');

            totalElement.appendChild(totalAmount);
            expenseList.appendChild(totalElement);
        }

        function displaySelected() {
            const selectedIndex = document.getElementById('entryDropdown').value;

            if (selectedIndex !== '-1') {
                const selectedDetails = document.getElementById('selectedDetails');
                const expense = expenses[selectedIndex];
                selectedDetails.textContent = `Name: ${expense.name}, Amount: $${expense.amount.toFixed(2)}`;
            } else {
                document.getElementById('selectedDetails').textContent = '';
            }
        }