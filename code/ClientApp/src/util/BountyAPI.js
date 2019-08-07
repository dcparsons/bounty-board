import axios from 'axios';

export default {
    getBounties: function () {
        return axios.get(process.env.REACT_APP_API_URL + "bounty");
    }
}