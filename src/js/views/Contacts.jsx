import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import CardContact from "../store/component/CardContact.jsx";

const Contacts = () => {
    const { store } = useContext(Context);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/addContact" className="btn btn-primary px-4">
                    Add New Contact
                </Link>
            </div>

            {store.listContacts?.length > 0 ? (
                <ul className="list-group mt-3">
                    {store.listContacts.map((contact) => (
                        <CardContact contact={contact} key={contact.id} />
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning text-center">
                    No contacts available. Add a new contact to get started!
                </div>
            )}
        </div>
    );
};

export default Contacts;

