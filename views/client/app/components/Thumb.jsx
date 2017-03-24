import React from 'react';
import {Link} from 'react-router-dom';

const Thumb = (props) => {
    const storLocation = `${props.data.mediastorLocation}${props.data.mediastorName}`;
    return (
        <div className="col s12 m6 l4">
            <div className="img_container">
                <Link to={`/video/${props.data._id}`}>
                    <img className="thumbnail" src={props.data.poster} />
                    <div className="overlay"></div>
                </Link>
            </div>
            <h5>{props.data.name}</h5>
            <p>{props.data.description}</p>
        </div>
    )
}
module.exports = Thumb;