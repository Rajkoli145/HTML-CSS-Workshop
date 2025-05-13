document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = themeToggle.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        themeToggle.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Timer functionality
    class Timer {
        constructor(element, initialTime) {
            this.element = element;
            this.initialTime = this.timeToSeconds(initialTime);
            this.currentTime = this.initialTime;
            this.isRunning = false;
            this.interval = null;
        }

        timeToSeconds(timeString) {
            const [minutes, seconds] = timeString.split(':').map(Number);
            return minutes * 60 + seconds;
        }

        formatTime(totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.element.closest('.timer-section').classList.add('active');
                this.interval = setInterval(() => {
                    if (this.currentTime > 0) {
                        this.currentTime--;
                        this.update();
                    } else {
                        this.stop();
                    }
                }, 1000);
            }
        }

        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                this.element.closest('.timer-section').classList.remove('active');
                clearInterval(this.interval);
            }
        }

        reset() {
            this.stop();
            this.currentTime = this.initialTime;
            this.update();
        }

        update() {
            this.element.textContent = this.formatTime(this.currentTime);
        }
    }

    // Initialize timers
    const timerEight = new Timer(document.getElementById('timerEight'), '29:14');
    const timerMcDonald = new Timer(document.getElementById('timerMcDonald'), '32:55');

    // Edit button functionality
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const timerSection = button.closest('.timer-section');
            const timerDisplay = timerSection.querySelector('.timer-display');
            const timer = timerDisplay.id === 'timerEight' ? timerEight : timerMcDonald;
            
            // Stop the timer if it's running
            timer.stop();
            document.querySelector('.start-btn').textContent = 'START';
            
            // Prompt for new time
            const newTime = prompt('Enter new time (MM:SS format):', timer.formatTime(timer.currentTime));
            
            if (newTime && /^\d{1,2}:\d{2}$/.test(newTime)) {
                timer.initialTime = timer.timeToSeconds(newTime);
                timer.currentTime = timer.initialTime;
                timer.update();
            } else if (newTime) {
                alert('Please enter time in MM:SS format (e.g., 25:00)');
            }
        });
    });

    // Start button functionality
    document.querySelectorAll('.start-btn').forEach(button => {
        button.addEventListener('click', () => {
            const timerSection = button.closest('.timer-section');
            const timerDisplay = timerSection.querySelector('.timer-display');
            const timer = timerDisplay.id === 'timerEight' ? timerEight : timerMcDonald;
            
            if (!timer.isRunning) {
                // Stop other timer if running
                if (timerDisplay.id === 'timerEight') {
                    timerMcDonald.stop();
                } else {
                    timerEight.stop();
                }
                timer.start();
                button.textContent = 'STOP';
            } else {
                timer.stop();
                button.textContent = 'START';
            }
        });
    });

    // Stop All functionality
    document.querySelector('.stop-all').addEventListener('click', () => {
        timerEight.stop();
        timerMcDonald.stop();
        document.querySelectorAll('.start-btn').forEach(btn => btn.textContent = 'START');
    });

    // Timeout controls
    document.querySelectorAll('.timeout-controls').forEach(control => {
        const countElement = control.querySelector('.timeout-count');
        let count = 2;

        control.querySelector('.minus').addEventListener('click', () => {
            if (count > 0) {
                count--;
                countElement.textContent = `${count} left`;
            }
        });

        control.querySelector('.plus').addEventListener('click', () => {
            count++;
            countElement.textContent = `${count} left`;
        });
    });

    // Practice timer functionality
    document.querySelector('.practice').addEventListener('click', () => {
        timerEight.stop();
        timerMcDonald.stop();
        document.querySelectorAll('.start-btn').forEach(btn => btn.textContent = 'START');
        // Could implement practice timer here
    });

    // Add hover effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.02)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
