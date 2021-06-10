import React, { Component } from 'react'
import SnippetDetail from '../snippets/SnippetDetail'
import apiHandler from "../api/apiHandler";
//import SnippetDetail from '../snippets/SnippetDetail'

class DisplayCard extends Component {
    state = {
        snippet: null,
        snippets: [],
    }
    componentDidMount() {
        apiHandler.getSnippets().then((data) => {
            this.setState({ snippets: data });
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.snippets.map((snippet) => {
                        return (<div>
                            <SnippetDetail
                                snippet={snippet} />
                        </div>
                        )
                    })}
            </div>
        )
    }
}
export default DisplayCard