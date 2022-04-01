const app = require('express')();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
  fetch('https://commons.wikimedia.org/wiki/Special:Random/File').then(async (resp) => {
    const text = await resp.text();
    const $ = cheerio.load(text);

    const url = $('.fullMedia a.internal').attr('href');

    res.redirect(302, url);
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
