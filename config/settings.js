module.exports = {
    server: {
            host: '127.0.0.1',
            port: 8000
    },
    cors : true,
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'Cronj',
        username: '',
        password: ''
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        username: "saneilnaik11@gmail.com",
        password: "uc@ntste@l",
        accountName: "gmail",
        verifyEmailUrl: "verifyEmail"
    }
};
