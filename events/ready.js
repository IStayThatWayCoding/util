module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("some christmas music!", {
      type: "LISTENING"
//       url: "https://www.twitch.tv/istaythatway"
    });
}
