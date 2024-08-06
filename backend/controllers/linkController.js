const Link = require('../models/link');

const createLink = async(require, response) => {
    try{
    const link = require.body.link;
    await Link.create({
        link,
    });
    response.json({ link })
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
};

const getLinks = async(require, response) => {
    try{
    const links = await Link.find();
    response.json({ links });
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
};

const getLink = async (require, response) => {
    try{
    const linkID = require.params.id;
    const link = await Link.findById(linkID);
    response.json({ link });
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

const updateLink = async (require, response) => {
    try{
    const linkID = require.params.id;
    const link = require.body.link;
    await Link.findByIdAndUpdate(linkID, {
        link,
    });
    const note = await Link.findById(linkID);
    response.json({ link });
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

const deleteLink = async (require, response) => {
    try{
    const linkID = require.params.id;
    await Link.findByIdAndDelete(linkID);
    response.json({success: "Link deleted"});
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

const redirectLink = async (require, response) => {
    const key = require.params.key;
    const link = await Link.findOne({key});
    if (!link) {
        return response.status(404).json({error: "Link not found"});
    }
    link.clicks++;
    response.redirect(link.link);
}

module.exports = {
    createLink,
    getLinks,
    getLink,
    updateLink,
    deleteLink,
    redirectLink,
}
