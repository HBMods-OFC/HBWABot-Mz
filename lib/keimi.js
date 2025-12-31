let toMs = require("ms")
const path = require("path");
const fs = require("fs");
let thumb1 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_zing.jpg"));
let thumb2 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_vote.jpg"));
let thumb3 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_tlai.jpg"));
let thumb4 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_thah.jpg"));
let thumb5 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_winkeimi.jpg"));
let thumb6 = fs.readFileSync(path.join(__dirname, "../asset/image/keimi_mihring.jpg"));
var a;
var b;
var d;
var e;
var f;
var thuziak;
var idd;
var room;
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function emoji_role(role) {
    if (role === "mihring") {
        return "👱‍♂️";
    } else if (role === "zawlnei") {
        return "👳";
    } else if (role === "vengtu") {
        return "👼";
    } else if (role === "dawithiam") {
        return "🔮";
    } else if (role === "keimi") {
        return "🐯";
    } else {
        return "";
    }
}

// #######################

const findObject = (obj = {}, key, value) => {
    const result = [];
    const recursiveSearch = (obj = {}) => {
        if (!obj || typeof obj !== "object") {
            return;
        }
        if (obj[key] === value) {
            result.push(obj);
        }
        Object.keys(obj).forEach(function(k) {
            recursiveSearch(obj[k]);
        });
    };
    recursiveSearch(obj);
    return result;
};

const sesi = (from, data) => {
    if (!data[from]) return false;
    return data[from];
};

const playerOnGame = (sender, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length === 0) {
        return index;
    } else {
        index = true;
    }
    return index;
};

const playerOnRoom = (sender, from, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length > 0 && result[0].sesi === from) {
        index = true;
    } else {
        return index;
    }
    return index;
};

const dataPlayer = (sender, data) => {
    let result = findObject(data, "id", sender);
    let index = false;
    if (result.length > 0 && result[0].id === sender) {
        index = result[0];
    } else {
        return index;
    }
    return index;
};

const dataPlayerById = (id, data) => {
    let result = findObject(data, "number", id);
    let index = false;
    if (result.length > 0 && result[0].number === id) {
        index = result[0];
    } else {
        return index;
    }
    return index;
};

const playerExit = (from, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const indexPlayer = room.player.findIndex((i) => i.id === id);
    room.player.splice(indexPlayer, 1);
};

const getPlayerById = (from, sender, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const indexPlayer = room.player.findIndex((i) => i.number === id);
    if (indexPlayer === -1) return false;
    return {
        index: indexPlayer,
        sesi: room.player[indexPlayer].sesi,
        db: room.player[indexPlayer],
    };
};

const getPlayerById2 = (sender, id, data) => {
    let result = findObject(data, "id", sender);
    if (result.length > 0 && result[0].id === sender) {
        let from = result[0].sesi;
        room = sesi(from, data);
        if (!room) return false;
        const indexPlayer = room.player.findIndex((i) => i.number === id);
        if (indexPlayer === -1) return false;
        return {
            index: indexPlayer,
            sesi: room.player[indexPlayer].sesi,
            db: room.player[indexPlayer],
        };
    }
};

// keimi kill
const killKeimi = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    if (data[sesi].player[index].number === id) {
        if (db.effect.includes("vengtu")) {
            data[sesi].vengtu.push(parseInt(id));
            data[sesi].dead.push(parseInt(id));
        } else if (!db.effect.includes("vengtu")) {
            data[sesi].dead.push(parseInt(id));
        }
    }
};

// zawlnei dreamy
const dreamySeer = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    if (data[sesi].player[index].role === "keimi") {
        data[sesi].zawlnei = true;
    }
    return data[sesi].player[index].role;
};

// zawlnei dreamy
const dawithiam = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    return data[sesi].player[index].role;
};

// vengtu protect
const protectGuardian = (sender, id, data) => {
    let result = getPlayerById2(sender, id, data);
    if (!result) return false;
    let {
        index,
        sesi,
        db
    } = result;
    data[sesi].player[index].effect.push("vengtu");
};

// random role
const roleShuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};

const roleChanger = (from, id, role, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var index = room.player.findIndex((i) => i.id === id);
    if (index === -1) return false;
    room.player[index].role = role;
};


