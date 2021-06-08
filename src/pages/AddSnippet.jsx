import React, { Component } from "react";
// import AutoComplete from "../AutoComplete";
// import Button from "../Button";
// import Message from "../Message";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
import { buildFormData } from "../utils/buildFormData";
// import FeedBack from "../FeedBack";
// import "../../styles/ItemForm.css";

const initialState = {
    title: "",
    userName: "",
    description: "",
    category: "",
    snippet: "",
    httpResponse: null,
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

        // Handle some validation here.



        if (!this.state.category) {
            this.setState({ error: "No category selected !" }, () => {
                this.timeoutId = setTimeout(() => {
                    this.setState({ error: null });
                }, 1000);
            });
            return;
        }

        const fd = new FormData();
        const { httpResponse, ...data } = this.state;
        buildFormData(fd, data);

        fd.append("picture", this.pictureRef.current.files[0]); // ???






        apiHandler
            .addSnippet(fd)
            .then((data) => {
                this.props.addSnippet(data);

                this.setState({
                    ...initialState,
                    httpResponse: {
                        status: "success",
                        message: "Item successfully added.",
                    },
                });

                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null });
                }, 1000);
            })
            .catch((error) => {
                this.setState({
                    httpResponse: {
                        status: "failure",
                        message: "An error occured, try again later.",
                    },
                });

                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null });
                }, 1000);
            });
    };

    render() {

        return (
            <div className="SnippetForm-container">
                <form className="SnippetForm" onSubmit={this.handleSubmit}>
                    <p onClick={this.props.handleClose} className="close-link">
                        X
          </p>
                    <h2>Add Item</h2>
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
                        <input
                            className="input"
                            type="text"
                            name="snippet"
                        />
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
                        <label className="label" htmlFor="creator">
                            Creator
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.creator}
                            placeholder="Creator"
                            name="creator"
                        />
                    </div>

                    <button primary>Add Snippet</button>
                </form>
            </div>
        );
    }
}

export default withUser(SnippetForm);