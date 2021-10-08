import {React, useState, useEffect} from 'react';
import './MusicListening.css';
import MusicPlayer from './MusicPlayer';
import SongService from '../service/SongService'
import Gif from './Gif';
import {
    useParams
} from "react-router-dom";
import MoodService from '../service/MoodService';
import GlobalVariables from '../service/GlobalVariables';
import Rating from '@mui/material/Rating';


function MusicListening() {
        const [mood, setMood] = useState({moodName: ""});
        const audioURL = "/songs/download?fileName=";
        const [songURLS, setSongURLS] = useState([]);
        const [currentSong, setCurrentSong] = useState({averageRating : 0});
        const [songs, setSongs] = useState([]);
        const [musicPlayerAudioList, setMusicPlayerAudioList] = useState([]);

        let { moodId, songId } = useParams();

        useEffect(() => {
            if (songId) {
                SongService.getSong(songId).then(data => {
                    let urls = getSongUrl(data);
                    setSongURLS(urls);
                    setCurrentSong({...data});
                })
                .then(() => { MoodService.getMood(moodId).then(data => {
                    data.moodName = data.moodName.toLowerCase();
                    setMood(data);
                })});
            } else if (moodId) {
                SongService.getSongsByMood(moodId).then(data => {
                    setSongs(data);
                    let urls = getSongUrls(data);
                    setSongURLS(urls);
                    setCurrentSong({...data[0]});
                })
                .then(() => { MoodService.getMood(moodId).then(data => {
                    data.moodName = data.moodName.toLowerCase();
                    setMood(data);
                })});
            }
        }, []);

        const getSongUrls = (songs) => {
            let fullUrls = [];
            for (let i = 0; i < songs.length; i++) {
                const audioObj = { 
                    musicSrc : GlobalVariables.baseURL + audioURL + songs[i].fileName,
                    name :  songs[i].title,
                    singer : songs[i].artist,
                    id : songs[i].id,
                    averageRating : songs[i].averageRating,
                    ratingCount: songs[i].ratingCount,
                    title : songs[i].title,
                    artist : songs[i].artist
                };
                fullUrls.push(audioObj);
            }
            return fullUrls;
        }

        const getSongUrl = (song) => {
            const audioObj = { 
                musicSrc : GlobalVariables.baseURL + audioURL + song.fileName,
                name :  song.title,
                singer : song.artist,
                id : song.id,
                avgRating : song.averageRating,
                ratingCount: song.ratingCount,
                title : song.title,
                artist : song.artist
            };
            return [audioObj];
        }

        const renderSongInfo = () => {
            let firstPart = "Playing " + currentSong.title;
            if (songURLS.length !== 0) {
                return currentSong.artist !== null ? firstPart + " by " + currentSong.artist : firstPart; 
            } else {
                return "Sorry, no songs have been added under this mood yet.";
            }
        }

        const onAudioListsChange = (currentPlayId,audioLists,audioInfo) => {
            setMusicPlayerAudioList(audioLists);
        }

        const onPlayIndexChange = (playIndex) => {
            if (musicPlayerAudioList.length == 0) {
                setCurrentSong(songs[playIndex]);
            } else {
                setCurrentSong(musicPlayerAudioList[playIndex]);
            }
        }

        const renderMoodInfo = () => {
            let word;
            if (isVowel(mood.moodName.charAt(0))) {
                word = "an ";
            } else {
                word = "a ";
            }
            return "Creating " + word + mood.moodName + " mood...";
        }

        const isVowel = (c) => {
            return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
        }

        const renderPlayer = () => {
            if (songURLS.length !== 0) {
                return <MusicPlayer 
                onAudioListsChange={onAudioListsChange}
                onPlayIndexChange={onPlayIndexChange}
                songs={songURLS}>
                </MusicPlayer>
            }
        }

        const getSongRating = () => {
            return currentSong.averageRating;
        }

        const renderRatingCount = () => {
            if (currentSong.ratingCount == 0) {
                return "No ratings yet."
            }
            return currentSong.ratingCount + " rating(s)."
        }

        const onRatingChange = (event) => {
            console.log(event);
        }

        return (<div className="music-listening"> 
            <div className="music-listening-bg"></div>
            <h1>{renderMoodInfo()}</h1>
            <p>{renderSongInfo()}</p>
            <div>
                <div>
                <Rating size="medium" onChange={onRatingChange} value={getSongRating()} readOnly={true}/>
                <span>{renderRatingCount()}</span>
                </div>
                <div>
                <Rating size="medium" onChange={onRatingChange} value={0}/> 
                </div>
                <span>{"Rate if this song made you feel " + mood.moodName}</span>
            </div>
            <Gif name="happy" source="An Artist"></Gif>
            <MusicPlayer 
                onAudioListsChange={onAudioListsChange}
                onPlayIndexChange={onPlayIndexChange}
                songs={songURLS}>
            </MusicPlayer>
        </div>);
}

export default MusicListening