module.exports = (() => {
    let otps = [];
    let whitelist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const newOtp = (socketId) => {
        let token = '';

        Array(50).fill(null).forEach(_ => {
            token += whitelist[Math.ceil(Math.random() * (whitelist.length - 1))];
        });

        otps.push({
            socketId,
            timestamp: Date.now(),
            token,
            checked: null
        });

        return token;
    }

    const checkOtp = (token) => {
        try {
            const otp = otps.filter(obj => obj.token === token)[0];

            if (parseInt(String((Date.now() - otp.timestamp) / 1000), 10) <= 120) {
                otps.map(obj => {
                    if (obj.socketId === otp.socketId) {
                        obj.checked = Date.now();
                    }
                });

                return otp.socketId;
            }
        } catch (e) {}

        return false;
    }

    return {
        newOtp,
        checkOtp
    }
})();