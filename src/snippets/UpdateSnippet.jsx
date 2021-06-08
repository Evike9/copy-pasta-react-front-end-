import React, { Component } from "react";
// import AutoComplete from "../AutoComplete";
// import Button from "../Button";
// import Message from "../Message";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
import { buildFormData } from "../utils/buildFormData";
// import FeedBack from "../FeedBack";
// import "../../styles/ItemForm.css";

class UpdateSnippet extends Component {


    state = {
    title: "",
    userName: "",
    description: "",
    category: "",
    snippet: "",
    httpResponse: null,
    error: null,
    }  // initial state 

    updateRef = React.createRef();

    handleChange = (event) => {

        const value = event.target.value === "file" ? event.target.files[0] : event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
    };


    componentDidMount() {

        // make api call to get one snippet



        // set the state


        // the inputs are normally linked to the state and the values should be displayed in the 
        // snippets



    }

    handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData();
        const { httpResponse, ...data } = this.state;
        buildFormData(fd, data);

        fd.append("picture", this.updateRef.current.files[0]); // ???



        // get the id of the snippet you're editing either from the state

        // or the id contained in the url (something something math.params)
        // normally this should update the correct snippet
        apiHandler
            .updateSnippet(this.props.snippet._id, fd)
            .then((data) => {
                this.props.onSnippetUpdate(data);

                this.setState({
                    httpResponse: {
                        status: "success",
                        message: "Snippet successfully added.",
                    },
                });

            })
            .catch((error) => {
                this.setState({
                    httpResponse: {
                        status: "failure",
                        message: "An error occured, try again later.",
                    },
                });
            });
    };

    render() {


        return (
            <div className="SnippetForm-container">
                <form
                    ref={this.updateRef}
                    className="SnippetForm"
                    onSubmit={this.handleSubmit}>
                    <p onClick={this.props.handleClose} className="close-link">
                        X
          </p>
                    <h2>Edit snippet</h2>
                    <div className="form-group">
                        <label className="label" htmlFor="title">
                            Title
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title || ""}
                            placeholder="Title"
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="label"
                            htmlFor="userName">
                            User Name
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.userName || ""}
                            placeholder="User Name"
                            name="userName"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="description">
                            Description
            </label>
                        <textarea
                            value={this.state.description || ""}
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
                            value={this.state.category[0] || ""}
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
                            value={this.state.snippet || ""}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="picture">
                            Result
            </label>
                        <input
                            className="input"
                            type="file"
                            value={this.state.picture || ""}
                            ref={this.picture}

                            name="picture"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="title">
                            Credits
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.credits || ""}
                            placeholder="credits"
                            name="credits"
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
                            value={this.state.creator || ""}
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

export default withUser(UpdateSnippet);