import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../auth/withUser";
import apiHandler from "../api/apiHandler";
import SnippetCard from "../snippets/SnippetCard";
import UpdateSnippet from "../snippets/UpdateSnippet";
import AddSnippet from "./AddSnippet";
//import "../styles/Profile.css";
//import "../styles/form.css";

class Profile extends Component {
    state = {
        user: null,
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
            console.log(allPromises);
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

    handleSnippetUpdate = (updateSnippet) => {
        const userSnippets = [...this.state.userSnippets].map((snippet) =>
            snippet._id === updateSnippet._id ? updateSnippet : snippet
        );
        this.setState({ userSnippets });
    };

    addSnippet = (snippet) => {
        this.setState({ userSnippets: [...this.state.userSnippets, snippet] });
    };


    render() {
        const { userSnippets, selectedSnippet, user } = this.state;
        console.log("selectedSnippet", selectedSnippet);
        console.log("this.state", this.state);
        if (!user) return null;
        return (
            <section className="Profile">
                {selectedSnippet && (
                    <UpdateSnippet
                        snippet={selectedSnippet}
                      /*  onSnippetUpdate={this.handleSnippetUpdate} */
                    />
                )}
                {user && this.props.displayForm && (
                    <AddSnippet
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
                    <div>
                        Linkedin: <a href={user.LinkedIn}>{user.LinkedIn} </a>
                    </div>
                    <div>
                        GitHub: <a href={user.GitHub}> {user.GitHub} </a>
                    </div>
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
                        {userSnippets.map((snippet, index) => (
                            <SnippetCard
                                key={index}
                                {...snippet}
                                handleDelete={this.deleteSnippet}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
export default withUser(Profile);