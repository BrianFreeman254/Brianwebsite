const adminPassword = "dF?8Q2sopLZmn";
const userPin = "822775";
const poemListElement = document.getElementById("poemList");
const userPoemListElement = document.getElementById("userPoemList");
const loginMessageElement = document.getElementById("loginMessage");
const userMessageElement = document.getElementById("userMessage");

// Load poems from JSON
async function loadPoems() {
    const response = await fetch("poems.json");
    const poems = await response.json();
    return poems;
}

// Display poems
async function displayPoems() {
    const poems = await loadPoems();
    poems.forEach(poem => {
        const poemDiv = document.createElement("div");
        poemDiv.innerHTML = `<h3>${poem.title}</h3><p>${poem.content}</p>`;
        poemListElement.appendChild(poemDiv);
        userPoemListElement.appendChild(poemDiv.cloneNode(true)); // For user page too
    });
}

// Admin login
document.getElementById("adminLoginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    if (password === adminPassword) {
        window.location.href = "admin_dashboard.html"; // Redirect to admin dashboard
    } else {
        loginMessageElement.textContent = "Incorrect password!";
    }
});

// User access
document.getElementById("userAccessForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pin = document.getElementById("pin").value;
    if (pin === userPin) {
        document.getElementById("userPoems").style.display = "block";
        userMessageElement.textContent = "Access granted!";
        displayPoems();
    } else {
        userMessageElement.textContent = "Incorrect PIN!";
    }
});

// Load poems on page load
document.addEventListener("DOMContentLoaded", displayPoems);