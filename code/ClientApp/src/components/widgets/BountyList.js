import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';

import BountyDialog from '../../util/BountyDialog';
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
            dialogIsOpen: false
        }

        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
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
        var val = this.state.dialogIsOpen;

        this.setState({
            dialogIsOpen: !val
        });
    }

    handleDialogOpen() {
        this.setState({
            dialogIsOpen: true
        });
    }

    render() {
        return (
            <div>
                <List className={this.styles.root}>
                    {this.state.bounties.map(item => {

                        if (item.Children.length === 0) {
                            return (
                                <Tooltip title="Click to accept bounty">
                                    <ListItem button onClick={this.handleDialogOpen}>
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
                                                            <ListItem button onClick={() => this.handleDialogOpen} className={this.styles.nested}>
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
                <BountyDialog IsOpen={this.state.dialogIsOpen} onClose={this.handleDialogClose} />
            </div>
                );
            }
        }