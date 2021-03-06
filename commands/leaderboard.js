import { RichEmbed } from "@guildedjs/guilded.js";
import { getSupply, getUsers, parseDecimals, insertionSort, getIDFromBalance } from "../util/economy-blockchain.js";
import config from "../data/config.json";
const { coinName, ticker } = config;

export const name = "leaderboard";
export const description = "Get the global leaderboard.";
export const aliases = ["lb"]

export const execute = (message, args) => {
    message.channel.send(getLeaderboard());
};

const getLeaderboard = () => {
    let users = getUsers();
    var count = Object.keys(users.accounts).length;

    let supply = getSupply();
    let balArray = [];

    for (let i = 0; i < count; i++) {
        balArray.push(parseDecimals(users.accounts[i].balance))
    }
    insertionSort(balArray)

    const leaderboardEmbed = new RichEmbed()
        .setColor('0xf1c40f')
        .setTitle(`${coinName} (${ticker})`)
        //.setURL('')
        //.setAuthor('Santeeisweird9')
        .setDescription(`The rich list of ${coinName}!`)
        //.setThumbnail('')
        //.addField('', '', true)
        //.setImage('')
        .setTimestamp()
        .setFooter(`${name} (${ticker})`, ''); // TODO: set url as second arg

        for (let i = 0; i < count; i++) {
            leaderboardEmbed.addFields(
                { 
                    name: `${getIDFromBalance(balArray[i])}`, 
                    value: `${balArray[i]} ${ticker} (${parseDecimals((balArray[i] / supply)*100)}% of supply)` 
                }
            )
        }
    return leaderboardEmbed;
}