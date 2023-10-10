let signupForm = document.getElementById('signUp');
let loginForm = document.getElementById('login');
let loginFormEl = document.getElementById('loginForm');
let signupFormEl = document.getElementById('signupForm');
let usernamePasswordErrEl = document.getElementById('usernamePasswordErr');
let showPassword = false;

let registeredUsers = [];

function showLoginForm() {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
}

function showSignupForm() {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

function shoeHidepwd(){
    if(showPassword === false){
       document.getElementById('loginPassword').setAttribute('type','text')
        showPassword = true
    }
    else{
       document.getElementById('loginPassword').setAttribute('type','password')
        showPassword = false
    }
    
}



// Sign up form data
function submitSignupFormData(event) {
  event.preventDefault();
  let username = document.getElementById('username').value;
  let email = document.getElementById('regEmail').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (password.length < 6) {
    alert('Password should be at least 6 characters long');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  let userDetails = {
    username,
    email,
    password,
    confirmPassword
  };

  registeredUsers.push(userDetails);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  alert('Registration Successful. You can now login.');

  document.getElementById('username').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirmPassword').value = '';
}

// Log in form data
function submitLoginFormData(event) {
  event.preventDefault();

  let loginUsername = document.getElementById('loginUsername').value;
  let loginPasswordVal = document.getElementById('loginPassword').value;

  let userDetails = JSON.parse(localStorage.getItem('registeredUsers'));

  if (!userDetails) {
    alert("You are not a registered user. Kindly register yourself.");
    return;
  }

  let foundUser = userDetails.find(user => user.email === loginUsername);
  console.log(foundUser)

  if (!foundUser) {
    alert("Invalid username");
    return;
  }

  if (foundUser.password !== loginPasswordVal) {
    alert("Invalid password");
    return;
  }

  if(foundUser.email === loginUsername  &&  foundUser.password===loginPasswordVal){
    location.assign('home.html')
  }


  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
}

loginFormEl.addEventListener('submit', submitLoginFormData);
signupFormEl.addEventListener('submit', submitSignupFormData);