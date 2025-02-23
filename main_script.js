const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const textP=document.getElementById("welcome");
const profileButt = document.getElementById('profile');

registerBtn.addEventListener('click', function() {
    const username = prompt('Enter username:');
    if (username) {
        localStorage.setItem('username', username);
    }
    var eaddress = prompt('Enter e-mail:');
    while (true) {
        if (validateEmail(eaddress)) {
            localStorage.setItem('email', eaddress);
            break;
        }
        eaddress = prompt('Enter again e-mail:');
    }
    alert(`Registered as ${username}`);
    checkAuth();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    alert('Logged out');
    checkAuth();
});

function checkAuth() {
    const username = localStorage.getItem('username');
    if (username) {
      registerBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
      profileButt.style.display = 'inline';
      textP.textContent= `Welcome, ${username}!`;
    } else {
      registerBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
      textP.textContent= `Welcome`;
      profileButt.style.display = 'none';
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