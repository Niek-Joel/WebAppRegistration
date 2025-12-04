import LandingPage from "./pages/LandingPage";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'landing',
            selectedTerm: null
        };
    }

    // Handle term selection from LandingsPage
    handleSelectTerm = (termid) => {
        this.setState({
            selectedTerm: termid,
            currentPage: 'search' // Switch to SearchPage
        });
    }

    render() {
        if (this.state.currentPage === 'landing') {
            return <LandingPage onSelectTerm={this.handleSelectTerm}/>;
        }

        if (this.state.currentPage === 'search') {
            return <div>Search Page (term: {this.state.selectedTerm})</div>
        }
    }
}

export default App;