const roleAmount = (from, data) => {
    const result = sesi(from, data);
    if (!result) return false;
    if (result.player.length == 4) {
        return {
            keimi: 1,
            zawlnei: 1,
            vengtu: 1,
            mihring: 1,
            dawithiam: 0,
        };
    } else if (result.player.length == 5) {
        return {
            keimi: 1,
            zawlnei: 1,
            vengtu: 1,
            mihring: 3,
            dawithiam: 0,
        };
    } else if (result.player.length == 6) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 2,
            dawithiam: 0,
        };
    } else if (result.player.length == 7) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 3,
            dawithiam: 0,
        };
    } else if (result.player.length == 8) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 4,
            dawithiam: 0,
        };
    } else if (result.player.length == 9) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 4,
            dawithiam: 1,
        };
    } else if (result.player.length == 10) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 5,
            dawithiam: 1,
        };
    } else if (result.player.length == 11) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 2,
            mihring: 5,
            dawithiam: 1,
        };
    } else if (result.player.length == 12) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 2,
            mihring: 6,
            dawithiam: 1,
        };
    } else if (result.player.length == 13) {
        return {
            keimi: 2,
            zawlnei: 1,
            vengtu: 1,
            mihring: 7,
            dawithiam: 1,
        };
    } else if (result.player.length == 14) {
        return {
            keimi: 2,
            zawlnei: 2,
            vengtu: 2,
            mihring: 7,
            dawithiam: 1,
        };
    } else if (result.player.length == 15) {
        return {
            keimi: 3,
            zawlnei: 2,
            vengtu: 3,
            mihring: 6,
            dawithiam: 1,
        };
    }
};

const roleGenerator = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var role = roleAmount(from, data);
    for (var i = 0; i < role.keimi; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "keimi", data);
    }
    for (var i = 0; i < role.zawlnei; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "zawlnei", data);
    }
    for (var i = 0; i < role.vengtu; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "vengtu", data);
    }
    for (var i = 0; i < role.mihring; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "mihring", data);
    }
    for (var i = 0; i < role.dawithiam; i++) {
        var player = room.player.filter((x) => x.role === false);
        var list = roleShuffle(player);
        if (list.length === 0) return false;
        var random = Math.floor(Math.random() * list.length);
        roleChanger(from, list[random].id, "dawithiam", data);
    }
    shortPlayer(from, data);
};

// add cooldown
const addTimer = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.cooldown = Date.now() + toMs(90 + "s");
};

const startGame = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.status = true;
};

const changeDay = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    if (room.time === "zinglam") {
        room.time = "voting";
    } else if (room.time === "tlailam") {
        room.time = "zinglam";
        room.day += 1;
    } else if (room.time === "voting") {
        room.time = "tlailam";
    }
};

const dayVoting = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    if (room.time === "tlailam") {
        room.time = "voting";
    } else if (room.time === "zinglam") {
        room.time = "voting";
    }
};

const vote = (from, id, sender, data) => {
    room = sesi(from, data);
    if (!room) return false;
    const idGet = room.player.findIndex((i) => i.id === sender);
    if (idGet === -1) return false;
    const indexPlayer = room.player.findIndex((i) => i.number === id);
    if (indexPlayer === -1) return false;
    if (idGet !== -1) {
        room.player[idGet].isvote = true;
    }
    room.player[indexPlayer].vote += 1;
};

const voteResult = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => (a.vote < b.vote ? 1 : -1));
    if (room.player[0].vote === 0) return 0;
    if (room.player[0].vote === room.player[1].vote) return 1;
    return room.player[0];
};

const voteKill = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => (a.vote < b.vote ? 1 : -1));
    if (room.player[0].vote === 0) return 0;
    if (room.player[0].vote === room.player[1].vote) return 1;
    room.player[0].isdead = true;
};


const resetVote = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].vote = 0;
    }
};

const voteDone = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.voting = false;
};

const voteStart = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.voting = true;
};

// clear vote
const clearAllVote = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].vote = 0;
        room.player[i].isvote = false;
    }
};

// clearAll
const clearAll = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.dead = [];
    room.zawlnei = false;
    room.vengtu = [];
    room.voting = false;
};

// clear all status player
const clearAllSTATUS = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].effect = [];
    }
};

const skillOn = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].status = false;
    }
};

const skillOff = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let i = 0; i < room.player.length; i++) {
        room.player[i].status = true;
    }
};

const playerHidup = (data) => {
    const rahchhuah = data.player.filter((x) => x.isdead === false);
    return rahchhuah.length;
};

