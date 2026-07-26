// =========================================================
// session.js - Attach this to EVERY HTML page
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.toLowerCase();

    // 1. Add "Logout" to the Navbar if the user is logged in
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && isLoggedIn) {
        // Find existing login/register links (if they exist) and remove them from the UI
        const authLinks = Array.from(navLinks.querySelectorAll('a')).filter(a => 
            a.textContent.toLowerCase().includes('login') || 
            a.textContent.toLowerCase().includes('offer')
        );
        authLinks.forEach(link => link.parentElement.remove());

        // Create the Logout button
        const logoutLi = document.createElement('li');
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

    // 2. REDIRECTION LOGIC (The Bouncer)
    const isAuthPage = currentPage.includes('login.html') || currentPage.includes('register.html');
    // We are now protecting Challenges.html instead of dashboard.html
    const isProtectedPage = currentPage.includes('challenges.html'); 

    // If they are already logged in and try to view Login/Register -> Send to Challenges
    if (isLoggedIn && isAuthPage) {
        window.location.href = 'Challenges.html';
    }

    // If they are NOT logged in and try to view the Challenges -> Kick to Login
    if (!isLoggedIn && isProtectedPage) {
        window.location.href = 'login.html';
    }
});