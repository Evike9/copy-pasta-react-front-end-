import React, { Component } from 'react'
import apiHandler from "../api/apiHandler"


export class SnippetDetail extends Component {


    state = {
        snippet: null
    }

    componentDidMount() {
        const id = this.props.match.params.id;



        apiHandler.getSnippet(id).then(data => {
            this.setState({
                snippet: data
            })
        }).catch(error => {
            console.log(error)
        })

    }

    render() {


        if (!this.state.snippet) return null;
        return (
            <div>
                <br />
                Title: {this.state.snippet.title}
                <br />
                User: {this.state.snippet.userName}
                <br />
                Description: {this.state.snippet.description}
                <br />
                Category: {this.state.snippet.category}
                <br />
                Snippet: {this.state.snippet.snippet}
                <br />
                Credits: {this.state.snippet.credits}
            </div>
        )
    }
}

export default SnippetDetail
