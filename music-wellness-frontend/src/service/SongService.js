import GlobalVariables from './GlobalVariables'

const SongService = {

    getSongsByMood: async function(moodId) {
        const songs = GlobalVariables.axios.get('/songs?moodId=' + moodId)
            .then(function (response) {
                console.log(response.data);
                return response.data;
             })
             .catch(function (error) {
                return error
             });

        return songs;
    }

}

export default SongService;