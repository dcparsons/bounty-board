import axios from 'axios';

export default {
    getBounties: function () {
        return axios.get(process.env.REACT_APP_API_URL + "bounty/GetBounties");
    },
    getUsers: function (userID) {
        return axios.get(process.env.REACT_APP_API_URL + "bounty/GetUsers", {
            params : { id: userID }
        });
    },
    isEmployeeIDValid: function (empID) {
        return axios.get(process.env.REACT_APP_API_URL + "bounty/IsEmployeeIDValid", {
            params: { id : empID }
        });
    },
    assignBounty: function (empID, bounty) {
        return axios.post(process.env.REACT_APP_API_URL + "bounty/AssignBounty", {
            UserID: empID,
            BountyID : bounty
        });
    }
}