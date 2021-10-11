import React from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { BsMusicNoteList } from 'react-icons/bs';


class NavItem extends React.Component {

    constructor(props) {
        super(props);
        this.renderLink = this.renderLink.bind(this);
    }

    renderLink() {
        if (this.props.name === "Home") {
            return <AiOutlineHome></AiOutlineHome>;
        } else if (this.props.name === "All Songs") {
            return <BsMusicNoteList></BsMusicNoteList>;
        } else {
            return this.props.name;
        }
    }

    render() {
        return <div className="nav-item">
            <Link to={this.props.url}>
            {
                this.renderLink()
            }
            </Link>
        </div>
    }
}

export default NavItem