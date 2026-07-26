// =========================================================
// session.js - Attach this to EVERY HTML page
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.toLowerCase();

    // 1. DYNAMIC NAVBAR LOGIC
    const navLinks = document.querySelector('.nav-links');
    const authContainer = document.getElementById('authContainer');

    if (isLoggedIn) {
        // If logged in, hide the Login/Register buttons
        if (authContainer) {
            authContainer.style.display = 'none';
        }

        // Create the Logout button inside the main nav list
        if (navLinks && !document.getElementById('logout-btn')) {
            const logoutLi = document.createElement('li');
            logoutLi.id = 'logout-btn';
            const logoutA = document.createElement('a');
            logoutA.href = "#";
            logoutA.textContent = `Logout [${currentUser}]`;
            logoutA.style.color = "#ff0505"; 
            logoutA.style.textShadow = "0 0 10px rgba(255, 5, 5, 0.8)";
            
            logoutA.addEventListener('click', (e) => {
                e.preventDefault();
                // Completely wipe the session memory
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                // Kick them back to the login page
                window.location.href = '../pages/login.html'; 
            });
            
            logoutLi.appendChild(logoutA);
            navLinks.appendChild(logoutLi);
        }
    } else {
        // Ensure Login/Register buttons are visible for guests
        if (authContainer) {
            authContainer.style.display = 'flex';
        }
    }

    // 2. REDIRECTION LOGIC (The Bouncer)
    const isAuthPage = currentPage.includes('login.html') || currentPage.includes('register.html');

    // If they are already logged in and try to view Login/Register -> Send to Challenges
    if (isLoggedIn && isAuthPage) {
        window.location.href = 'Challenges.html';
    }
});
