const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

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