const playerMati = (data) => {
    const rahchhuah = data.player.filter((x) => x.isdead === true);
    return rahchhuah.length;
};

// get player win
const getWinner = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    var kmi = 0;
    var mifel_lam = 0;
    for (let i = 0; i < room.player.length; i++) {
        if (room.player[i].isdead === false) {
            if (
                room.player[i].role === "keimi" ||
                room.player[i].role === "dawithiam"
            ) {
                kmi += 1;
            } else if (
                room.player[i].role === "mihring" ||
                room.player[i].role === "vengtu" ||
                room.player[i].role === "zawlnei"
            ) {
                mifel_lam += 1;
            }
        }
    }
    if (room.voting) {
        b = voteResult(from, data);
        if (b != 0 && b != 1) {
            if (b.role === "keimi" || b.role === "dawithiam") {
                kmi -= 1;
            } else if (
                b.role === "mihring" ||
                b.role === "zawlnei" ||
                b.role === "vengtu"
            ) {
                mifel_lam -= 1;
            }
        }
    }
    if (kmi === 0) {
        room.iswin = true;
        return {
            voting: room.voting,
            status: true
        };
    } else if (kmi === mifel_lam) {
        room.iswin = false;
        return {
            voting: room.voting,
            status: false
        };
    } else if (mifel_lam === 0) {
        room.iswin = false;
        return {
            voting: room.voting,
            status: false
        };
    } else {
        return {
            voting: room.voting,
            status: null
        };
    }
};

// shorting
const shortPlayer = (from, data) => {
    room = sesi(from, data);
    if (!room) return false;
    room.player.sort((a, b) => a.number - b.number);
};

// keimi killing
const killkmi = (from, id, data) => {
    room = sesi(from, data);
    if (!room) return false;
    for (let j = 0; j < room.dead.length; j++) {
        idd = getPlayerById(from, room.player[0].id, room.dead[j], data);
        if (!idd) return false;
        if (room.player[idd.index].effect.includes("vengtu")) return;
        room.player[idd.index].isdead = true;
    }
};

const zinglami = (data) => {
    if (data.dead.length < 1) {
        return `*⌂ K E I M I - G A M E*\n\nNi a lo chhuak ta, nizanah thi leh hliam an awm lo, Mihring chu a nunphung pangngaiah a kir leh ta.\nmihringte second 90 chhung titi hun an hmang dawn\n*Day ${data.day}*`;
    } else {
        a = "";
        d = "";
        e = [];
        f = [];
        for (let i = 0; i < data.dead.length; i++) {
            b = data.player.findIndex((x) => x.number === data.dead[i]);
            if (data.player[b].effect.includes("vengtu")) {
                e.push(data.player[b].id);
            } else {
                f.push(data.player[b].id);
            }
        }
        for (let i = 0; i < f.length; i++) {
            if (i === f.length - 1) {
                if (f.length > 1) {
                    a += ` leh @${f[i].replace("@s.whatsapp.net", "")}`;
                } else {
                    a += `@${f[i].replace("@s.whatsapp.net", "")}`;
                }
            } else if (i === f.length - 2) {
                a += `@${f[i].replace("@s.whatsapp.net", "")}`;
            } else {
                a += `@${f[i].replace("@s.whatsapp.net", "")}, `;
            }
        }
        for (let i = 0; i < e.length; i++) {
            if (i === e.length - 1) {
                if (e.length > 1) {
                    d += ` leh @${e[i].replace("@s.whatsapp.net", "")}`;
                } else {
                    d += `@${e[i].replace("@s.whatsapp.net", "")}`;
                }
            } else if (i === e.length - 2) {
                d += `@${e[i].replace("@s.whatsapp.net", "")}`;
            } else {
                d += `@${e[i].replace("@s.whatsapp.net", "")}, `;
            }
        }
        thuziak = `*⌂ K E I M I - G A M E*\n\nZing lam a ni a, khuaah mihring an awm bawk a mahse mitthi ${
      data.dead.length > 1 ? "zat" : "1"
    } kan nei tlat mai kan mitthi chu ${a ? a + " a ni!!😭" : ""}${
      d.length > 1
        ? ` ${d} vel that tawh, mahse *vengtu* hian a lo veng a ni.`
        : ""
    }\n\nKar lovah chawhnu lam a lo ni leh ta-a, ni chu van zawlah a lo ding ta tauh mai, ni lum tak chuan boruak chu a ti tang at mai a, mihringte chuan second 90 chhung titi na hun an nei\n*Day ${
      data.day
    }*`;
        return thuziak;
    }
};

