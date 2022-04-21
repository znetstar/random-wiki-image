const app = require('express')();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
  (async () => {
    for (let i = 0; i < 50; i++) {
      try {
        const resp = await fetch('https://commons.wikimedia.org/wiki/Special:Random/File');
        const text = await resp.text();
        const $ = cheerio.load(text);

        const url = $('.fullMedia a.internal').attr('href');

        if (url.match(/\.(svg|jpg|png|)$/)) {
          res.redirect(302, url);
          break;
        }
      } catch (err) {
        console.error(err.stack);
        continue;
      }
    }
  })();
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
