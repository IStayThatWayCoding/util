module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("the snow!", {
      type: "WATCHING"
//       url: "https://www.twitch.tv/istaythatway"
    });
}
