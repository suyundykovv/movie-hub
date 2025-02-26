document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Access denied! Please log in.");
        window.location.href = "auth.html";
        return;
    }

    try {
        // Fetch the authenticated user's details
        const authResponse = await fetch("http://localhost:3000/api/auth/me", {
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
        const response = await fetch("http://localhost:3000/api/auth/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        const userTableBody = document.getElementById("userTableBody");

        // Set innerHTML directly instead of using forEach
        userTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <select class="form-select role-select" data-userid="${user._id}">
                        <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
                        <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-danger delete-btn" data-userid="${user._id}">Delete</button>
                </td>
            </tr>
        `).join(""); // Join array into a single string

        // Event listener for role change
        document.querySelectorAll(".role-select").forEach(select => {
            select.addEventListener("change", async (event) => {
                const userId = event.target.dataset.userid;
                const newRole = event.target.value;
                await updateUserRole(userId, newRole);
            });
        });

        // Event listener for delete buttons
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


// Function to update user role
async function updateUserRole(userId, newRole) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`/api/users/${userId}/role`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        });

        if (!response.ok) throw new Error("Failed to update role");

        alert("User role updated successfully!");
    } catch (error) {
        console.error("Error updating user role:", error);
        alert("Error updating role.");
    }
}

// Function to delete user
async function deleteUser(userId) {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`/api/auth/profile/${userId}`, {
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
