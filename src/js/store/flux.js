const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: [],
        },
        actions: {
            createUser: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/angelgalan", {
                        method: "POST",
                    });
                    console.log("User created:", await response.json());
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            },

            getInfoContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/angelgalan/contacts");
                    if (response.status === 404) {
                        getActions().createUser();
                    } else if (response.ok) {
                        const data = await response.json();
                        setStore({ listContacts: data.contacts || [] });
                        console.log("Contacts loaded:", data.contacts);
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },

            addContactToList: (contact) => {
                const store = getStore();
                setStore({ listContacts: [...store.listContacts, contact] });
            },

            createContact: async (payload) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/angelgalan/contacts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });
                    const newContact = await response.json();
                    getActions().getInfoContacts();
                    console.log("Contact added:", newContact);
                } catch (error) {
                    console.error("Error creating contact:", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/angelgalan/contacts/${id}`, {
                        method: "DELETE",
                    });
            
                    if (response.ok) {
                        // Refresca la lista de contactos desde el servidor
                        await getActions().getInfoContacts();
                        console.log(`Contact with ID ${id} deleted`);
                    } else {
                        console.error("Failed to delete contact");
                    }
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            },
            
            editContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/angelgalan/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact),
                    });
                    const updatedData = await response.json();
                    const store = getStore();
                    setStore({
                        listContacts: store.listContacts.map((contact) =>
                            contact.id === id ? updatedData : contact
                        ),
                    });
                    console.log("Contact updated:", updatedData);
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            },
        },
    };
};

export default getState;


