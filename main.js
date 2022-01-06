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
  ["EU", "928089549089931284"],
  ["NA", "928089670359842828"],
  ["RU", "928089700768575529"],
  ["JP", "928089751767105606"],
  ["KR", "928089768351379466"],
  ["SEA", "928089838832484352"],
  ["TW", "928089878347022376"],
  ["TH", "928089931895693342"],
  ["SA", "928089977038995526"],
  ["MENA", "928090064758640650"],
  ["CONSOLE_EU", "928090175433769041"],
  ["CONSOLE_NA", "928090277867049010"],
  ["CONSOLE_ASIA", "928090398679760989"],
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

// Function that updates all users region role.
const allMembersRoleUpdate = async () => {
  // Put desired guild ID in string.
  const guild = client.guilds.cache.get("928035405461331979");

  (await guild.members.fetch()).forEach(async (member) => {
    if (member.user.bot === false) {
      let nameOfRole = await getRegion(member.user.id);

      let roleID = findRoleID(nameOfRole);

      let findRole =
        member.guild.roles.cache.find((role) => role.name === nameOfRole) ||
        (await member.guild.roles.fetch(roleID));
      member.roles.add(findRole);
    }
  });
};

// Function that returns coupon code.
const getCoupon = async () => {
  const newCoupon = await axios.get(``).then((res) => res.data.coupon);
  return newCoupon.toUpperCase();
};

// Cron job that executes function every 30 minutes.
let job = new cron.CronJob("*/30 * * * *", () => {
  client.channels.get("928571417358909510").send(getCoupon());
});

// Event handler for when the bot initially activates.
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event handler for when a discord user joins the server.
client.on("guildMemberAdd", async (member) => {
  let nameOfRole = await getRegion(member.user.id);
  let roleID = findRoleID(nameOfRole);

  let findRole =
    member.guild.roles.cache.find((role) => role.name === nameOfRole) ||
    (await member.guild.roles.fetch(roleID));
  member.roles.add(findRole);
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
    message.channel.send("Coupon check reminder: Status <active>");
  }

  // Put desired keyword for bot to execute function that stops cron job.
  if (message.content === "!stop") {
    job.stop();
    message.channel.send("Coupon check reminder: Status <inactive>");
  }
});

client.login(process.env.TOKEN);
