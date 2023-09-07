window.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const landingTitle = document.getElementById('landing-title');

    if (landingTitle) {
        if (username && username.trim() !== "") {
            landingTitle.textContent = `What would you like to track today, ${username}?`;
        } else {
            landingTitle.textContent = "Welcome to Habit & Mood Tracker";
        }
    }

    const boxesContainer = document.querySelector('.boxes-container');
    const circleProgress = document.querySelector('.circle-progress');
    
    // Fetch custom habits from localStorage
    let customHabits = JSON.parse(localStorage.getItem('habits')) || [];
    let checkedHabits = JSON.parse(localStorage.getItem('checkedHabits')) || [];

    function createTickableSquare(habit) {
        const box = document.createElement('div');
        box.classList.add('tickable-square');
        box.dataset.label = habit;

        if (checkedHabits.includes(habit)) {
            box.classList.add('active');
        }

        boxesContainer.appendChild(box);
    }

    // Create tickable squares for custom habits
    customHabits.forEach(habit => createTickableSquare(habit));

    const boxes = document.querySelectorAll('.tickable-square');
    
    if (boxes && circleProgress) {
        const totalHabits = boxes.length;
        let activeHabits = document.querySelectorAll('.tickable-square.active').length;

        boxes.forEach(box => {
            box.addEventListener('click', function() {
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    checkedHabits.push(this.dataset.label);
                } else {
                    const index = checkedHabits.indexOf(this.dataset.label);
                    if (index > -1) checkedHabits.splice(index, 1);
                }
                localStorage.setItem('checkedHabits', JSON.stringify(checkedHabits));

                activeHabits = document.querySelectorAll('.tickable-square.active').length;
                updateProgressCircle(activeHabits, totalHabits);
            });
        });

        function updateProgressCircle(active, total) {
            const percentage = (active / total) * 100;
            const offset = 100 - percentage;
            circleProgress.style.strokeDashoffset = `${offset}`;
        
            if (percentage >= 75) {
                circleProgress.style.stroke = "#4CAF50"; // Green for 75-100%
            } else if (percentage >= 50) {
                circleProgress.style.stroke = "#FFC107"; // Amber for 50-75%
            } else if (percentage >= 25) {
                circleProgress.style.stroke = "#FF5722"; // Orange-Red for 25-50%
            } else {
                circleProgress.style.stroke = "#F44336"; // Red for 0-25%
            }
        }
    }

    // mood
    const emojis = document.querySelectorAll('.emoji');

    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            emojis.forEach(e => e.classList.remove('active'));
            this.classList.add('active');
        });
    });
});