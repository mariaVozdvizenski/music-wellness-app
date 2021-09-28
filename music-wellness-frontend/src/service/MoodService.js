import GlobalVariables from './GlobalVariables'

const MoodService = {

    getAllMoods: async function() {
        const moods = GlobalVariables.axios.get('/moods')
            .then(function (response) {
                return response.data;
             })
             .catch(function (error) {
                return error
             });
        return moods;
    },

    getMood: async function(moodId) {
        const mood = GlobalVariables.axios.get('/moods/' + moodId)
            .then(function (response) {
                return response.data;
             })
             .catch(function (error) {
                return error
             });
        return mood;
    }

}

export default MoodService;