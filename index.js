const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio")
const app = express()
const port = 3000

async function haberler() {
let haberler = []
let response = await axios.get("https://www.milliyet.com.tr/son-dakika-haberleri/")
let data = response.data
const $ = cheerio.load(data);

for (let i = 0; i < 11; i++) {
const haber = $(`body > div.container.container--white > div > div.col-12.col-md-12.col-lg-8 > div.breaking-news-page.mt30 > div > div > div > div:nth-child(${i})`);
haber.each(function() {
    let title = $(this).find("strong")[0].children[0].data
    let title2 = $(this).find("strong")[1].children[0].data
    let link = $(this).find('a').attr('href')
    haberler.push({
        saat : title,
        haber : title2,
        link : `https://www.milliyet.com.tr${link}`
    })
});
}
return sondakika = { haberler }
}

app.get("/sondakika/haberler", async (req, res) => {
    let data = await haberler()
    res.json(data)
})

app.listen(port, () => {
    console.log(`Started http://localhost:${port}`)
})