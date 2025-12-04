import {Component} from "react";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: [],
            selectedTerm: ''
        };
    }

    // Invoked immediately after a component is mounted (inserted into the tree). Inits that require DOM nodes goes here. Also, good to load data from endpoints.
    // https://legacy.reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        // Ask server for terms, then convert to json, then store in state
        fetch('http://localhost:8080/api/terms')
            .then(res => res.json())
            .then(data => {
                console.log('API Response:', data);
                this.setState({terms: data.data});
            })
            .catch(err => console.log(err));
    }

    // When user clicks on the dropdown, update selectedTerm
    handleChange = (e) => {
        this.setState({selectedTerm: e.target.value});
    }

    // On button press
    handleSubmit = () => {
        // Make sure a term is selected
        if (!this.state.selectedTerm) {
            alert("Please select a term");
            return;
        }
        // Calling function of parent
        this.props.onSelectTerm(this.state.selectedTerm);
    }

    render() {
        return (
            <div>
                <h1> Select a Term for Class Search </h1>
                <select
                    value={this.state.selectedTerm}
                    onChange={this.handleChange}>

                    <option value="">-- Select a Term --</option>

                    {/* Loop through terms and create an option for each */}
                    {this.state.terms.map(term => (
                        <option key={term.id} value={term.id}>{term.name}</option>
                    ))}
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default LandingPage;