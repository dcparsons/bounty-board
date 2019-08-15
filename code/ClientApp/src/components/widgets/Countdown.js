import React from 'react';

export default class Countdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            endDate: this.props.endDateTime,
            counterText: ''
        };

        this.timerTick = this.timerTick.bind(this);
    }

    componentDidMount() {
        setInterval(this.timerTick, 1000);
        this.timerTick();
    }

    timerTick() {
        //1000 = 1 second
        //60.000 = 1 minute
        //3.600.000 = 1 hour
        //86.400.000 = 1 day
        var currentTicks = this.props.endDateTime - Date.now();

        var days = parseInt(currentTicks / 86400000);
        currentTicks -= days * 86400000;

        var hours = parseInt(currentTicks / 3600000);
        currentTicks -= hours * 3600000;

        var mins = parseInt(currentTicks / 60000);
        currentTicks -= mins * 60000;

        var seconds = parseInt(currentTicks / 1000);
        currentTicks -= seconds * 1000;

        days = this.formatNumber(days);
        hours = this.formatNumber(hours);
        mins = this.formatNumber(mins);
        seconds = this.formatNumber(seconds);

        this.setState({
            counterText: days + " DAYS " + hours + " HOURS " + mins + " MINUTES " + seconds + " SECONDS ",
        });
    }

    formatNumber(value) {
        return value > 9 ? value : "0" + value;
    }

    render() {
        return (
            <div>
                TIME REMAINING: {this.state.counterText}
            </div>
        );
    }
}