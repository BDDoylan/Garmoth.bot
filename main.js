/*
Garmoth.bot

Author: Doylan Mihov
Version: 1.0.0
Date: 1/6/22
*/

const Discord = require("discord.js");
const axios = require("axios");
const cron = require("cron");
const client = new Discord.Client({
  intents: ["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS"],
});

// Accessing .env
require("dotenv").config();

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

// Function that returns the discord user's region.
const getRegion = async (id) => {
  const userRegion = await axios
    .get(`https://garmoth.com/api/GetUserInfo/${id}`)
    .then((res) => res.data.region);
  return userRegion.toUpperCase();
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Function that updates all users region role.
const allMembersRoleUpdate = async () => {
  // Put desired guild ID in string.
  const guild = client.guilds.cache.get(process.env.SERVER_ID);

  (await guild.members.fetch()).forEach(async (member) => {
    await sleep(200)
    if (member.user.bot === false) {
      let nameOfRole = await getRegion(member.user.id);

      let roleID = findRoleID(nameOfRole);

      let findRole =
        member.guild.roles.cache.find((role) => role.name === nameOfRole) ||
        (await member.guild.roles.fetch(roleID));
      try {
        member.roles.add(findRole);
      } catch (e) {}
    }
  });
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
  } catch (e) {}
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
