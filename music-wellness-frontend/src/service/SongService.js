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
    },

    updateSong: async function(song) {
        let config = {
            headers : authHeader()
        }
        const response = GlobalVariables.axios.put('/songs/' + song.id, song, config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    },

    deleteSong: async function(id) {
        let config = {
            headers : authHeader()
        }
        const response = GlobalVariables.axios.delete('/songs/' + id, config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                return error
             });

        return response;
    },

    deleteAudio: async function(fileName) {
        let config = {
            headers : authHeader()
        }
        const response = GlobalVariables.axios.delete('/songs/delete?fileName=' + fileName, config)
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