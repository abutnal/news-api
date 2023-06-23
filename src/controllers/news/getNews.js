let news = {};
const axios = require('axios');
//get news-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
news.get_news = (data) => {
  let keyword = data.keyword
  if (keyword == '') {
    keyword = 'example'
  }
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://gnews.io/api/v4/search?q=${keyword}&lang=en&country=us&max=10&apikey=d35dbc406cdc61001e858a4cf7ebf632`,
      headers: {
        'Cookie': 'PHPSESSID=4ful5lctabphigl825dac6cn79'
      }
    };

    axios.request(config)
      .then((response) => {
        resolve(response.data)
        console.log();
      })
      .catch((error) => {
        reject(error)
      });


  });

};
module.exports = news;
