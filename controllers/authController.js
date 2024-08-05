const users = {}; // Armazenar usuários em memória (não recomendado para produção)

exports.registerForm = (req, res) => {
    res.render('register');
};

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.send('Usuário já existe');
    }
    users[username] = password;
    req.session.username = username;
    res.redirect('/home');
};

exports.loginForm = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.username = username;
        res.redirect('/home');
    } else {
        res.send('Usuário ou senha inválidos');
    }
};

exports.home = (req, res) => {
    if (req.session.username) {
        res.render('home', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
