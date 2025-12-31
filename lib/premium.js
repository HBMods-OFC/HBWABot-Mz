const fs = require('fs');
const moment = require('moment-timezone');
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD');

/**
 * Add premium user.
 * @param {String} userId
 * @param {String|Number} days
 * @param {Array} _dir
 */
const addPremiumUser = (userId, days, _dir) => {
    const kumtinvip2 = moment(kumtinvip).add(parseInt(days), 'days').format('YYYY-MM-DD');
    const cekUser = _dir.find((user) => user.id === userId); // Fixed typo

    if (cekUser) {
        cekUser.expired = kumtinvip2; // Update existing user
    } else {
        const obj = {
            id: userId,
            expired: kumtinvip2, // Add new user
        };
        _dir.push(obj);
    }
    fs.writeFileSync('./asset/database/premium.json', JSON.stringify(_dir, null, 2));
};

/**
 * Get premium user position.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Number}
 */
const getPremiumPosition = (userId, _dir) => {
    return _dir.findIndex((user) => user.id === userId);
};

/**
 * Get premium user expiry.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {String|null}
 */
const getPremiumExpired = (userId, _dir) => {
    const user = _dir.find((user) => user.id === userId);
    return user ? user.expired : null;
};

/**
 * Check if user is premium.
 * @param {String} userId
 * @param {Object} _dir
 * @returns {Boolean}
 */
const checkPremiumUser = (userId, _dir) => {
    return _dir.some((user) => user.id === userId);
};

/**
 * Constantly checking for expired premium users.
 * @param {Object} conn
 * @param {Array} _dir
 */
const expiredCheck = (conn, _dir) => {
    setInterval(() => {
        const expiredUsers = [];

        // Identify expired users
        _dir.forEach((user, i) => {
            if (Date.now() >= moment(user.expired, 'YYYY-MM-DD').valueOf()) {
                expiredUsers.push(i);
            }
        });

        // Remove expired users and notify them
        expiredUsers.reverse().forEach((i) => {
            const idny = _dir[i].id;
            console.log(`Premium expired: ${idny}`);
            _dir.splice(i, 1);

            // Notify the user
            if (idny) {
                conn.sendMessage(idny, {
                    text: 'Premium Expired, Subscribe avangin lawmthu kan sawi e',
                });
            }
        });

        // Save updated premium user list
        fs.writeFileSync('./asset/database/premium.json', JSON.stringify(_dir, null, 2));
    }, 1000);
};

/**
 * Get all premium user IDs.
 * @param {Array} _dir
 * @returns {String[]}
 */
const getAllPremiumUser = (_dir) => {
    return _dir.map((user) => user.id);
};

module.exports = {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredCheck,
    checkPremiumUser,
    getAllPremiumUser,
};
