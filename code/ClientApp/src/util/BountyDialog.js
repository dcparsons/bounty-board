import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class BountyDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.IsOpen} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Take Bounty</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Provide the information below to pickup this bounty.
                        </DialogContentText>
                        Selected Bounty: {this.props.selectedBounty}
                        <br />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="empid"
                            label="Employee ID"
                            onChange={this.props.onEmployeeIDChange}
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Cancel </Button>
                        <Button onClick={this.props.takeBounty} color="primary">
                            Take Bounty </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}