const container = document.getElementById('countdownContainer');

/**
 * Render the countdown windows
 * @param {Object} data - Data object containing event name and target date
 */
function renderCountdownWindows(data) {
    // Get window style data
    const windowStyle = data.window;

    // Set window style
    container.style.width = windowStyle.width;
    container.style.height = windowStyle.height;
    container.style.left = windowStyle.left;
    container.style.top = windowStyle.top;

    // Render each event
    data.events.forEach(event => {
        // Create countdown window element
        const countdownWindow = document.createElement('div');
        countdownWindow.className = 'countdownWindow';

        // Create event name element
        const title = document.createElement('span');
        title.className = 'eventName';
        title.textContent = event.eventName;
        title.style.color = event.titleColor || "#000";

        // Create remaining days element
        const daysRemainingElement = document.createElement('span');
        daysRemainingElement.className = 'DaysRemaining';
        daysRemainingElement.style.color = event.countdownColor || "#000";

        // Set countdown window style
        countdownWindow.style.backgroundColor = event.backgroundColor || '#ffffff44';

        // Append elements to countdown window
        countdownWindow.appendChild(title);
        countdownWindow.appendChild(document.createElement("br"));
        countdownWindow.appendChild(daysRemainingElement);

        // Append countdown window to container
        container.appendChild(countdownWindow);
        container.appendChild(document.createElement("br"));

        /**
         * Update the countdown
         */
        function updateCountdown() {
            const currentDate = new Date();

            const targetDate = new Date(event.time);
            const timeDiff = targetDate.getTime() - currentDate.getTime();

            if (timeDiff >= 0) {
                // If the target date is after or on the same day as the current date, display the countdown
                const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                daysRemainingElement.textContent = daysRemaining;
                countdownWindow.style.display = 'block'; // Display element
            } else {
                // If the target date is before the current date, hide the countdown
                daysRemainingElement.textContent = ''; // Hide date
                countdownWindow.style.display = 'none'; // Hide element
            }
        }

        // Calculate and update the countdown on page load
        document.addEventListener('DOMContentLoaded', () => {
            updateCountdown();

            // Update the countdown every minute
            setInterval(updateCountdown, 1000);
        });
    });
}

// Read event data
const eventData = window.fs.readFileSync('./events.json', 'utf8');

// Render countdown windows
renderCountdownWindows(eventData);
