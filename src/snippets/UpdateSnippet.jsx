import React, { Component } from "react";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
import { Redirect } from "react-router-dom";
import { buildFormData } from "../utils/buildFormData";
import { useParams } from "react-router-dom";
// import "../../styles/ItemForm.css";

const state = {
    title: "",
    userName: "",
    description: "",
    category: "",
    snippet: "",
    tempPictureUrl: null,
    credits: "",
    snippetUpdated: false,
    error: null,
}  // initial state 
class UpdateSnippet extends Component {

    state = state;
    updateRef = React.createRef();

    handleChange = (event) => {

        const value = event.target.value === "file" ? event.target.files[0] : event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
    };


    componentDidMount() {

        console.log("here")
        // console.log("componentDidMount was called");
        // console.log("this.props", this.props);
        // make api call to get one snippet
        const id = this.props.match.params.id;
        apiHandler.getSnippet(id).then(data => {
            console.log(data)
            this.setState({
                title: data.title,
                userName: data.userName,
                description: data.description,
                category: data.category, 
                snippet: data.snippet,
                creator: data.creator,
                picture: data.picture,
                credits: data.credits,
            })
        })



        // set the state


        // the inputs are normally linked to the state and the values should be displayed in the 
        // snippets



    }
//we create a temporary URL to view out file before updating it
    handlePreview = event => {

        const file = event.target.files[0];
        const fakeUrl = URL.createObjectURL(file);
        this.setState({
            tempPictureUrl: fakeUrl
        })

    }

    handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("credits", this.state.credits)
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("userName", this.state.userName);
        formData.append("category", this.state.category);
        formData.append("snippet", this.state.snippet);

        const files = this.updateRef.current.files;

        if (files) {
            formData.append("picture", files[0])
        }

        const id = this.props.match.params.id;

        apiHandler.updateSnippet(id, formData).then(data => {
            this.setState({
                ...state,
                snippetUpdated: true,
            });

        })
};


    render() {
        if (this.state.snippetUpdated) {
            return <Redirect to="/profile" />;
        }

        return (
            <div className="SnippetForm-container">
                <form

                    className="SnippetForm"
                    onSubmit={this.handleSubmit}>
                    <h2>Edit snippet</h2>
                    <img style={{
                        width: 64,
                        height: 64
                    }} src={this.state.tempPictureUrl || this.state.picture} />
                    <div className="form-group">
                        <label className="label" htmlFor="title">
                            Title
            </label>
                        <input
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title}
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
                            value={this.state.category}
                        >
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
                            onChange={this.handleChange}
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
                            onChange={this.handlePreview}
                            ref={this.updateRef}
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