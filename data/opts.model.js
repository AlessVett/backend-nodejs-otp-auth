const { db1 } = require('../config/dbs');
const utils = require('../config/utils');

module.exports = {
    newString: (socketId, callback) => {
        const token = utils.genString(50);
        db1.execute("INSERT INTO `strings` (`socketId`, `token`) VALUES (:socketId, :token)", {
            socketId: socketId,
            token: token
        }, (err, results, fields) => {
            if (err) {
                callback({
                    status: false
                });
            }

            callback({
                status: true,
                token
            });
        });
    },
    checkString: (user, token, callback) => {
        // check if `user` in db1.users

        db1.execute("SELECT `socketId`, `timestamp` FROM `strings` WHERE `token` = :token", {
            token: token
        }, (err, results, fields) => {
           if (err) {
               callback({
                   status: false,
                   content: null
               });
           } else {
               const { socketId, timestamp } = results[0];
               const current_timestamp = Date.now();

               if (parseInt(String((new Date(current_timestamp) - new Date(timestamp)) / 1000), 10) <= 120) {
                   db1.execute("UPDATE `strings` SET `user` = :user, `confirmed` = :accepted WHERE `socketId` = :socketId", {
                       user: user,
                       accepted: new Date(current_timestamp),
                       socketId: socketId
                   }, (err, results, fields) => {
                       if (err) {
                           callback({
                               status: false,
                               content: null
                           });
                       } else {
                           callback({
                               status: true,
                               content: socketId
                           });
                       }
                   });
               } else {
                   db1.execute("UPDATE `strings` SET `user` = :user WHERE `socketId` = :socketId", {
                       user: user,
                       socketId: socketId
                   }, (err, results, fields) => {
                       callback({
                           status: false,
                           content: null
                       });
                   });
               }
           }
        });
    }
};