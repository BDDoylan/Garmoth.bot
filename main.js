/*
Garmoth.bot

Author: Doylan Mihov
Version: 1.0.0
Date: 1/6/22
*/
import db from './db.js'

import Discord from "discord.js";
import axios from "axios";
import cron from "cron";

const client = new Discord.Client({
    intents: ["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS"],
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// Accessing .env
import dotenv from "dotenv"

dotenv.config()

// Storage of roles and their IDs.
let allIDs = [
    ["EU", process.env.EU],
    ["NA", process.env.NA],
    ["RU", process.env.RU],
    ["JP", process.env.JP],
    ["KR", process.env.KR],
    ["SEA", process.env.SEA],
    ["TW", process.env.TW],
    ["TH", process.env.TH],
    ["SA", process.env.SA],
    ["MENA", process.env.MENA],
    ["CONSOLE_EU", process.env.CONSOLE_EU],
    ["CONSOLE_NA", process.env.CONSOLE_NA],
    ["CONSOLE_ASIA", process.env.CONSOLE_ASIA],
];

let region = 'EU'

// Function that returns the discord user's region.
const getRegion = (id) => {
    // const userRegion = await axios
    //   .get(`https://garmoth.com/api/GetUserInfo/${id}`)
    //   .then((res) => res.data.region);
    // return userRegion.toUpperCase();

    db.query('SELECT region FROM users WHERE discordId = ' + id, (err, result) => {
        if (err) throw err;
        console.log(result)
        if (result.length) {
            region = result[0].region.toUpperCase()
        } else {
            region = null
        }
    });

    console.log(region)

    return region
};

// Function that returns the specified role's ID.
const findRoleID = (nameOfRole) => {
    let roleID = "";

    allIDs.forEach((region) => {
        if (nameOfRole === region[0]) {
            roleID = region[1];
        }
    });
    return roleID;
};

let count = 0

function sleep(ms) {
    count++
    console.log(count)
    return new Promise(resolve => setTimeout(resolve, ms))
}


// Function that updates all users region role.
const allMembersRoleUpdate = async () => {
    // Put desired guild ID in string.
    const guild = client.guilds.cache.get(process.env.SERVER_ID);
    const members = await guild.members.fetch()

    for (let member of members) {
        member = member[1]

        await sleep(2000)
        if (member.user.bot === false) {
            let nameOfRole = getRegion(member.user.id)

            if (nameOfRole) {
                let roleID = findRoleID(nameOfRole)

                try {
                    member.roles.add(roleID);
                } catch (e) {
                }
            }
        }
    }
};

// Function that returns coupon code.
const getCoupon = async () => {
    let arrOfCodes = [];
    await axios
        .get(`https://garmoth.com/api/getApiCouponSuggestions`)
        .then((res) => {
            res.data.forEach((data) => {
                arrOfCodes.push(data.code);
            });
        });
    //console.log(arrOfCodes);
    return arrOfCodes;
};

// Cron job that executes function every 30 minutes.
let job = new cron.CronJob("*/30 * * * *", async () => {
    let codes = await getCoupon();
    codes.forEach((code) => {
        client.channels.cache.get(process.env.CHANNEL_ID).send(code);
    });
});

// Event handler for when the bot initially activates.
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event handler for when a discord user joins the server.
client.on("guildMemberAdd", async (member) => {
    let nameOfRole = await getRegion(member.user.id);
    let roleID = findRoleID(nameOfRole);

    let findRole = member.guild.roles.cache.find((role) => role.name === nameOfRole) || (await member.guild.roles.fetch(roleID));
    try {
        member.roles.add(findRole);
    } catch (e) {
    }
});

// Event handler for when a message is created in the server.
client.on("messageCreate", async (message) => {
    // Put desired keyword for bot to execute function that updates region roles.
    if (message.content === "!check") {
        allMembersRoleUpdate();
        console.log("All of the members region role has been updated.");
    }

    // Put desired keyword for bot to execute function that starts cron job.
    if (message.content === "!start") {
        job.start();
        message.channel.send("Coupon check reminder status: <ACTIVE>");
    }

    // Put desired keyword for bot to execute function that stops cron job.
    if (message.content === "!stop") {
        job.stop();
        message.channel.send("Coupon check reminder status: <INACTIVE>");
    }
});

client.login(process.env.TOKEN);
