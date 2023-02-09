const createEmbed = (subject, announcement_link, announcement_date) => {
  return {
    color: 0xfcd535,
    title: "📢 BINANCE NEWS 📢",
    url: announcement_link,
    author: {
      name: "Announcer",
      icon_url:
        "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png",
      url: "https://discord.gg/ee5bnvshcE",
    },
    fields: [
      {
        name: `Subject: ${subject}`,
        value: `: ${announcement_link}`,
      },
    ],

    timestamp: new Date().toISOString(),
  };
};

module.exports = createEmbed;
