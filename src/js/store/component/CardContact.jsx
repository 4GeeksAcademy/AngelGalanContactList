import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../appContext";

const CardContact = ({ contact }) => {
    const { actions } = useContext(Context);

    const handleDelete = () => actions.deleteContact(contact.id);

    return (
        <li className="contact-card d-flex justify-content-between align-items-center p-3 border rounded shadow-sm mb-3">
            <div className="d-flex align-items-center">
                <img
                    className="rounded-circle me-3"
                    src="https://picsum.photos/60"
                    alt="Contact"
                    style={{ width: "60px", height: "60px" }}
                />
                <div>
                    <h6 className="mb-1 text-primary fw-bold">{contact.name}</h6>
                    <small className="text-muted d-block">{contact.address}</small>
                    <small className="text-muted d-block">{contact.phone}</small>
                    <small className="text-muted d-block">{contact.email}</small>
                </div>
            </div>
            <div className="d-flex">
                <Link to={`/editContact/${contact.id}`} className="btn btn-sm btn-outline-warning me-2">
                    <i className="fas fa-pen"></i>
                </Link>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteModal-${contact.id}`}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <div
                    className="modal fade"
                    id={`deleteModal-${contact.id}`}
                    tabIndex="-1"
                    aria-labelledby="deleteModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete <strong>{contact.name}</strong>? This action cannot be undone.
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={handleDelete}
                                    data-bs-dismiss="modal"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CardContact;
