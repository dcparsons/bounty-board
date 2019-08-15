import React from 'react';

export default class Leaderboard extends React.Component {

    firstPlace = "";
    secondPlace = "";
    thirdPlace = "";
    totalPoints = 0;

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.users.length <= 0) return;
        var arr = [];
        for (var x = 0; x <= 2; x++) {
            arr.push(nextProps.users[x].Name + "(" + nextProps.users[x].Points + ")");
        }


        this.firstPlace = arr[0];
        this.secondPlace = arr[1];
        this.thirdPlace = arr[2];
        this.totalPoints = this.props.totalPoints;

        return true;
    }

    render() {
        return (
            <div>
                1st: {this.firstPlace} | 2nd: {this.secondPlace} | 3rd: {this.thirdPlace} | Total Team Points: {this.totalPoints}
            </div>
        );
    }
}