async function zinglam(HBWABotMz, x, data) {
    skillOff(x.room, data)
    let ment = [];
    for (let i = 0; i < x.player.length; i++) {
        ment.push(x.player[i].id);
    }
    shortPlayer(x.room, data);
    killkmi(x.room, x.dead, data);
    shortPlayer(x.room, data);
    changeDay(x.room, data);
    return await HBWABotMz.sendMessage(x.room, {
        text: zinglami(x),
        contextInfo: {
            externalAdReply: {
                title: "K E I M I",
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnail: thumb1,
                sourceUrl: "",
                mediaUrl: thumb1,
            },
            mentionedJid: ment,
        },
    });
}

async function voting(HBWABotMz, x, data) {
    let row = [];
    let ment = [];
    voteStart(x.room, data)
    thuziak =
        "*⌂ K E I M I - G A M E*\n\nUnau hmel hai hun a ni tawh a. Mi zawng zawng chu khawchhung hall-ah an pungkhawm a, tu nge an zinga keimi chu tih an vote dawn a ni. Mi thenkhat chu zanin atan an hmanrua tur buatsaihin an buai hle. Second 90 i thlang thei ang! Fimkhur rawh, in zingah hian phatsantu an awm!\n\n*L I S T - P L A Y E R*:\n";
    shortPlayer(x.room, data);
    for (let i = 0; i < x.player.length; i++) {
        thuziak += `(${x.player[i].number}) @${x.player[i].id.replace(
      "@s.whatsapp.net",
      ""
    )} ${x.player[i].isdead === true ? "☠️" : ""}\n`;
        ment.push(x.player[i].id);
    }
    thuziak += "\nplayer vote thlak nan */kmi vote number* tih type rawh";
    dayVoting(x.room, data);
    clearAll(x.room, data);
    clearAllSTATUS(x.room, data);
    return await HBWABotMz.sendMessage(x.room, {
        text: thuziak,
        contextInfo: {
            externalAdReply: {
                title: "K E I M I",
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnail: thumb2,
                sourceUrl: "",
                mediaUrl: thumb2,
            },
            mentionedJid: ment,
        },
    });
}

