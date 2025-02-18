const { nanoid } = require("nanoid");
const URL = require("../models/url")

async function handlegenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required "});

    const shortId = nanoid(8);
    await URL.create({
         shortId: shortId,
         redirectURL: body.url,
         visitedHistory: [],
    });

    return res.render("home",{ id: shortId});
}

async function handleURLRedirect(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId
    }, 
    { 
        $push: 
        {
        visitHistory: 
        {
            timestamp: Date.now(),
        },
        }
    }
    );
    console.log(entry);
    res.redirect(entry.redirectURL);
};

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.json({
        visitCount: result.visitHistory.length,
        records: result.visitHistory
    });

};
module.exports = {
    handlegenerateNewShortURL,
    handleURLRedirect,
    handleGetAnalytics
}