// const { createBot } = require('whatsapp-cloud-api');
import { createBot } from "whatsapp-cloud-api";
import { StateMachine } from "./stateMachine";
import process from "process";

// Environment variables
import dotenv from "dotenv";
dotenv.config();
// const StateMachine = require("./stateMachine");
let botReadyTimestamp;

const start = async () => {
    try {
        const stateMachine = new StateMachine();
        const from = process.env.WHATSAPPID;
        const token = process.env.WHATSAPPTOKEN;
        const webhookVerifyToken = process.env.WEBHOOKTOKEN;

        console.log("####from: ", from, "\ntoken: ", token, "\nwebhookToken ", webhookVerifyToken);
        // Create a bot that can send messages
        const bot = createBot(from, token);
        // await bot.sendTemplate(to, "hello_world", "en_us")
        // Send text message
        // await bot.sendTemplate(to, "hello_world", "en_us");
        // await bot.sendTemplate(to1, "hello_world", "en_us");

        // Start express server to listen for incoming messages
        // NOTE: See below under `Documentation/Tutorial` to learn how
        // you can verify the webhook URL and make the server publicly available
        await bot.startExpressServer({
            port: 3000,
            webhookVerifyToken,
        });



        botReadyTimestamp = new Date();
        console.log("####BotReadyTimeStamp: ", botReadyTimestamp);
        // Listen to ALL incoming messages
        // NOTE: remember to always run: await bot.startExpressServer() first
        bot.on('message', async (msg) => {
            const response = await stateMachine.processInput(msg);
            console.log("####response: ", response.bodyText);
            if (response.bodyText != "messageIgnored") {
                if (!response.buttons) {
                    await bot.sendText(msg.from, response.bodyText);
                } else {
                    await bot.sendReplyButtons(msg.from, response.bodyText, response.buttons);
                }
            }
        });

    } catch (err) {
        console.log("Server setup Failed, Error: ", err);
    }
};

start();

export { botReadyTimestamp };

// TODO try all whatsapp api's. For future purpose.
// Learn about single and multi instance clusters. PubSub. Basically how multiple concurrent requests will be handled.
// Distributed Systems



// TODO add feature to reset context after every 10 minutes of inactivity. 