import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import withUser from "../../auth/withUser";
import apiHandler from "../../api/apiHandler";




class FormSignup extends Component {
    state = {};
    handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        apiHandler
            .signup(this.state)
            .then((data) => {
                this.props.context.setUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        if (this.props.context.isLoggedIn) {
            return <Redirect to="/" />;
        }
        return (
            <section className="form-section">
                <header className="header">
                    <h1>
                        Hello
            <span role="img" aria-label="hand">
                            :italianhand:
            </span>
                    </h1>
                </header>
                <form
                    autoComplete="off"
                    className="form"
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <h2>Create account</h2>
                    <div className="form-group">
                        <label className="label" htmlFor="userName">
                            User Name
            </label>
                        <input
                            className="input"
                            id="usertName"
                            type="text"
                            name="userName"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="email">
                            Email
            </label>
                        <input className="input" id="email" type="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="password">
                            Password
            </label>
                        <input
                            className="input"
                            id="password"
                            type="password"
                            name="password"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="linkedIn">
                            LinkedIn
            </label>
                        <input
                            className="input"
                            id="linkedIn"
                            type="url"
                            name="LinkedIn"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="GitHub">
                            GitHub
            </label>
                        <input
                            className="input"
                            id="github"
                            type="url"
                            name="GitHub"
                        />
                    </div>
                    <button className="btn-submit">Let's go!</button>
                </form>
                <div className="form-section link">
                    <p>Already have an account? </p>
                    <Link to="/signin">Log in</Link>
                </div>
            </section>
        );
    }
}
export default withUser(FormSignup);