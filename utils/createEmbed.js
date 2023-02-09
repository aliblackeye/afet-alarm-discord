const createEmbed = () => {
  return {
    color: 0xfcd535,
    title: "📢 Depreeeeeeemm 📢",
    url: "https://deprem.afad.gov.tr/last-earthquakes.html",
    author: {
      name: "Announcer",
      icon_url:
        "https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png",
      url: "https://discord.gg/ee5bnvshcE",
    },
    fields: [
      {
        name: `Deprem şiddeti: `,
        value: `Deprem konumu: `,
      },
    ],

    timestamp: new Date().toISOString(),
  };
};

module.exports = createEmbed;
