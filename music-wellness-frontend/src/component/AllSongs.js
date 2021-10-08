import React from 'react';
import './AllSongs.css';
import Song from './Song';
import { Link } from 'react-router-dom';
import { authenticationService } from '../service/AuthenticationService';
import SongService from '../service/SongService';
import MoodService from '../service/MoodService';
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import Search from './Search';


class AllSongs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            moods: [],
            options: [],
            filteredSongs: null
        }
        this.getOptions = this.getOptions.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.renderSongs = this.renderSongs.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        SongService.getAllSongs().then((data) => {
            this.setState({ songs: data });
            console.log(this.state.songs);
        });
        MoodService.getAllMoods().then((data) => {
            this.setState({ moods: data });
            this.setState({ options: this.getOptions() });
        });
    }

    renderAddSongLink() {
        if (authenticationService.currentUserValue && authenticationService.currentUserValue.isAdmin) {
            return <Link to="/add-song"><a>Add a new song</a></Link>
        }
    }

    handleOnInputChange(event) {
        this.setState({ filteredSongs: this.state.songs.filter(s => s.moodName.toLowerCase().includes(event.toLowerCase())) })
    }

    getOptions() {
        return this.state.moods.map((m) => {
            return { value: m.id, label: m.moodName }
        });
    }

    renderSongs() {
        if (this.state.filteredSongs != null) {
            return this.state.filteredSongs.map((s) => <Song song={s} key={s.id}></Song>);
        } else {
            return this.state.songs.map((s) => <Song song={s} key={s.id}></Song>);
        }
    }

    onInputChange(event) {
        console.log(event.target.value);
        if (this.state.filteredSongs !== null && event.target.value !== "") {
            this.setState({filteredSongs : this.state.filteredSongs.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase()))});
        } else if (event.target.value !== "") {
            this.setState({filteredSongs : this.state.songs.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase()))})
        } else {
            this.setState({filteredSongs : null})
        }
    }

    handleOnChange(event) {
        console.log(event);
        let filteredSongs = []
        if (event !== null && event.length > 0) {
            for (let i = 0; i < event.length; i++) {
                const element = event[i].value;
                for (let y = 0; y < this.state.songs.length; y++) {
                    const song = this.state.songs[y];
                    if (song.moodId == element) {
                        filteredSongs.push(song);
                    }    
                }
            }
            this.setState({filteredSongs : filteredSongs});
        } else {
            this.setState({filteredSongs : null});
        }
    }

    render() {
        return <div className="page-content">
            <div className="all-songs">
                <div className="song-header">
                    {this.renderAddSongLink()}
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label className="label">Filter by mood</Form.Label>
                                <Select isMulti={true} className="select" name="moodNames" onChange={this.handleOnChange} options={this.state.options} isClearable={true}></Select>
                            </Col>
                            <Col>
                                <Form.Label className="label">Search by title</Form.Label>
                                <Search onInputChange={this.onInputChange}></Search>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="list-of-songs">
                    {this.renderSongs()}
                </div>
            </div>
        </div>
    }
}

export default AllSongs