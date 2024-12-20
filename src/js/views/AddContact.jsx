import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, phone, email, address } = formData;

        if (!name || !phone || !email || !address) {
            alert("Please fill in all fields.");
            return;
        }

        id ? actions.editContact(id, formData) : actions.createContact(formData);
        alert(id ? "Contact updated successfully." : "Contact added successfully.");
        navigate("/");
    };

    useEffect(() => {
        if (id) {
            const contactToEdit = store.listContacts.find((contact) => contact.id == id);
            if (contactToEdit) setFormData(contactToEdit);
        }
    }, [id, store.listContacts]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{id ? `Edit Contact: ${formData.name}` : "Add a New Contact"}</h2>

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
                            placeholder={`Enter ${field}`}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-success px-4">
                        {id ? "Update Contact" : "Save Contact"}
                    </button>
                </div>
            </form>

            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                    Back to Contacts
                </Link>
            </div>
        </div>
    );
};

export default AddContact;


