function setValid(element) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.removeAttribute("aria-invalid");
    element.setAttribute("aria-valid", "true");
}

function setInvalid(element, errorMessage) {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.setAttribute("aria-invalid", "true");
    element.removeAttribute("aria-valid");
    var errorSmall = element.nextElementSibling;
    errorSmall.textContent = errorMessage;
    errorSmall.classList.add("text-danger");
}

function removeValidation(element) {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    element.removeAttribute("aria-invalid");
    element.removeAttribute("aria-valid");
    var errorSmall = element.nextElementSibling;
    errorSmall.textContent = "";
}

function validateEmail(emailElement) {
    var email = emailElement.value.trim();
    if (email.length === 0) {
        setInvalid(emailElement, "Email is required");
        return false;
    } else if (!email.includes("@")) {
        setInvalid(emailElement, "Please enter a valid email address");
        return false;
    }
    setValid(emailElement);
    return true;
}

function validatePassword(passwordElement) {
    var password = passwordElement.value.trim();
    if (password.length === 0) {
        setInvalid(passwordElement, "Password is required");
        return false;
    } else if (password.length < 8) {
        setInvalid(passwordElement, "Password must be at least 8 characters long");
        return false;
    } else if (password.length > 16) {
        setInvalid(passwordElement, "Password cannot exceed 16 characters");
        return false;
    } else if (!/[a-zA-Z]+/.test(password) || !/[0-9]+/.test(password)) {
        setInvalid(passwordElement, "Password must contain at least one letter and one digit");
        return false;
    }
    setValid(passwordElement);
    return true;
}


function validateFirstName(firstNameElement) {
    var firstName = firstNameElement.value.trim();
    if (firstName.length === 0) {
        setInvalid(firstNameElement, "First name is required");
        return false;
    }
    setValid(firstNameElement);
    return true;
}

function validateLastName(lastNameElement) {
    var lastName = lastNameElement.value.trim();
    if (lastName.length === 0) {
        setInvalid(lastNameElement, "Last name is required");
        return false;
    }
    setValid(lastNameElement);
    return true;
}

function validateProgramme(programme) {
    var programmeInputs = programme.querySelectorAll('input[name="programme"]');
    var selectedProgramme = false;

    for (var i = 0; i < programmeInputs.length; i++) {
        if (programmeInputs[i].checked) {
            selectedProgramme = true;
            break;
        }
    }

    if (!selectedProgramme) {
        for (var i = 0; i < programmeInputs.length; i++) {
            programmeInputs[i].classList.add('is-invalid');
        }
        document.getElementById('register-programme-error').textContent = 'Please select a programme.';
        return false;
    } else {
        for (var i = 0; i < programmeInputs.length; i++) {
            programmeInputs[i].classList.remove('is-invalid');
        }
        document.getElementById('register-programme-error').textContent = '';
        return true;
    }
}




function login(event) {
    event.preventDefault();
    event.stopPropagation();

    var email = document.getElementById("login-email-control");
    var password = document.getElementById("login-password-control");

    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
        // Perform login logic
    } else {
        document.getElementById("login-error").classList.remove("d-none");
    }
}

function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    var email = document.getElementById("login-email-control");

    var isEmailValid = validateEmail(email);

    if (isEmailValid) {
        // Perform password retrieval logic
    } else {
        document.getElementById("login-error").classList.remove("d-none");
    }
}

function register(event) {
    event.preventDefault();
    event.stopPropagation();

    var firstName = document.getElementById("register-first-name-control");
    var lastName = document.getElementById("register-last-name-control");
    var email = document.getElementById("register-email-control");
    var password = document.getElementById("register-password-control");
    var programme = document.getElementById("register-programme-control");

    var isFirstNameValid = validateFirstName(firstName);
    var isLastNameValid = validateLastName(lastName);
    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);
    var isProgrammeValid = validateProgramme(programme);

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isProgrammeValid) {
        // Perform registration logic
    } else {
        document.getElementById("register-error").classList.remove("d-none");
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        document.getElementById("login-login-button").addEventListener("click", login, false);
        document.getElementById("login-forgot-button").addEventListener("click", forgot, false);
        document.getElementById("register-register-button").addEventListener("click", register, false);

        var email = document.getElementById("login-email-control");
        var password = document.getElementById("login-password-control");
        var firstName = document.getElementById("register-first-name-control");
        var lastName = document.getElementById("register-last-name-control");
        var registerEmail = document.getElementById("register-email-control");
        var registerPassword = document.getElementById("register-password-control");
        var programme = document.getElementById("register-programme-control");

        // Validate input on input events
        email.addEventListener("input", function () {
            validateEmail(email);
        });

        password.addEventListener("input", function () {
            var isPasswordValid = password.value.trim().length > 0;
            if (isPasswordValid) {
                setValid(password);
            } else {
                setInvalid(password);
            }
        });

        firstName.addEventListener("input", function () {
            validateFirstName(firstName);
        });

        lastName.addEventListener("input", function () {
            validateLastName(lastName);
        });

        registerEmail.addEventListener("input", function () {
            validateEmail(registerEmail);
        });

        registerPassword.addEventListener("input", function () {
            validatePassword(registerPassword);
        });

        programme.addEventListener("input", function () {
            validateProgramme(programme);
        });
    },
    false
);
