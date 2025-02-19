document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Regular expression for email validation
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
    } else {
        localStorage.setItem("username", "Anbu");
        window.location.href = "../index.html";
    }
});
