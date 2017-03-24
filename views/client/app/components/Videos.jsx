import React from 'react';
import {render} from 'react-dom';
import Thumb from './Thumb.jsx';
import 'whatwg-fetch';

class Videos extends React.Component {
    constructor() {
        super();
        this.state = {items: []};
    }
    componentWillMount(){
        fetch( 'http://localhost:8081/resources/type/video' )
            .then( response => response.json() )
            .then( (items) => this.setState({items}))
    }
    render(){
        let items = this.state.items 
        return (
            <div className="row">
        { items.map( item =>  <Thumb key={item._id} data={item} />)}
        </div>
        );
    }
}

module.exports = Videos;