// Digital Clock Functionality
        function updateClock() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? String(hours).padStart(2, '0') : '12';
            const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
            document.getElementById('timeDisplay').textContent = timeString;
        }

        // Timer functionality
        let timerSeconds = 0;
        let timerInterval;
        let blinkInterval;
        let isTimerVisible = true;

        function updateTimer() {
            if (timerSeconds > 0) {
                timerSeconds--;
                const hours = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
                const seconds = String(timerSeconds % 60).padStart(2, '0');
                const timerString = `${hours}:${minutes}:${seconds}`;
                document.getElementById('timerDisplay').textContent = timerString;
            } else {
                clearInterval(timerInterval);
                blinkTimer();
            }
        }

        function blinkTimer() {
            const timerDisplay = document.getElementById('timerDisplay');
            timerDisplay.classList.add('blink-red');
            
            setTimeout(() => {
                timerDisplay.classList.remove('blink-red');
                timerDisplay.style.visibility = 'visible';
            }, 30000);
        }

        // Toggle Timer Visibility
        document.getElementById('toggleTimer').addEventListener('click', function() {
            const clockSection = document.getElementById('clockSection');
            const toggleBtn = document.getElementById('toggleTimer');
            
            if (isTimerVisible) {
                // Hide timer
                clockSection.classList.add('timer-hidden');
                toggleBtn.textContent = 'Show Timer';
                isTimerVisible = false;
                
                // Hide timer controls if they're visible
                const timerControls = document.getElementById('timerControls');
                if (timerControls.classList.contains('active')) {
                    timerControls.classList.remove('active');
                    document.getElementById('showControls').textContent = 'Show Timer Controls';
                }
            } else {
                // Show timer
                clockSection.classList.remove('timer-hidden');
                toggleBtn.textContent = 'Hide Timer';
                isTimerVisible = true;
            }
        });

        // Show and hide timer controls
        document.getElementById('showControls').addEventListener('click', function() {
            const timerControls = document.getElementById('timerControls');
            const showControlsBtn = this;
            
            if (timerControls.classList.contains('active')) {
                // Hide timer controls
                timerControls.classList.remove('active');
                showControlsBtn.textContent = 'Show Timer Controls';
            } else {
                // Show timer controls
                timerControls.classList.add('active');
                showControlsBtn.textContent = 'Hide Timer Controls';
            }
        });

        // Set Timer function
        document.getElementById('setTimer').addEventListener('click', function() {
            const hours = parseInt(document.getElementById('hoursInput').value) || 0;
            const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
            const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
            
            // Validate inputs
            if (hours < 0 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
                alert('Please enter valid time values!');
                return;
            }
            
            timerSeconds = hours * 3600 + minutes * 60 + seconds;
            
            // Reset timer display
            const timerString = `${String(Math.floor(timerSeconds / 3600)).padStart(2, '0')}:${String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0')}:${String(timerSeconds % 60).padStart(2, '0')}`;
            document.getElementById('timerDisplay').textContent = timerString;
            
            // Remove any blinking effect
            document.getElementById('timerDisplay').classList.remove('blink-red');
            document.getElementById('timerDisplay').style.visibility = 'visible';
            
            // Clear any existing intervals
            if (timerInterval) clearInterval(timerInterval);
            if (blinkInterval) clearInterval(blinkInterval);
            
            // Start the timer
            timerInterval = setInterval(updateTimer, 1000);
        });

        // Stop Timer function
        document.getElementById('stopTimer').addEventListener('click', function() {
            clearInterval(timerInterval);
            document.getElementById('timerDisplay').classList.remove('blink-red');
            document.getElementById('timerDisplay').style.visibility = 'visible';
        });

        // Restart Timer function
        document.getElementById('restartTimer').addEventListener('click', function() {
            clearInterval(timerInterval);
            document.getElementById('timerDisplay').classList.remove('blink-red');
            document.getElementById('timerDisplay').style.visibility = 'visible';
            document.getElementById('hoursInput').value = '';
            document.getElementById('minutesInput').value = '';
            document.getElementById('secondsInput').value = '';
            document.getElementById('timerDisplay').textContent = "00:00:00";
            timerSeconds = 0;
        });

        // Marquee text color change functionality
        const marqueeText = document.getElementById('marqueeText');
        const colors = ['#ffffff', '#3498db', '#e74c3c']; // White, Blue, Red
        let colorIndex = 0;
        
        function changeMarqueeColor() {
            marqueeText.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }
        
        // Change color every 10 seconds (10000 milliseconds)
        setInterval(changeMarqueeColor, 10000);
        
        // Set initial color
        changeMarqueeColor();

        // Update clock immediately and then every second
        updateClock();
        setInterval(updateClock, 1000);