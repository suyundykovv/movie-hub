document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("show-register").addEventListener("click", () => {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
    });

    document.getElementById("show-login").addEventListener("click", () => {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    });

    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "main.html"; // Redirect after login
        } else {
            alert(data.message || "Login failed");
        }
    });

    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Registration successful! You can now log in.");
            document.getElementById("register-form").style.display = "none";
            document.getElementById("login-form").style.display = "block";
        } else {
            alert(data.message || "Registration failed");
        }
    });
});
