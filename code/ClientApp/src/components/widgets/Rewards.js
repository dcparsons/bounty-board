import React from 'react';

export default class Rewards extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }


    render() {
        return (
            <div>
                Rewards Active: {this.props.totalPoints >= 500 ? "Yes" : "No"}
            </div>
        );
    }
}