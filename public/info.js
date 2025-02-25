document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
        alert("You are not logged in!");
        window.location.href = "auth.html"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }

        const userData = await response.json();

        // Populate user data into the HTML
        document.getElementById("userFullName").textContent = userData.username;
        document.getElementById("userEmail").textContent = userData.email;
        document.getElementById("userGenre").textContent = userData.favoriteGenre || "Not provided";
        document.getElementById("userMembership").textContent = userData.membership || "Standard";
    } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Error fetching user data, please log in again.");
        localStorage.removeItem("token");
        window.location.href = "auth.html";
    }
});

// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token"); // Remove token
    window.location.href = "auth.html"; // Redirect to login page
});
