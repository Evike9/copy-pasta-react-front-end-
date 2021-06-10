import React from 'react'
import { Link } from "react-router-dom";
import "../../src/styles/SnippetDisplay.css";

const SnippetDisplay = (props) => {
    const { picture, title, userName, category, _id } =
    props.snippet;
        console.log(props.snippet)

    return (
        <div className="SnippetDisplay">
            <div className="picture">
                <img src={picture} alt={title} />
            </div>
            <div className="description">
                <h2>Title: {title}</h2>
                <h4>User: {userName}</h4>
                <h5>Category: {category}</h5>
            </div>
            <button>
                        <Link to={"/snippet/" + _id}>
                            View Snippet
                        </Link>
            </button>
        </div>
    );
};


export default SnippetDisplay
