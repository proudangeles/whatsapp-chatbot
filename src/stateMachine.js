// const states = require("./states");
// const messages = require("./messages");
// const userContext = require("./userContext");

import states from "./states";
import messages from "./messages";
import userContext from "./userContext";
import { botReadyTimestamp } from "./index";

const resetConversationArr = ["menu", "reset"];
const salutationArr = ["hi", "hey", "hello"];

export class StateMachine {

    resetContext(phoneNumber) {
        console.log("####userContext: ", userContext);
        if (!userContext[phoneNumber]) {
            userContext[phoneNumber] = {
                currentStage: "stage_0"
            };
        } else {
            userContext[`${phoneNumber}`].currentStage = "stage_0";
        }
        console.log("####resetContext - userContext: ", userContext);
    }

    updateStage(phoneNumber, newStage) {
        userContext[`${phoneNumber}`].currentStage = newStage;
        console.log("####updateStage - userContext: ", userContext);
    }

    async processInput(input) {
        try {

            if (input.timestamp != null) {
                const messageTimestamp = new Date(input.timestamp * 1000);

                // If startTimestamp is null, the bot is not ready yet
                if (botReadyTimestamp == null) {
                    console.log("Ignoring message because bot is not ready yet:");
                    return { type: "text", bodyText: "messageIngored" };
                }

                // Ignore messages that are sent before the bot is started
                if (messageTimestamp < botReadyTimestamp) {
                    console.log("Ignoring old messages");
                    return { type: "text", bodyText: "messageIgnored" };
                }
                console.log("####messagetimestamp: ", messageTimestamp, " botReadyTimestamp: ", botReadyTimestamp);
            }

            let userMsg = input.type == "text" ? input.data.text : input.data.id;
            userMsg = userMsg.toLowerCase().replace(/\s/g, "");
            console.log("####userMsg: ", userMsg);


            if (!["text", "button_reply"].includes(input.type)) {
                this.resetContext(input.from);
                return messages.invalidInput;
            }

            if (salutationArr.includes(userMsg)) {
                this.resetContext(input.from);
                return messages.welcome;
            }

            if (resetConversationArr.includes(userMsg)) {
                this.resetContext(input.from);
                return messages.welcome;
            }

            const context = this.getUserContext(input.from);
            console.log("####context: ", context);
            if (!context.currentStage) {
                this.resetContext(input.from);
                return messages.welcome;
            }

            const optionIndex = states[`${context.currentStage}`].options.indexOf(userMsg);
            console.log("####optionIndex: ", optionIndex);

            if (optionIndex == -1) {
                this.resetContext(input.from);
                return messages.invalidInput;
            }

            const newStage = `${context.currentStage}_${optionIndex}`;
            console.log("####newstage: ", newStage);

            // update Stage
            this.updateStage(input.from, newStage);
            console.log("####userContext: ", userContext);
            return messages[`${newStage}`];
        } catch (err) {
            console.log("####Error: ", err);
            return messages.unhandledMessage;
        }
    }

    getUserContext(phoneNumber) {
        return userContext[phoneNumber];
    }
}
