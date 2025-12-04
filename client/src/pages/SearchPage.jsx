import {Component} from "react";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //  Dropdown options (purely UI)
            subjects: [],
            levels: [],
            scheduleTypes: [],
            // User's filters
            filters: {
                subjectid: '',
                num: '',
                scheduletypeid: '',
                level: '',
                startHour: '00',
                startMinute: '00',
                endHour: '23',
                endMinute: '59',
                days: []
            },
            // Search results
            searchResults: []
        }
    };

    componentDidMount() {
        // Using promise to combine the fetches
        Promise.all([
           fetch('http://localhost:8080/api/subjects').then(r => r.json()),
           fetch('http://localhost:8080/api/levels').then(r => r.json()),
           fetch('http://localhost:8080/api/scheduletypes').then(r => r.json())
        ]).then(([subjects, levels, scheduleTypes]) => {
            this.setState({
                subjects: subjects.data,
                levels: levels.data,
                scheduleTypes: scheduleTypes.data
            });
        });
    }

    // e.g., (filterName, value) = (subjectid, num)
    handleFilterChange = (filterName, value) => {
        this.setState({
            filters: {
                ...this.state.filters, // spread operator (copy all filters)
                [filterName]: value    // overwrite the given filter value
            }
        });
    }

    handleDayChange = (day, checked) => {
        let days;
        if (checked) { // add day
            days = [...this.state.filters.days, day];
        }
        else { // remove day
            days = this.state.filters.days.filter(d => d !== day);
        }
        this.setState({
            filters: {
                ...this.state.filters,
                days: days
            }
        });
    }

    handleSubmit = () => {
        const query = new URLSearchParams({
            ...this.state.filters,
            days: this.state.filters.days.join(''), // "MWF" already
            start: `${this.state.filters.startHour}:${this.state.filters.startMinute}`,
            end: `${this.state.filters.endHour}:${this.state.filters.endMinute}`
        }).toString();

        fetch(`http://localhost:8080/api/sections?${query}`)
            .then(res => res.json())
            .then(data => this.props.onSearch(data.data)) // TODO: create onSearch in App.jsx
            .catch(err => console.log(err));
    }


}



















