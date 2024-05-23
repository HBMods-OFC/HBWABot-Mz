const checkVipUser = (userId, vipmem) => {
    let status = false;
    Object.keys(vipmem).forEach((i) => {
        if (vipmem[i].id === userId) {
            status = true;
        }
    });
    return status;
};
/*
const expiredVipCheck = (userId, vipmem) => {
    const currentTime = Date.now();
    let isVip = false;
    let isExpired = false;
    
    for (let i = 0; i < vipmem.length; i++) {
        if (vipmem[i].id === userId) {
            isVip = true;
            if (vipmem[i].expired !== "lifetime" && Date.parse(vipmem[i].expired) < currentTime) {
                isExpired = true;
                vipmem.splice(i, 1);
                i--;
            }
            break;
        }
    }
    
    return { isVip, isExpired, updatedVipmem: vipmem };
};
*/
const expiredVipCheck = (HBWABotMz, msg, vipmem) => {
	setInterval(() => {
		let position = null;
		Object.keys(vipmem).forEach((i) => {
			if (Date.now() >= vipmem[i].expired) {
				position = i;
			}
		});
		if (position !== null) {
			idny = vipmem[position].id;
			vipmem.splice(position, 1);
			idny ? HBWABotMz.sendMessage(idny, { text: "*Message From Vip Subscribtion* \nI vip hun chhung a tawp tawh a, He message hi dawn nawn thawh loh emaw VIP hi renew i duh a nih chuan a hnuaia number ka dahah hian va hrilh hriat tur a ni!!!..\nhttps://wa.me/918416093656" }) : "";
			idny = false;
		}
	}, 1000);
};

const getallVipUser = (vipmem) => {
    const array = [];
    Object.keys(vipmem).forEach((i) => {
        array.push(vipmem[i].id);
    });
    return array;
};

module.exports = {
    expiredVipCheck,
    checkVipUser,
    getallVipUser,
};

