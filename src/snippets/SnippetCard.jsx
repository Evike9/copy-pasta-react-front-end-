import React from 'react'
import { Link } from "react-router-dom";

const SnippetCard = (props) => {
    const { picture, title, _id, userName, category, description, snippet, credits, handleDelete } =
        props;

    return (
        <div className="SnippetCard">
            <div className="picture">
                <img src={picture} alt={title} />
            </div>
            <div className="description">
                <h2>{title}</h2>
                <h4>User: {userName}</h4>
                <h5>Category: {category}</h5>
                <p>Description: {description}</p>
                <p>Snippet: {snippet}</p>
                <p>Credits: {credits}</p>
                <div className="buttons">
                    <button onClick={(event) => handleDelete(_id)} secondary>
                            Delete snippet
            </button>
                    <button>
                        <Link to={"/update-snippet/" + _id}>
                            Edit Snippet
                        </Link>
            </button>

                </div>
            </div>
        </div>
    );
};


export default SnippetCard
