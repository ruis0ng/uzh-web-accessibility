document
    .querySelector('#nav-bar-faculties a') // Select the menu element
    .addEventListener('click', function (event) { // Add event listener
        if (this.parentNode.style.display === 'none') {
            // Open the menu if it is closed
            this.parentNode.style.display = 'block';
            this.setAttribute('aria-expanded', "true");
        } else {
            // Close the menu it if is open
            this.parentNode.style.display = 'closed';
            this.setAttribute('aria-expanded', 'false');
        }
        event.preventDefault(); // Prevent default event handling
    }, false);

document
    .querySelector('#nav-bar-education a') // Select the menu element
    .addEventListener('click', function (event) { // Add event listener
        if (this.parentNode.style.display === 'none') {
            // Open the menu if it is closed
            this.parentNode.style.display = 'block';
            this.setAttribute('aria-expanded', "true");
        } else {
            // Close the menu it if is open
            this.parentNode.style.display = 'closed';
            this.setAttribute('aria-expanded', 'false');
        }
        event.preventDefault(); // Prevent default event handling
    }, false);

document
    .querySelector('nav-bar-industry a') // Select the menu element
    .addEventListener('click', function (event) { // Add event listener
        if (this.parentNode.style.display === 'none') {
            // Open the menu if it is closed
            this.parentNode.style.display = 'block';
            this.setAttribute('aria-expanded', "true");
        } else {
            // Close the menu it if is open
            this.parentNode.style.display = 'closed';
            this.setAttribute('aria-expanded', 'false');
        }
        event.preventDefault(); // Prevent default event handling
    }, false);