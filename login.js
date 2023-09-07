window.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.querySelector('.login-container');
    const usernameInput = document.getElementById('username-input');
    const namePrompt = document.getElementById('name-prompt');
    const habitInput = document.getElementById('habit-input');
    const habitPrompt = document.getElementById('habit-prompt');
    const habitList = document.getElementById('habit-list');
    const usernameDisplay = document.getElementById('username-display');
    const doneBtn = document.getElementById('done-btn');

    loginContainer.classList.add('initial');  // Set the initial class on page load

    function isValid(input) {
        return input && input.trim().length > 0;
    }

    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const username = this.value.trim();

            if (isValid(username)) {
                usernameDisplay.textContent = username;

                namePrompt.classList.add('hidden');
                this.classList.add('hidden');
                
                // Save username to local storage
                localStorage.setItem('username', username);

                transitionToHabits();
            } else {
                alert('Please enter a valid name.');
            }
        }
    });

    function transitionToHabits() {
        loginContainer.classList.remove('initial');        // Remove initial class
        loginContainer.classList.add('habits-display');    // Add habits-display class

        setTimeout(() => {
            namePrompt.style.display = 'none';
            usernameInput.style.display = 'none';

            habitPrompt.classList.remove('hidden');
            habitPrompt.classList.add('visible', 'fade');
            
            habitInput.style.display = 'block';
            habitInput.classList.remove('hidden');
            habitInput.classList.add('visible', 'fade');
            
            habitList.style.display = 'block';
            habitList.classList.remove('hidden');
            habitList.classList.add('visible', 'fade');
            
            doneBtn.style.display = 'block';
            doneBtn.classList.remove('hidden');
            doneBtn.classList.add('visible', 'fade');
        }, 500);
    }

    habitInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const habit = this.value.charAt(0).toUpperCase() + this.value.slice(1).trim(); // Capitalizing habit

            if (isValid(habit)) {
                const li = document.createElement('li');
                li.textContent = habit;
                habitList.appendChild(li);
                this.value = '';
                
                // Save habits to local storage (as an array)
                let habits = JSON.parse(localStorage.getItem('habits')) || [];
                habits.push(habit);
                localStorage.setItem('habits', JSON.stringify(habits));
            } else {
                alert('Please enter a valid habit.');
            }
        }
    });

    doneBtn.addEventListener('click', function() {
        const habits = [];
        habitList.querySelectorAll('li').forEach(li => habits.push(li.textContent));
        localStorage.setItem('habits', JSON.stringify(habits));

        window.location.href = 'landing.html';
    });
});