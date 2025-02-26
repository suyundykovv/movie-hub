document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Access denied! Please log in.");
        window.location.href = "auth.html";
        return;
    }

    try {
        // Fetch the authenticated user's details
        const authResponse = await fetch("https://movie-hub-69.onrender.com/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!authResponse.ok) throw new Error("Failed to fetch user data");

        const userData = await authResponse.json();

        // Redirect non-admin users
        if (userData.role !== "admin") {
            alert("Access Denied: Only Admins Can View This Page!");
            window.location.href = "main.html";
            return;
        }

        // Fetch all users
        const response = await fetch("https://movie-hub-69.onrender.com/api/auth/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        const userTableBody = document.getElementById("userTableBody");

        // Generate the user table with editable fields
        userTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user._id}</td>
                <td><input type="text" class="form-control name-input" value="${user.username}" data-userid="${user._id}"></td>
                <td><input type="email" class="form-control email-input" value="${user.email}" data-userid="${user._id}"></td>
                <td>
                    <select class="form-select role-select" data-userid="${user._id}">
                        <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
                        <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-primary save-btn" data-userid="${user._id}">Save</button>
                    <button class="btn btn-danger delete-btn" data-userid="${user._id}">Delete</button>
                </td>
            </tr>
        `).join("");

        // Event listener for Save buttons
        document.querySelectorAll(".save-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const userId = event.target.dataset.userid;
                const nameInput = document.querySelector(`.name-input[data-userid="${userId}"]`).value;
                const emailInput = document.querySelector(`.email-input[data-userid="${userId}"]`).value;
                const roleSelect = document.querySelector(`.role-select[data-userid="${userId}"]`).value;
                await updateUser(userId, nameInput, emailInput, roleSelect);
            });
        });

        // Event listener for Delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const userId = event.target.dataset.userid;
                await deleteUser(userId);
            });
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Error loading users.");
    }
});

// Function to update user details
async function updateUser(userId, name, email, role) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`https://movie-hub-69.onrender.com/api/auth/profile/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: name, email, role }),
        });

        if (!response.ok) throw new Error("Failed to update user");

        alert("User details updated successfully!");
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating user.");
    }
}

// Function to delete user
async function deleteUser(userId) {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`https://movie-hub-69.onrender.com/api/auth/profile/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to delete user");

        alert("User deleted successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user.");
    }
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "auth.html";
});
