import React from 'react';
import 'whatwg-fetch';

class Video extends React.Component {
    constructor() {
        super();
        this.state = { item: {} }
    }
    componentWillMount() {
        fetch(`http://localhost:8081/resources/${this.props.match.params.id}`)
            .then(response => response.json())
            .then((item) => this.setState({ item }))
    }
    render() {
        let item = this.state.item;
        console.log(item)
        const storLocation = `${item.mediastorLocation}${item.mediastorName}`;
        console.log(storLocation)
        return (
            <div className="row">
                <video src={storLocation} controls />
                <div className="col s4">
                    <h5>Title</h5>
                    <h6>Sub Title</h6>
                    <p>{item.description}</p>
                </div>
                <div className="col s4">
                    <h6>THIS RESOURCE WAS USED ON</h6>
                    <ul>
                        <li>Date | Course</li>
                        <li>Date | Course</li>
                        <li>Date | Course</li>
                    </ul>
                </div>
                <div className="col s4">Section 3</div>
            </div>
        )
    }
}

module.exports = Video;