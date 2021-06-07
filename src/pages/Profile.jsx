import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Button from "../components/Button";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
//import FeedBack from "../components/FeedBack";
import SnippetCard from "../snippets/SnippetCard";
import UpdateSnippet from "../snippets/UpdateSnippet";
import AddSnippet from "../snippets/AddSnippet";
//import "../styles/Profile.css";
//import "../styles/form.css";

class Profile extends Component {
    state = {
        httpResponse: null,
        selectedSnippet: null,
        userSnippets: [],
    };
    componentDidMount() {
        const promises = Promise.all([
            apiHandler.getUserInfos(),
            apiHandler.getUserSnippets(),
        ]);
        promises.then((allPromises) => {
            const userInfos = allPromises[0];
            const userSnippets = allPromises[1];
            this.setState({
                user: userInfos,
                userSnippets: userSnippets,
            });
        });
    }
    deleteSnippet = (snippetId) => {
        apiHandler.removeSnippet(snippetId).then(() => {
            const userSnippets = [...this.state.userSnippets].filter(
                (snippet) => snippet._id !== snippetId
            );
            this.setState({ userSnippets });
        });
    };
    onSnippetSelect = (snippetId) => {
        const selectedSnippet = this.state.userSnippets.find(
            (snippet) => snippet._id === snippetId
        );
        this.setState({ selectedSnippet: selectedSnippet });
    };
    onEditFormClose = () => {
        this.setState({ selectedSnippet: null });
    };
    handleSnippetUpdate = (updatedSnippet) => {
        const userSnippets = [...this.state.userSnippets].map((snippet) =>
            item._id === updatedSnippet._id ? updatedSnippet : snippet
        );
        this.setState({ userSnippets });
    };
    addSnippet = (snippet) => {
        this.setState({ userSnippets: [...this.state.userSnippets, snippet] });
    };
    componentWillUnmount() {
        this.timeoutId && clearTimeout(this.timeoutId);
    }
    render() {
        const { httpResponse, userSnippets, selectedSnippet, user } = this.state;
        if (!user) return null;
        return (
            <section className="Profile">
                {selectedSnippet && (
                    <UpdateSnippet
                        snippet={selectedSnippet}
                        handleClose={this.onEditFormClose}
                        onSnippetUpdate={this.handleSnippetUpdate}
                    />
                )}
                {user && this.props.displayForm && (
                    <AddSnippet
                        handleClose={this.props.handleFormClose}
                        addSnippet={this.addSnippet}
                    />
                )}
                <div className="user-picture">
                    <img src={user.picture} alt={user.userName} />
                </div>
                <div className="user-presentation">
                    <h2 className="title">
                        {user.userName}
                    </h2>
                    <Link className="link" to="/profile/settings">
                        Edit profile
            </Link>
                </div>
                {!userSnippets.length && (
                    <React.Fragment>
                        <div>
                            <img src="/media/personal-page-empty-state.svg" alt="" />
                        </div>
                        <p>You don't have any snippets :(</p>
                    </React.Fragment>
                )}
                {!!userSnippets.length && (
                    <div className="SnippetCard">
                        <h3>Your snippets</h3>
                        {userSnippets.map((item, index) => (
                            <SnippetCard
                                key={index}
                                {...snippet}
                                handleDelete={this.deleteSnippet}
                                handleEdit={this.onSnippetSelect}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
export default withUser(Profile);