import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import withUser from "../../auth/withUser";
import { Redirect } from "react-router-dom";
//import "../../styles/form.css";


const state = {
  userName: "",
  LinkedIn: "",
  email: "",
  GitHub: "",
  tempPictureUrl: null,
  userUpdated: false,
}
class FormProfile extends Component {
  state = state
  imageRef = React.createRef();

  handleChange = (event) => {
    const key = event.target.name; // This function requires that you have the "name" attribute on your form fields.
    const value = event.target.value === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  componentDidMount() {

    const id = this.props.match.params.id;
    apiHandler.getUserInfos(id).then(data => {
      this.setState({
        userName: data.userName,
        email: data.email,
        LinkedIn: data.LinkedIn,
        GitHub: data.GitHub,
        picture: data.picture,
      })
    })
  }

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
      formData.append("userName", this.state.userName);
      formData.append("email", this.state.email)
      formData.append("LinkedIn", this.state.LinkedIn);
      formData.append("GitHub", this.state.GitHub);

      const files = this.imageRef.current.files;
      if (files) {
        formData.append("picture", files[0])
      }

      const id = this.props.match.params.id;

      apiHandler.updateUser(id, formData).then(data => {
        this.setState({
          ...state,
          userUpdated: true,
        });
      })
    };

    render() {
      if (this.state.userUpdated) {
        return <Redirect to="/profile" />;
      }

      return (
        <section className="form-section">
          <form
            className="form"
            onSubmit={this.handleSubmit}>
            <h2 className="header">Edit profile</h2>
            <img
              src={this.state.tempPictureUrl || this.state.picture}
              alt={this.state.userName}
            />
            <div className="form-group">
              <label className="label" htmlFor="picture">
                Change profile image
            </label>
              <input
                className="input"
                type="file"
                onChange={this.handlePreview}
                ref={this.imageRef}
                name="picture"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="userName">
                User name
            </label>
              <input
                className="input"
                id="userName"
                type="text"
                name="userName"
                onChange={this.handleChange}
                value={this.state.userName}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="email">
                Email
            </label>
              <input
                className="input"
                id="email"
                type="email"
                name="email"
                value={this.state.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="LinkedIn">
                LinkedIn
            </label>
              <input
                className="input"
                id="LinkedIn"
                type="url"
                name="LinkedIn"
                onChange={this.handleChange}
                value={this.state.LinkedIn}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="GitHub">
                GitHub
            </label>
              <input
                className="input"
                id="GitHub"
                type="url"
                name="GitHub"
                onChange={this.handleChange}
                value={this.state.GitHub}
              />
            </div>
            <button primary>
              Save
          </button>
          </form>
        </section>
      );
    }
  }
export default withUser(FormProfile);