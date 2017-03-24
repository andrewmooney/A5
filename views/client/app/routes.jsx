import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, Link } from 'react-router-dom';
import Videos from './components/Videos.jsx';
import Video from './components/Video.jsx';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Links />
                    <Route exact="true" path='/' component={Home} />
                    <Route path='/videos' component={Videos} />
                    <Route path='/video/:id' component={Video} />
                </div>
            </Router>
        )
    }
}

const Home = () => {
    return (
        <h1>Home</h1>
    )
}

const Links = () => {
    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/videos'>Videos</Link></li>
            </ul>
        </div>
    )
}


module.exports = Routes;