/*
Garmoth.bot

Author: Doylan Mihov
Version: 1.1.1
Date: 1/9/22
*/
import db from "./db.js";

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
import dotenv from "dotenv";
dotenv.config();

// Storage of roles and their IDs.
let regionIDs = [
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

let subscriptionIDs = [
	["APPRENTICE", process.env.APPRENTICE],
	["PROFESSIONAL", process.env.PROFESSIONAL],
	["ARTISAN", process.env.ARTISAN],
	["MASTER", process.env.MASTER],
];

let region;
// Function that returns the discord user's region.
const getRegion = (id) => {
	// const userRegion = await axios
	//   .get(`https://garmoth.com/api/GetUserInfo/${id}`)
	//   .then((res) => res.data.region);
	// return userRegion.toUpperCase();

	db.query(
		"SELECT region FROM users WHERE discordId = " + id,
		(err, result) => {
			if (err) throw err;
			console.log(result);
			if (result.length) {
				region = result[0].region.toUpperCase();
			} else {
				region = null;
			}
		}
	);

	return region;
};

// Function that returns the specified role's ID.
const findRoleID = (nameOfRole, whichIDs) => {
	let roleID = "";

	whichIDs.forEach((region) => {
		if (nameOfRole === region[0]) {
			roleID = region[1];
		}
	});
	return roleID;
};

// Function that slows down async functions.
const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function that updates all users region role.
const allMembersRoleUpdate = async () => {
	const guild = client.guilds.cache.get(process.env.SERVER_ID);
	const members = await guild.members.fetch();

	for (let member of members) {
		member = member[1];

		await sleep(2000);
		if (member.user.bot === false) {
			let nameOfRole = getRegion(member.user.id);
			if (nameOfRole) {
				let roleID = findRoleID(nameOfRole, regionIDs);

				try {
					member.roles.add(roleID);
				} catch (e) {}
			}
		}
	}
};

// Function that updates users with their new region role.
const changedRegionUpdate = async () => {
	const guild = client.guilds.cache.get(process.env.SERVER_ID);
	const members = await guild.members.fetch();

	for (let member of members) {
		member = member[1];

		await sleep(2000);
		if (member.user.bot === false) {
			let nameOfCurrentRole = "";

			regionIDs.forEach((id) => {
				if (member.roles.cache.has(id[1])) {
					nameOfCurrentRole = id[0];
				}
			});

			let nameOfNewRole = getRegion(member.user.id);

			if (nameOfCurrentRole != nameOfNewRole) {
				if (nameOfNewRole) {
					let currentRoleID = findRoleID(nameOfCurrentRole, regionIDs);
					let newRoleID = findRoleID(nameOfNewRole, regionIDs);

					try {
						member.roles.remove(currentRoleID);
						member.roles.add(newRoleID);
					} catch (e) {}
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
	return arrOfCodes;
};

// Cron job that executes function every 30 minutes.
let job = new cron.CronJob("*/30 * * * *", async () => {
	let codes = await getCoupon();
	codes.forEach((code) => {
		client.channels.cache.get(process.env.CHANNEL_ID).send(code);
	});
});

let subscription;

const getSubscription = (id) => {
	db.query(
		"SELECT subscription FROM users WHERE discordId = " + id,
		(err, result) => {
			if (err) throw err;

			if (result.length) {
				subscription = result[0].subscription.toUpperCase();
			} else {
				subscription = null;
			}
		}
	);

	return subscription;
};

// Function that updates all users subscription role.
const allMembersSubscriptionUpdate = async () => {
	const guild = client.guilds.cache.get(process.env.SERVER_ID);
	const members = await guild.members.fetch();

	for (let member of members) {
		member = member[1];

		await sleep(2000);
		if (member.user.bot === false) {
			let nameOfRole = getSubscription(member.user.id);
			if (nameOfRole) {
				let roleID = findRoleID(nameOfRole, subscriptionIDs);

				try {
					member.roles.add(roleID);
				} catch (e) {}
			}
		}
	}
};

const subscriptionUpdate = async () => {
	const guild = client.guilds.cache.get(process.env.SERVER_ID);
	const members = await guild.members.fetch();

	for (let member of members) {
		member = member[1];

		await sleep(2000);
		if (member.user.bot === false) {
			let nameOfCurrentRole = "";

			subscriptionIDs.forEach((id) => {
				if (member.roles.cache.has(id[1])) {
					nameOfCurrentRole = id[0];
				}
			});

			let nameOfNewRole = getSubscription(member.user.id);

			if (nameOfCurrentRole != nameOfNewRole) {
				if (nameOfNewRole) {
					let currentRoleID = findRoleID(nameOfCurrentRole, subscriptionIDs);
					let newRoleID = findRoleID(nameOfNewRole, subscriptionIDs);

					try {
						member.roles.remove(currentRoleID);
						member.roles.add(newRoleID);
					} catch (e) {}
				}
			}
		}
	}
};

// Event handler for when the bot initially activates.
client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Event handler for when a discord user joins the server.
client.on("guildMemberAdd", async (member) => {
	let regionRole = await getRegion(member.user.id);
	let regionRoleID = findRoleID(nameOfRole, roleID);

	let subscriptionRole = await getSubscription(member.user.id);
	let subscriptionRoleID = findRoleID(subscriptionRole, subscriptionIDs);

	let findRegionRole =
		member.guild.roles.cache.find((role) => role.name === regionRole) ||
		(await member.guild.roles.fetch(regionRoleID));
	try {
		member.roles.add(findRegionRole);
	} catch (e) {}

	let findSubscriptionRole =
		member.guild.roles.cache.find((role) => role.name === subscriptionRole) ||
		(await member.guild.roles.fetch(subscriptionRoleID));
	try {
		member.roles.add(findSubscriptionRole);
	} catch (e) {}
});

// Event handler for when a message is created in the server.
client.on("messageCreate", async (message) => {
	// Put desired keyword for bot to execute function that updates region roles.
	if (message.content === "!regionCheck") {
		allMembersRoleUpdate();
		message.channel.send(
			"Full iteration of region role adding status: <UPDATING>"
		);
	}

	// Put desired keyword for bot to execute function that updates to new region roles.
	if (message.content === "!updateRegion") {
		changedRegionUpdate();
		message.channel.send(
			"Iteration through users with changed regions status: <UPDATING>"
		);
	}

  if (message.content === "!subscriptionCheck") {
		allMembersSubscriptionUpdate();
		message.channel.send(
			"Full iteration of subscription role adding status: <UPDATING>"
		);
	}

	// Put desired keyword for bot to execute function that updates subscription roles.
	if (message.content === "!updateSubscription") {
		subscriptionUpdate();
		message.channel.send(
			"Iteration through users with changed subscription status: <UPDATING>"
		);
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
