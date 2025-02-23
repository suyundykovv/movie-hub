const subb=document.querySelector('.submit');
subb.addEventListener('click', function() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var text = document.getElementById('comments').value;

  var hasError = false;

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('commentsError').textContent = '';

  if (name.trim() === '') {
    document.getElementById('nameError').textContent = 'Введите ваше имя';
    hasError = true;
  }

  if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Введите корректный email';
    hasError = true;
  }

  if (text.trim() === '') {
    document.getElementById('commentsError').textContent = 'Оставьте ваш отзыв';
    hasError = true;
  }
  if (!hasError) {
    document.getElementById('name').value=null;
    document.getElementById('email').value=null;
    document.getElementById('comments').value=null;
  }
});

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}



const registerBtn = document.getElementById('registerBtn');
const textP = document.getElementById('welcome');

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

const stars = document.querySelectorAll('.star');
const arr = [1,5,23,5]


stars.forEach((star,index) => {
  star.addEventListener('click', function() {
    clearStars();
    for (let i = 0; i <= index; i++) {
      stars[i].src = 'graded.png';
    }
  })
})

function clearStars() {
  stars.forEach(star => {
    star.src = 'no graded.png';
  });
}

const clearButt=document.getElementById('clear');
clearButt.addEventListener('click' , function() {
    document.querySelectorAll('input').forEach(input => input.value = '')
})

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'day';

applyTheme(savedTheme);
themeToggle.checked = savedTheme === 'night';

function applyTheme(theme) {
  if (theme === 'night') {
    document.body.style.backgroundColor = '#4b4b4b';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
}

themeToggle.addEventListener('change', () => {
  const newTheme = themeToggle.checked ? 'night' : 'day';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});