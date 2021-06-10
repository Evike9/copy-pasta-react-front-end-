import React, { Component } from 'react'
import SnippetDisplay from '../snippets/SnippetDisplay'
import apiHandler from "../api/apiHandler";
//import SnippetDetail from '../snippets/SnippetDetail'

class Home extends Component {
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
                            <SnippetDisplay
                                snippet={snippet} />
                        </div>
                        )
                    })}
            </div>
        )
    }
}
export default Home