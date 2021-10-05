import GlobalVariables from './GlobalVariables';
import { authHeader } from '../helpers/AuthHeader';

const SongService = {

    getSongsByMood: async function(moodId) {
        const songs = GlobalVariables.axios.get('/songs?moodId=' + moodId)
            .then(function (response) {
                return response.data;
             })
             .catch(function (error) {
                return error
             });

        return songs;
    },

    uploadAudio: async function(formData) {
        let config = {
            headers : authHeader()
        }

        const response = GlobalVariables.axios.post('/songs/upload', formData, config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    },

    postSong: async function(song) {
        let config = {
            headers : authHeader()
        }

        const response = GlobalVariables.axios.post('/songs', song, config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    },

    getAllSongs: async function() {
        const response = GlobalVariables.axios.get('/songs')
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    },

    getSong: async function(id) {
        const response = GlobalVariables.axios.get('/songs/' + id)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    }

}

export default SongService;