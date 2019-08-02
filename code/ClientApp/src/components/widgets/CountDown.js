import React from 'react';


export default class CountDown extends React.Component {
    _timer;

    constructor(props) {
        super(props);
        this.state = {
            remaningSeconds: 10405402
        }
    }

    componentDidMount() {
        this._timer = setInterval(() => {
            this.decrementTimeRemaining();
        }, 1000)
    }

    decrementTimeRemaining() {
        if (this.state.remaningSeconds > 0) {
            this.setState({
                remaningSeconds: this.state.remaningSeconds - 1
            });
            return;
        }

        clearInterval(this._timer);
    }

    secondsToTime() {
        var dtm = new Date(this.state.remaningSeconds);
        return dtm.toISOString();
    }

    render() {
        return (
            <div>
                Time Remaining: {this.secondsToTime()}
            </div>
            );
    }
}