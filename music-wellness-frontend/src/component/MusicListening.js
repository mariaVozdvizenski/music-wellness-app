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

        let { id } = useParams();

        useEffect(() => {
            SongService.getSongsByMood(id).then(data => {
                let urls = getSongUrls(data)
                setSongURLS(urls);
            })
            .then(() => { MoodService.getMood(id).then(data => {
                data.moodName = data.moodName.toLowerCase();
                setMood(data);
            })});
        }, []);

        const getSongUrls = (songs) => {
            let fullUrls = [];
            for (let i = 0; i < songs.length; i++) {
                const audioObj = { 
                    musicSrc : GlobalVariables.baseURL + audioURL + songs[i].fileName,
                    name : songs[i].title,
                    singer : songs[i].artist,
                    cover: "https://drive.google.com/file/d/1u0fKy-_9CHMi4IyM_iurrGeUKm08ALVn/"
                };
                fullUrls.push(audioObj);
            }
            return fullUrls;
        }

        return (<div className="music-listening"> 
            <div className="music-listening-bg"></div>
            <h1>Creating a {mood.moodName} mood...</h1>
            <Gif name="energetic"></Gif>
            <MusicPlayer songs={songURLS}></MusicPlayer>
        </div>
        );
}

export default MusicListening