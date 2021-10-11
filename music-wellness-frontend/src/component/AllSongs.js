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
        this.ratings = {
            ASCENDING: "Lowest rated first",
            DESCENDING: "Highest rated first",
            MOST_POPULAR: "Most rated first",
            LEAST_POPULAR: "Least rated first"
        };
        this.state = {
            filterByTitleCount: 0,
            titlePreviousState: [],
            songs: [],
            moods: [],
            options: [],
            ratingOptions: [
            { value: this.ratings.MOST_POPULAR, label: this.ratings.MOST_POPULAR }, 
            { value: this.ratings.ASCENDING, label: this.ratings.ASCENDING }, 
            { value: this.ratings.DESCENDING, label: this.ratings.DESCENDING }, 
            { value: this.ratings.LEAST_POPULAR, label: this.ratings.LEAST_POPULAR }
            ],
            filteredSongs: null
        };
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.renderSongs = this.renderSongs.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.sortSongsArray = this.sortSongsArray.bind(this);
        this.filterSongArray = this.filterSongArray.bind(this);
    }

    componentDidMount() {
        SongService.getAllSongs().then((data) => {
            this.setState({ songs: data });
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
        if (this.state.filterByTitleCount === 0 ) {
            this.setState({titlePreviousState : this.state.filteredSongs});
        }
        if (this.state.filteredSongs !== null && event.target.value !== "") {
            this.setState({filteredSongs : this.state.filteredSongs.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase()))});
        } else if (event.target.value !== "") {
            this.setState({filteredSongs : this.state.songs.filter(f => f.title.toLowerCase().includes(event.target.value.toLowerCase()))})
        } else {
            this.setState({filteredSongs : this.state.titlePreviousState})
        }
        this.setState({filterByTitleCount : this.state.filterByTitleCount + 1})
    }

    handleOnChange(event) {
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
        this.setState({filterByTitleCount : 0})
    }

    filterSongArray(element, filteredSongs, songArray) {
        for (let y = 0; y < songArray.length; y++) {
            const song = songArray[y];
            console.log(song);
            if (song.moodId == element) {
                filteredSongs.push(song);
            }
        }
    }

    handleRatingChange(event) {
        if (event !== null) {
            if (this.state.filteredSongs === null) {
                this.sortSongsArray(event, this.state.songs);
            } else {
                this.sortSongsArray(event, this.state.filteredSongs);
            }
        } else {
            this.setState({filteredSongs : null});
        }
        this.setState({filterByTitleCount : 0})
    }

    sortSongsArray(event, songsArray) {
        if (event.value === this.ratings.DESCENDING) {
            this.setState({ filteredSongs: [...songsArray].sort((a, b) => b.averageRating - a.averageRating) });
        } else if (event.value === this.ratings.ASCENDING) {
            this.setState({ filteredSongs: [...songsArray].sort((a, b) => a.averageRating - b.averageRating) });
        } else if (event.value === this.ratings.MOST_POPULAR) {
            this.setState({ filteredSongs: [...songsArray].sort((a, b) => b.ratingCount - a.ratingCount) });
        } else if (event.value === this.ratings.LEAST_POPULAR) {
            this.setState({ filteredSongs: [...songsArray].sort((a, b) => a.ratingCount - b.ratingCount) });
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
                                <Form.Label className="label">Sort by ratings</Form.Label>
                                <Select className="select" name="ratings" onChange={this.handleRatingChange} options={this.state.ratingOptions} isClearable={true}></Select>
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