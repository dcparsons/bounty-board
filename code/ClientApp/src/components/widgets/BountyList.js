import React from 'react';

export default class BountyList extends React.Component {
    _timer;

    constructor(props) {
        super(props);
        this.state = {
            bounties = props.bounties
        }
    }

    render() {
        return (
            <div>
                {this.state.bounties}
            </div>
        );
    }
}