async function tlailam(HBWABotMz, x, data) {
    var mipui_vote = voteResult(x.room, data);
    if (mipui_vote === 0) {
        thuziak = `*⌂ K E I M I - G A M E*\n\nThutlukna siam a harsa hle. Mihring pawh an chenna in lamah an kir leh ta a, Nizan khan tumah tihhlum an ni lo. Thla chu a eng chhuak a, zan ṭihbaiawm tak chu a lo thleng ta. Zanin hian tumah an thih loh beisei. Zan lama player te: acting atan second 90 hun in nei!`;
        return HBWABotMz
            .sendMessage(x.room, {
                text: thuziak,
                contextInfo: {
                    externalAdReply: {
                        title: "K E I M I",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: thumb3,
                        sourceUrl: "",
                        mediaUrl: thumb3,
                    },
                },
            })
            .then(() => {
                changeDay(x.room, data);
                voteDone(x.room, data);
                resetVote(x.room, data);
                clearAllVote(x.room, data);
                if (getWinner(x.room, data).status != null)
                    return win(x, 1, HBWABotMz, data);
            });
    } else if (mipui_vote === 1) {
        thuziak = `*⌂ K E I M I - G A M E*\n\nVillage council chuan vote an thlak tawh a, mahse result chu draw a ni.\n\nZanin hian arsi te hian êng mawi tak an rawn chhuah a, khaw mipuite chu anmahni chenna inah an chawl a ni. Zan lama player te: acting atan second 90 hun in nei!`;
        return HBWABotMz
            .sendMessage(x.room, {
                text: thuziak,
                contextInfo: {
                    externalAdReply: {
                        title: "K E I M I",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: thumb3,
                        sourceUrl: "",
                        mediaUrl: thumb3,
                    },
                },
            })
            .then(() => {
                changeDay(x.room, data);
                voteDone(x.room, data);
                resetVote(x.room, data);
                clearAllVote(x.room, data);
                if (getWinner(x.room, data).status != null)
                    return win(x, 1, HBWABotMz, data);
            });
    } else if (mipui_vote != 0 && mipui_vote != 1) {
        if (mipui_vote.role === "keimi") {
            thuziak = `*⌂ K E I M I - G A M E*\n\nVillage council rorelna chuan he mi @${mipui_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} hi tihhlum turin rem a ti a ni\n\n@${mipui_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} hi ${mipui_vote.role} ${emoji_role(mipui_vote.role)} a ni`;
            voteKill(x.room, data);
            let ment = [];
            ment.push(mipui_vote.id);
            return await HBWABotMz
                .sendMessage(x.room, {
                    text: thuziak,
                    contextInfo: {
                        externalAdReply: {
                            title: "K E I M I",
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: thumb4,
                            sourceUrl: "",
                            mediaUrl: thumb4,
                        },
                        mentionedJid: ment,
                    },
                })
                .then(() => {
                    changeDay(x.room, data);
                    voteDone(x.room, data);
                    resetVote(x.room, data);
                    clearAllVote(x.room, data);
                    if (getWinner(x.room, data).status != null)
                        return win(x, 1, HBWABotMz, data);
                });
        } else {
            thuziak = `*⌂ K E I M I - G A M E*\n\nVillage council rorelna chuan he mi @${mipui_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} hi tihhlum turin rem a ti a ni\n\n@${mipui_vote.id.replace(
        "@s.whatsapp.net",
        ""
      )} hi ${mipui_vote.role} ${emoji_role(
        mipui_vote.role
      )}\n\nZanin hian thla a eng a, khaw mipuite chu an chenna inah an chawl a. Zan lama player te: acting atan second 90 in nei!`;
            voteKill(x.room, data);
            let ment = [];
            ment.push(mipui_vote.id);
            return await HBWABotMz
                .sendMessage(x.room, {
                    text: thuziak,
                    contextInfo: {
                        externalAdReply: {
                            title: "K E I M I",
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            thumbnail: thumb4,
                            sourceUrl: "",
                            mediaUrl: thumb4,
                        },
                        mentionedJid: ment,
                    },
                })
                .then(() => {
                    changeDay(x.room, data);
                    voteDone(x.room, data);
                    resetVote(x.room, data);
                    clearAllVote(x.room, data);
                    if (getWinner(x.room, data).status != null)
                        return win(x, 1, HBWABotMz, data);
                });
        }
    }
}

async function skill(HBWABotMz, x, data) {
    skillOn(x.room, data)
    if (getWinner(x.room, data).status != null || x.win != null) {
        return win(x, 1, HBWABotMz, data);
    } else {
        if (!x) return;
        if (!x.player) return;
        if (x.win != null) return;
        let tok1 = "\n";
        let tok2 = "\n";
        let members = [];
        shortPlayer(x.room, data);
        for (let i = 0; i < x.player.length; i++) {
            tok1 += `(${x.player[i].number}) @${x.player[i].id.replace(
        "@s.whatsapp.net",
        ""
      )}${x.player[i].isdead === true ? " ☠️" : ""}\n`;
            members.push(x.player[i].id);
        }
        for (let i = 0; i < x.player.length; i++) {
            tok2 += `(${x.player[i].number}) @${x.player[i].id.replace(
        "@s.whatsapp.net",
        ""
      )} ${
        x.player[i].role === "keimi" || x.player[i].role === "dawithiam"
          ? `${x.player[i].isdead === true ? ` ☠️` : ` ${x.player[i].role}`}`
          : " "
      }\n`;
            members.push(x.player[i].id);
        }
        for (let i = 0; i < x.player.length; i++) {
            if (x.player[i].role === "keimi") {
                if (x.player[i].isdead != true) {
                    thuziak = `Zanin hian i seh tur pakhat thlang rawh.\n*LIST PLAYER*:\n${tok2}\n\nPlayer thah nan */kmipc kill <number>* tih type la`;

                    await HBWABotMz.sendMessage(x.player[i].id, {
                        text: thuziak,
                        mentions: members,
                    });
                }
            } else if (x.player[i].role === "mihring") {
                if (x.player[i].isdead != true) {
                    thuziak = `*⌂ K E I M I - G A M E*\n\nMihring angin fimkhur rawh, a target leh tur chu nangmah i ni mai thei.\n*LIST PLAYER*:${tok1}`;
                    await HBWABotMz.sendMessage(x.player[i].id, {
                        text: thuziak,
                        mentions: members,
                    });
                }
            } else if (x.player[i].role === "zawlnei") {
                if (x.player[i].isdead != true) {
                    thuziak = `Okay, tun ṭumah hian tu role nge hmuh i duh.\n*LIST PLAYER*:${tok1}\n\nRole player hmuh theih nan *.kmipc dreamy number* type rawh`;

                    await HBWABotMz.sendMessage(x.player[i].id, {
                        text: thuziak,
                        mentions: members,
                    });
                }
            } else if (x.player[i].role === "vengtu") {
                if (x.player[i].isdead != true) {
                    thuziak = `*Vengtu* i ni a, mihringte i veng dawn a ni, i ven tur player te zinga pakhat thlang chhuak rawh\n*PLAYER-TE*:${tok1}\n\n*/kmipc deff <number>* i type anga i veng him ang`;

                    await HBWABotMz.sendMessage(x.player[i].id, {
                        text: thuziak,
                        mentions: members,
                    });
                }
            } else if (x.player[i].role === "dawithiam") {
                if (x.player[i].isdead != true) {
                    thuziak = `Okay, i tih theih chu en la, a identity i puan duh mi 1 thlang rawh\n*LIST PLAYER*:${tok2}\n\nRole player i hmuh theih nan */kmipc dawithiam <number>* type rawh`;

                    await HBWABotMz.sendMessage(x.player[i].id, {
                        text: thuziak,
                        mentions: members,
                    });
                }
            }
        }
    }
}

