module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("with santa! ❄", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });
}
