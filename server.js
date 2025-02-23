const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'public','main.html'))
});
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    console.log('Данные регистрации:', {
        username,
        email,
        password,
        confirmPassword
    });

    res.send('Регистрация прошла успешно');
});

app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});
