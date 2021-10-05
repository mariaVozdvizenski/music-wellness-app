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


function MusicListening() {
        const [mood, setMood] = useState({moodName: ""});
        const audioURL = "/songs/download?fileName=";
        const [songURLS, setSongURLS] = useState([]);

        let { moodId, songId } = useParams();

        useEffect(() => {
            if (songId) {
                SongService.getSong(songId).then(data => {
                    let urls = getSongUrl(data);
                    setSongURLS(urls);
                })
                .then(() => { MoodService.getMood(moodId).then(data => {
                    data.moodName = data.moodName.toLowerCase();
                    setMood(data);
                })});
            } else if (moodId) {
                SongService.getSongsByMood(moodId).then(data => {
                    let urls = getSongUrls(data);
                    setSongURLS(urls);
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
                    singer : songs[i].artist
                };
                fullUrls.push(audioObj);
            }
            return fullUrls;
        }

        const getSongUrl = (song) => {
            const audioObj = { 
                musicSrc : GlobalVariables.baseURL + audioURL + song.fileName,
                name :  song.title,
                singer : song.artist
            };
            return [audioObj];
        }

        return (<div className="music-listening"> 
            <div className="music-listening-bg"></div>
            <h1>Creating a {mood.moodName} mood...</h1>
            <Gif name="energetic" source="An Artist"></Gif>
            <MusicPlayer songs={songURLS}></MusicPlayer>
        </div>
        );
}

export default MusicListening