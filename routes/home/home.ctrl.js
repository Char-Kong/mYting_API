const index = (req, res) => {
    res.render("home/index") // views는 지정했기땨문
};

const login = (req, res) => {
    res.render("home/login")
};

module.exports = {
    index, // 모듈은 키와 - 값인데, 키만 넣어도 자체적으로 같은 네임의 값을 넣어줌
    login,
};