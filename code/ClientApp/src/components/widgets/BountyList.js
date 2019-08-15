import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import API from '../../util/BountyAPI';

export default class BountyList extends React.Component {

    styles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(20),
        },
    }))

    constructor(props) {
        super(props);
        this.state = {
            bounties: [],
            listState: [],
            selectedBounty: {},
            dialogIsOpen: false,
            selectedEmployeeID: 0,
            takeBountyButtonDisabled: true,
            dialogErrorText : ""
        }

        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.onEmployeeIDChange = this.onEmployeeIDChange.bind(this);
        this.takeBounty = this.takeBounty.bind(this);
    }

    componentDidMount() {
        var component = this;
        API.getBounties().then(res => {

            var tempArr = [];
            res.data.filter(x => x.Children.length > 0).map(item => {

                tempArr.push(
                    {
                        ID: item.ID,
                        IsListExpanded: false
                    }
                );
            });

            component.setState({
                bounties: res.data,
                listState: tempArr
            });

        })
    }

    setListState(id) {
        var tempListArray = this.state.listState;

        var idx = tempListArray.map(item => { return item.ID; }).indexOf(id);

        var retval = !tempListArray[idx].IsListExpanded;
        tempListArray[idx].IsListExpanded = retval;

        this.setState({
            listState: tempListArray
        });
    }

    getListState(id) {
        var idx = this.state.listState.map(item => { return item.ID; }).indexOf(id);
        return this.state.listState[idx].IsListExpanded;
    }

    handleDialogClose() {
        this.setState({
            dialogIsOpen: false,
            dialogErrorText: '',
            takeBountyButtonDisabled: false,
            selectedBounty: {},
            selectedEmployeeID: 0
        });
    }

    handleDialogOpen(selectedItem) {
        
        this.setState({
            selectedBounty: selectedItem,
            dialogIsOpen: true
        });
    }

    onEmployeeIDChange(event) {
        var employeeID = event.target.value;
        if (employeeID.length < 5) {

            this.setState({
                takeBountyButtonDisabled: true
            });

            return;
        }

        this.setState({
            selectedEmployeeID: employeeID
        });

        API.isEmployeeIDValid(employeeID).then(res => {
            if (res.data) {
                this.setState({
                    takeBountyButtonDisabled : false,
                    dialogErrorText: ''
                });
            }
            else {
                this.setState({
                    takeBountyButtonDisabled: true,
                    dialogErrorText: 'Invalid ID. Try Again'
                });
            }
        })
    }

    takeBounty() {
        API.assignBounty(this.state.selectedEmployeeID, this.state.selectedBounty.ID).then(res => {
            console.log("after assignment");
        });
        this.handleDialogClose();
    }

    render() {
        return (
            <div>
                <List className={this.styles.root}>
                    {this.state.bounties.map(item => {

                        if (item.Children.length === 0) {
                            return (
                                <Tooltip title="Click to accept bounty">
                                    <ListItem button onClick={() => this.handleDialogOpen(item)}>
                                        <ListItemText primary={item.Title + ' - ' + item.Points + 'pts'} secondary={item.Description} />
                                    </ListItem>
                                </Tooltip>
                            );
                        }
                        else {
                            return (
                                <div>
                                    <ListItem button onClick={ () => this.setListState(item.ID) } >
                                        <ListItemText primary={item.Title + ' - ' + item.Points + 'pts'} secondary={item.Description} />
                                        {
                                            this.getListState(item.ID) ? <ExpandLess /> : <ExpandMore />
                                        }
                                    </ListItem>
                                    <Collapse in={ this.getListState(item.ID) } timeout="auto" unmountOnExit>
                                        <List component="div">
                                            {
                                                item.Children.map(item => {
                                                    return (
                                                        <Tooltip title="Click to accept bounty">
                                                            <ListItem button onClick={() => this.handleDialogOpen(item)} className={this.styles.nested}>
                                                                <ListItemText primary={item.Title + ' - ' + item.Points + 'pts'} secondary={item.Description} />
                                                            </ListItem>
                                                        </Tooltip>
                                                    );
                                                })
                                            }
                                        </List>
                                    </Collapse>
                                </div>
                                    )
                             }
                             })}
                </List>

                <Dialog open={this.state.dialogIsOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Take Bounty</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Provide the information below to pickup this bounty.
                        </DialogContentText>
                        Selected Bounty: {this.state.selectedBounty.Title}
                        <br />
                        <b>{this.state.dialogErrorText}</b>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="empid"
                            label="Employee ID"
                            onChange={this.onEmployeeIDChange}
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
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel </Button>
                        <Button onClick={this.takeBounty} disabled={this.state.takeBountyButtonDisabled} color="primary">
                            Take Bounty </Button>
                    </DialogActions>
                </Dialog>

            </div>
                );
            }
        }