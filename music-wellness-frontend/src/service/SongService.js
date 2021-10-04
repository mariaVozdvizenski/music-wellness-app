import GlobalVariables from './GlobalVariables'

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
        const response = GlobalVariables.axios.post('/songs/upload', formData)
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