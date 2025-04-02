import cron from 'node-cron';
import { makeAPicturePost, makeATextPost, makeATrendPicturePost, makeATrendPost, replyToMentions, replyToUsers } from "./makeAPost.js";
import { loadCharacterFromJson, sleep, wakeUp } from "./character.js";
import { readRandomNews } from "./newsFeedReader.js";
import { addMemory } from "./memory.js";

let character = loadCharacterFromJson("character.yaml")

let newsRssUrl = character.newsRssUrl
let moods = character.available_moods
const normalActions = {
    postATweet: {
        probability: process.env.PROBABILITY_POST_A_TWEET,
        callback: () => {
           let mood = moods[Math.floor(Math.random() * moods.length)];
           console.log(`I am ${mood}... let's make some post`);
           makeATextPost(character, mood)
        }
    },
    postATrendTweet: {
        probability: process.env.PROBABILITY_POST_A_TREND_TWEET,
        callback: () => {
           let mood = moods[Math.floor(Math.random() * moods.length)];
           console.log(`I am ${mood}... let's make some post`);
           makeATrendPost(character, mood)
        }
    },
    readSomeNews: {
        probability: process.env.PROBABILITY_NEWS,
        callback: () => {
            readRandomNews(newsRssUrl)
           
        }
    },
    doNothing: {
        probability: process.env.PROBABILITY_NOTHING,
        callback: () => {
            let action = "Doing nothing, just chillin'!" 
            console.log(action)
            addMemory(action)
        }
    },
    postAPicture: {
        probability: process.env.PROBABILITY_POST_A_PICTURE,
        callback: () => {
            let mood = moods[Math.floor(Math.random() * moods.length)];
            console.log(`I am ${mood}... let's make some art`);
            makeAPicturePost(character, mood)
        }
    },
    postATrendPicture: {
        probability: process.env.PROBABILITY_POST_A_TREND_PICTURE,
        callback: () => {
            let mood = moods[Math.floor(Math.random() * moods.length)];
            console.log(`I am ${mood}... let's make some art`);
            makeATrendPicturePost(character, mood)
        }
    },
};

const replyActions = {
    replyToMentions: {
        probability: process.env.PROBABILITY_REPLY_MENTIONS,
        callback: () => {
           let mood = moods[Math.floor(Math.random() * moods.length)];
           console.log(`I am ${mood}... let's reply to a mention post`);
           replyToMentions(character, mood)
        }
    },
    replyToUsers: {
        probability: process.env.PROBABILITY_REPLY_USERS,
        callback: () => {
           let mood = moods[Math.floor(Math.random() * moods.length)];
           console.log(`I am ${mood}... let's reply to a user post`);
           replyToUsers(character, mood)
        }
    }
}



const launchPost = () => {
    const actionPerMinute = character.actionPerMinute;
    let firstAction = normalActions.postATweet.callback;
    const actionEverySecondsNb = 3600;
    wakeUp(normalActions, firstAction, actionPerMinute, actionEverySecondsNb);
};

const launchReply = () => {
    const replyActionPerMinute = character.replyActionPerMinute;
    let firstReplyAction = replyActions.replyToUsers.callback;
    const replyActionEverySecondsNb = 1200;
    
    setTimeout(() => {
        wakeUp(replyActions, firstReplyAction, replyActionPerMinute, replyActionEverySecondsNb);
    }, 15 * 60 * 1000);
}

// cron.schedule('0 0 * * 0', async() => {
//     console.log("It's Sunday 00:00, time to create a poll!");
//     await createPoll();
// });

// cron.schedule('0 0 * * 1', async() => {
//     console.log("It's Monday 00:00, time to check poll results!");
//     await closePoll();
// });

const start = () => {
    if (process.env.POST_FEATURE === "true") {
        launchPost();
    }

    if (process.env.REPLY_FEATURE === "true") {
        launchReply();
    }
};

start();