import GlobalVariables from './GlobalVariables';
import { authHeader } from '../helpers/AuthHeader';


const UserRatingService = {

    getUserSongRating: async function(userId, songId) {
        let config = {
            headers : authHeader()
        }

        const userRating = GlobalVariables.axios.get('/songratings/' + userId + '/' + songId, config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    return { rating : 0 }
                }
                return error
            });
        return userRating;
    },

    postNewUserSongRating: async function(songRating) {
        let config = {
            headers : authHeader()
        }

        const userRating = GlobalVariables.axios.post('/songratings/', songRating, config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error
            });

        return userRating;
    },

    updateUserSongRating: async function (songRatingId, songRating) {
        let config = {
            headers : authHeader()
        }

        const userRating = GlobalVariables.axios.put('/songratings/' + songRatingId, songRating, config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error
            });

        return userRating;
    }
}

export default UserRatingService;