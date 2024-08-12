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
        userID: null,
    },
    fetchLinks: async () => {
        try {
            const response = await fetch("/api/links", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            set({ links: data.links });
        } catch (error) {
            console.log("Unable to fetch links");
        }
    },
    createLink: async (e) => {
        try {
            e.preventDefault();
            const { createForm } = linkStore.getState();
            await fetch("/api/links", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createForm),
            });
            set({ 
                createForm:{
                    link: "",
                    userID: null,
                },
            });
        } catch (error) {
            console.log("Unable to create link");
        }
    },
    deleteLink: async (_id) => {
        try {
            await fetch("/api/links/"+_id, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log("Unable to delete link");
        }
    },
    toggleUpdate: ( _id, link, key, userID) => {
        try {
            set({ update: true, 
                updateForm: _id, link, key, userID
            });
        } catch (error) {
            console.log("Unable to toggle update");
        }
    },
    updateLink: async (e) => {
        try {
            e.preventDefault();
            const { updateForm: { _id, link, key, userID }} = linkStore.getState();
            await fetch("/api/links/"+_id, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id,
                    link,
                    key,
                    userID,
                }),
            });
            set({ 
                update: false,
                updateForm: {
                    _id: null,
                    link: "",
                    key: null,
                    userID: null,
                },
            });
        } catch (error) {
            console.log("Unable to update link");
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
            console.log("Unable to update form field");
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
            console.log("Unable to handle update field change");
        }
    },

}));

export default linkStore;