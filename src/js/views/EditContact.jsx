import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

const EditContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        const contact = store.listContacts.find((contact) => contact.id == id);
        if (contact) {
            setFormData(contact);
        } else {
            console.error("Invalid contact ID:", id);
            navigate("/");
        }
    }, [id, store.listContacts, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.editContact(id, formData);
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Edit Contact</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                {["name", "email", "phone", "address"].map((field) => (
                    <div className="col-md-6" key={field}>
                        <label className="form-label" htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                            id={field}
                            name={field}
                            className="form-control"
                            value={formData[field] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-success px-4">
                        Update Contact
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

