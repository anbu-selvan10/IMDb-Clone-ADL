document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Email validation regex
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (fullname.length < 3) {
        alert("Full name must be at least 3 characters long.");
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
    } else if (password !== confirmPassword) {
        alert("Passwords do not match.");
    } else {
        alert("Successfully signed up! Redirecting to Sign In...");
        window.location.href = "../Signin/sign.html";
    }
});
