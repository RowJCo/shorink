import { create } from 'zustand';

const linkStore = create((set) => ({
    links: null,
    update: false,
    createForm: {
        link: "",
    },
    updateForm: {
        _id: null,
        link: "",
        key: null,
        clicks: null,
        userID: null,
    },
    fetchLinks: async () => {
        try {
            const response = await fetch("https://shorink.onrender.com/api/links", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            set({ links: data.links });
        } catch (error) {
            console.log(error);
        }
    },
    createLink: async (e) => {
        try {
            e.preventDefault();
            const { createForm, links } = linkStore.getState();
            const response = await fetch("https://shorink.onrender.com/api/links", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createForm),
            });
            const data = await response.json();
            set({ links: [ ...links, data.link ],
                createForm:{
                    link: "", userID: null
                } 
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteLink: async (_id) => {
        try {
            const { links } = linkStore.getState();
            await fetch("https://shorink.onrender.com/api/links/"+_id, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newLinks = links.filter((link) => link._id !== _id);
            set({ links: newLinks });
        } catch (error) {
            console.log(error);
        }
    },
    toggleUpdate: ( _id, link, key, clicks, userID) => {
        try {
            set({ update: !this.update, updateForm: _id, link, key, clicks, userID });
        } catch (error) {
            console.log(error);
        }
    },
    updateLink: async (e) => {
        try {
            e.preventDefault();
            const { updateForm, links } = linkStore.getState();
            const response = await fetch("https://shorink.onrender.com/api/links/"+updateForm._id, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateForm),
            });
            const data = await response.json();
            const newLinks = links.map((link) => {
                if (link._id === data.updatedLink._id){
                    return data.updatedLink;
                }
                return link;
            });
            set({ links: newLinks, update: false });
        } catch (error) {
            console.log(error);
        }
    },
    updateCreateFormField: (e) => {
        try {
            const { createForm } = linkStore.getState();
            set({ 
                createForm: { 
                    ...createForm, 
                    [e.target.name]: e.target.value 
                } 
            });
        } catch (error) {
            console.log(error);
        }
    },
    handleUpdateFieldChange: (e) => {
        try {
            const { updateForm } = linkStore.getState();
            set({ 
                updateForm: { 
                    ...updateForm, 
                    [e.target.name]: e.target.value 
                } 
            });
        } catch (error) {
            console.log(error);
        }
    },

}));

export default linkStore;