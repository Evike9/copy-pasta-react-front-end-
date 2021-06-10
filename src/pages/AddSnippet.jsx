import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
import { buildFormData } from "../utils/buildFormData";


const initialState = {
    title: "",
    userName: "",
    description: "",
    category: "",
    snippet: "",
    credits: "",
    snippetAdded: false,
    error: null,
};

class SnippetForm extends Component {
    state = initialState;

    pictureRef = React.createRef();

    handleChange = (event) => {

        const value = event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData();
        const { ...data } = this.state;
        buildFormData(fd, data);

        fd.append("picture", this.pictureRef.current.files[0]); 


        apiHandler
            .addSnippet(fd)
            .then((data) => {
                this.setState({
                    ...initialState,
                    snippetAdded: true,
                });

            })
    };

    render() {
if (this.state.snippetAdded) {
    return <Redirect to="/profile" />;
}
        return (
            <div className="SnippetForm-container">
                <form className="SnippetForm" onSubmit={this.handleSubmit}>
                    <h2>Add Snippet</h2>
                    <div className="form-group">
                        <label className="label" htmlFor="title">
                            Title
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title}
                            placeholder="Title"
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="userName">
                            User Name
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.userName}
                            placeholder="User Name"
                            name="userName"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="description">
                            Description
            </label>
                        <textarea
                            value={this.state.description}
                            onChange={this.handleChange}
                            name="description"
                            id="description"
                            className="text-area"
                            placeholder="Describe your snippet!"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Category
            </label>
                        <select
                            name="category"
                            id="category"
                            onChange={this.handleChange}
                            value={this.state.category}
                        >
                            <option value="" disabled>
                                Select a category
              </option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JS">JS</option>
                            <option value="React">React</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="snippet">
                            Snippet
            </label>
                        <textarea
                            className="input"
                            onChange={this.handleChange}
                            value={this.state.snippet}
                            placeholder="Describe your snippet!"
                            name="snippet"
                            ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="picture">
                            Result image
            </label>
                        <input
                            className="input"
                            type="file"

                            ref={this.pictureRef}

                            name="picture"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="credits">
                            Credits
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.credits}
                            placeholder="Give some credits"
                            name="credits"
                        />
                    </div>

                    <button primary>Add Snippet</button>
                </form>
            </div>
        );
    }
}

export default withUser(SnippetForm);