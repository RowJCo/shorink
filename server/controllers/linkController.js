const Link = require('../models/linkModel');

const createLink = async (req, res) => {
    try {
        const link = await Link.create({
            link: req.body.link,
            userID: req.userID,
        });
        res.status(201).json({ message: 'Link created' });
    } catch (error) {
        res.status(400).json({ message: "Unable to create link" });
    }
};

const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ userID: req.userID });
        res.json({ links });
        res.status(200)
    } catch (error) {
        res.status(400).json({ message: "Unable to get links" });
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
        res.status(400).json({ message: "Unable to update link" });
    }  
};

const deleteLink = async (req, res) => {
    try {
        await Link.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Link deleted' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to delete link" });
    }
};

const redirectLink = async (req, res) => {
    try {
        const link = await Link.findOne({ key: req.params.key });
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.redirect(link.link);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to redirect link" });
    }
};

module.exports = {
    createLink,
    getLinks,
    updateLink,
    deleteLink,
    redirectLink,
};