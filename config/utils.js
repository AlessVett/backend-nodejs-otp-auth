module.exports = {
    genString: (length) => {
        let whitelist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let token = "";

        Array(length).fill(null).forEach(_ => {
            token += whitelist[Math.ceil(Math.random() * (whitelist.length - 1))];
        });

        return token;
    },
    genStringOfDigits: (length) => {
        let whitelist = "1234567890";
        let token = "";

        Array(length).fill(null).forEach(_ => {
            token += whitelist[Math.ceil(Math.random() * (whitelist.length - 1))];
        });

        return token;
    }
};