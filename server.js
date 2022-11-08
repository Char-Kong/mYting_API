const express = require('express');

const app = express();
const port = 3000;

const Index = require('./routes/index');
const Login = require('./routes/login');
const Register = require('./routes/register');

app.use('/', Index);
app.use('/login', Login);
app.use('/register', Register);

app.listen(port, () => {
    console.log('서버 실행 .');
})