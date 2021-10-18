import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="page-content error">
            <h1>404 - Page not found</h1>
        </div>
    }
}

export default NotFound