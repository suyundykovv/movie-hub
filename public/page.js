const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const textP=document.getElementById("welcome");
const userName=document.getElementById('userFullName');
const userEmail=document.getElementById('userEmail');
const userGenre=document.getElementById('userGenre');

checkAuth();

registerBtn.addEventListener('click', function() {
    const username = prompt('Enter username:');
    if (username) {
        localStorage.setItem('username', username);
        userName.textContent=username;
    }
    var eaddress = prompt('Enter e-mail:');
    while (true) {
        if (validateEmail(eaddress)) {
            localStorage.setItem('email', eaddress);
            userEmail.textContent=eaddress;
            break;
        }
        eaddress = prompt('Enter again e-mail:');
    }
    alert(`Registered as ${username}`);
    checkAuth();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    alert('Logged out');
    checkAuth();
});

function checkAuth() {
    const username = localStorage.getItem('username');
    const uemail = localStorage.getItem('email');
    if (username) {
      registerBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
      textP.textContent= `Welcome, ${username}!`;
      userName.textContent=username;
      userEmail.textContent=uemail;
    } else {
      registerBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
      textP.textContent= `Welcome`;
    }
}
checkAuth();


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function toggleFAQ(faqId) {
    const faqAnswer = document.getElementById(faqId);
    if (faqAnswer.style.display === "block") {
        faqAnswer.style.display = "none";
    } else {
        faqAnswer.style.display = "block";
    }
}

const sound=new Audio('click.mp3');
const buttons=document.querySelectorAll('button');
buttons.forEach(button_click => {
    button_click.addEventListener('click', function() {
        sound.play();
    })
})

const navLinks = document.querySelectorAll('.eventhandle-menu a');

function handleNavKeyDown(event) {
    const currentIndex = Array.from(navLinks).indexOf(document.activeElement);

    if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % navLinks.length;
        navLinks[nextIndex].focus();
        event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndex].focus();
        event.preventDefault();
    }
}

navLinks.forEach(link => {
    link.addEventListener('keydown', handleNavKeyDown);
});

const themeButton=document.getElementById('themeButton');
var savedTheme = localStorage.getItem('theme') || 'day';

applyTheme(savedTheme);

function applyTheme(theme) {
  if (theme === 'night') {
    document.body.style.backgroundColor = '#4b4b4b';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
}

themeButton.addEventListener('click', () => {
    if (savedTheme=='day') {
        savedTheme='night';
        applyTheme('night');
        localStorage.setItem('theme', 'night');
    }
    else {
        savedTheme='day';
        applyTheme('day');
        localStorage.setItem('theme', 'day');
    }
})

document.getElementById('editInfo').addEventListener('click', function() {
    const fullName = prompt('Enter your full name:', document.getElementById('userFullName').textContent);
    const email = prompt('Enter your email:', document.getElementById('userEmail').textContent);
    const genre = prompt('Enter your favorite genre:', document.getElementById('userGenre').textContent);
    const membership = prompt('Enter your membership type:', document.getElementById('userMembership').textContent);

    if (fullName) document.getElementById('userFullName').textContent = fullName;
    if (email) document.getElementById('userEmail').textContent = email;
    if (genre) document.getElementById('userGenre').textContent = genre;
    if (membership) document.getElementById('userMembership').textContent = membership;
});