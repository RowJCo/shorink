const Link = require('../models/linkModel');

const createLink = async (req, res) => {
    try {
        const link = await Link.create({
            link: req.body.link,
            userID: req.userID,
        });
        res.status(201).json({ message: 'Link created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ userID: req.userID });
        res.status(201).json(links);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateLink = async (req, res) => {
    try {
        link = await Link.findOneAndUpdate({ _id: req.params.id }, { link: req.body.link });
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.status(200).json({ message: 'Link updated' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }  
};

const deleteLink = async (req, res) => {
    try {
        await Link.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Link deleted' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const redirectLink = async (req, res) => {
    try {
        const link = await Link.findOne({ key: req.params.key });
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        link.clicks++;
        res.redirect(link.link);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createLink,
    getLinks,
    updateLink,
    deleteLink,
    redirectLink,
};