async function win(x, t, HBWABotMz, data) {
    const session = x.room;
    if (getWinner(x.room, data).status === false || x.iswin === false) {
        thuziak = `*K E I M I - W I N*\n\nTEAM KEIMI\n\n`;
        let ment = [];
        for (let i = 0; i < x.player.length; i++) {
            if (x.player[i].role === "dawithiam" || x.player[i].role === "keimi") {
                thuziak += `${x.player[i].number}) @${x.player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )}\n     *Role* : ${x.player[i].role}\n\n`;
                ment.push(x.player[i].id);
            }
        }
        return await HBWABotMz
            .sendMessage(session, {
                text: thuziak,
                contextInfo: {
                    externalAdReply: {
                        title: "K E I M I",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: thumb5,
                        sourceUrl: "",
                        mediaUrl: thumb5,
                    },
                    mentionedJid: ment,
                },
            })
            .then(() => {
                delete data[x.room];
            });
    } else if (getWinner(x.room, data).status === true) {
        thuziak = `*T E A M - M I H R I N G - W I N*\n\nTEAM MIHRING\n\n`;
        let ment = [];
        for (let i = 0; i < x.player.length; i++) {
            if (
                x.player[i].role === "mihring" ||
                x.player[i].role === "vengtu" ||
                x.player[i].role === "zawlnei"
            ) {
                thuziak += `${x.player[i].number}) @${x.player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )}\n     *Role* : ${x.player[i].role}\n\n`;
                ment.push(x.player[i].id);
            }
        }
        return await HBWABotMz.sendMessage(session, {
            text: thuziak,
            contextInfo: {
                externalAdReply: {
                    title: "K E I M I",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnail: thumb6,
                    sourceUrl: "",
                    mediaUrl: thumb5,
                },
                mentionedJid: ment,
            },
        });
    }
}

// playing
async function run(HBWABotMz, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await zinglam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await voting(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await tlailam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await skill(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, HBWABotMz, data);
}

async function run_vote(HBWABotMz, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await voting(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await tlailam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await skill(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await zinglam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, HBWABotMz, data);
}

async function run_tlailam(HBWABotMz, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await skill(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await zinglam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await voting(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await tlailam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, HBWABotMz, data);
}

async function run_zinglam(HBWABotMz, id, data) {
    while (getWinner(id, data).status === null) {
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await zinglam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await voting(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await tlailam(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await skill(HBWABotMz, sesi(id, data), data);
        }
        if (getWinner(id, data).status != null) {
            win(getWinner(id, data), 1, HBWABotMz, data);
            break;
        } else {
            await sleep(90000);
        }
        if (getWinner(id, data).status != null) break;
    }
    await win(sesi(id, data), 1, HBWABotMz, data);
}

module.exports = {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killKeimi,
    killkmi,
    dreamySeer,
    dawithiam,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    zinglam,
    tlailam,
    skill,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_tlailam,
    run_zinglam,
};