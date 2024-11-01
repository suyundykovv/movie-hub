const registrationPopup = document.getElementById('registrationPopup');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeBtn = document.getElementById('closeBtn');
const textP=document.getElementById("welcome");

registerBtn.addEventListener('click', function() {
    const username = prompt('Enter username:');
    if (username) {
        localStorage.setItem('username', username);
        alert(`Registered as ${username}`);
        checkAuth();
    }
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
      textP.textContent= `Welcome, ${username}!`;
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


  
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//FAQ
function toggleFAQ(faqId) {
    const faqAnswer = document.getElementById(faqId);
    if (faqAnswer.style.display === "block") {
        faqAnswer.style.display = "none";
    } else {
        faqAnswer.style.display = "block";
    }
}

//date and time
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit', 
        hour12: true
    };
    const formattedDateTime = now.toLocaleString('en-US', options);
    document.getElementById('dateTimeDisplay').textContent = formattedDateTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);

//random color
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F7DC6F", "#76D7C4", "#D2B4DE"];
const button = document.getElementById("color_change");

button.addEventListener("click", function() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.style.backgroundColor = randomColor;
});

//clear all inputs
const clearButt=document.getElementById('clear');
clearButt.addEventListener('click' , function() {
    document.querySelectorAll('input').forEach(input => input.value = '')
})

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

// Работа с темой (день/ночь)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'day';

// Установка темы при загрузке
applyTheme(savedTheme);
themeToggle.checked = savedTheme === 'night';

// Функция для применения темы
function applyTheme(theme) {
  if (theme === 'night') {
    document.body.style.backgroundColor = '#4b4b4b';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
}

// the 3rd task starts from here
const categoryFilter = document.getElementById('category-filter');

function filterMovies(category) {
    const movieCards = document.querySelectorAll('.row .col-md-4');
    movieCards.forEach(card => {
        const movieCategory = card.getAttribute('data-category');
        if (category === 'All' || movieCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function saveFilterSetting() {
    const selectedFilter = categoryFilter.value;
    localStorage.setItem('movieCategoryFilter', selectedFilter);
}
function applyFilterSetting() {
    const savedFilter = localStorage.getItem('movieCategoryFilter');
    if (savedFilter) {
        categoryFilter.value = savedFilter;
        filterMovies(savedFilter);
    } else {
        filterMovies('All');
    }
}
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    filterMovies(selectedCategory);
    saveFilterSetting();
});
document.addEventListener('DOMContentLoaded', applyFilterSetting);

// and end from here.
