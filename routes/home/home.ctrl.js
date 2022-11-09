const index = (req, res, next) => {
    var p1 = req.query['p1'];
    var p2 = req.query.p2;
    res.render('home/index',
        {
            id: '???',
            pw: '???'
        });
};

const login = (req, res, next) => {
    var id = req.body['id'];
    var pw = req.body['pw'];
    res.render('home/login',
        {
            id: id,
            pw: pw
        }
    );
};

module.exports = {
    index,
    login,
};