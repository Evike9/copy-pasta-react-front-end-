import React from 'react'

const SnippetDetail = (props) => {
    const { picture, title, userName, category, description, snippet, credits } =
        props.snippet;

    return (
        <div className="SnippetDetail">
            <div className="picture">
                <img src={picture} alt={title} />
            </div>
            <div className="description">
                <h2>Title: {title}</h2>
                <h4>User: {userName}</h4>
                <h5>Category: {category}</h5>
                <p>Description: {description}</p>
                <p>Snippet: {snippet}</p>
                <p>Credits: {credits}</p>
            </div>
        </div>
    );
};


export default SnippetDetail