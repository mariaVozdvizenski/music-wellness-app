import React from 'react';
import './Credits.css';
import { Link } from 'react-router-dom';

class Credits extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="page-content credits">
            <div className="credits-background">
                <h1>Credits</h1>
                <p>Any licensed content used on the app is credited properly and used in accordance to the license.</p>
                <h3>Gifs and illustrations</h3>
                <p>All the Gifs that appear under the <span className="license"><Link className="license-link" to="/mood/1">music listening</Link></span> page are used under <span className="license">
                    <a className="license-link" target="_blank" href="https://help.motionelements.com/hc/en-us/articles/206279362?_ga=2.70974096.1211772035.1633589442-86833456.1633589442">MotionElement's Royalty-Free License</a>
                </span> terms. The Gifs have been legally obtained from <span className="license"><a className="license-link" target="_blank" href="https://www.motionelements.com/">MotionElement's website</a></span> and the artists have been appropriately credited.
                </p>
                <p>
                    The plant illustration that appears on the website background has been created by a Warsaw based artist Agata Wierzbicka. The illustration along with her blog can be found <span className="license"><a className="license-link" target="_blank" href="http://wierzbickaillustration.com/?portfolio=bionic">here</a></span>.
                </p>
                <h3>Songs</h3>
                <p>
                    All songs, unless stated otherwise, have been legally acquired from Pixabay and are used under <span className="license"><a target="_blank" href="https://pixabay.com/service/license/" className="license-link">Pixabay license. </a></span>
                    Remaining songs that are not under Pixabay license have been created for the present service and the creator of said songs has been listed as 'Wellness Music'. 
                </p>
            </div>
        </div>
    }
}

export default Credits