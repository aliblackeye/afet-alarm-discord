const { Colors } = require("discord.js");

const createEarthquake = (tarih,derinlik,büyüklük,yer, announcement_link) => {
  return {
    color: Colors.Red,
    title: "📢 YENİ DEPREM 📢",
    url: announcement_link,
    author: {
      name: "AHS",
    },
    fields: [
      {
        name: `Depremin Konumu: ${yer}`,
        value: ``,
      },
      {
        name: `Depremin Büyüklüğü: ${büyüklük}`,
        value: ``,
      },
      {
        name: `Depremin Zamanı: ${tarih}`,
        value: ``,
      },
      {
        name: `Depremin Derinliği: ${derinlik}`,
        value: ``,
      },
    ],

    timestamp: new Date().toISOString(),
  };
};

module.exports = createEarthquake;
