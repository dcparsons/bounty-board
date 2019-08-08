import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import API from '../../util/BountyAPI';

export default class BountyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bounties: [],
            listState: []
        }
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
        console.log("ID is: " + id);

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
        console.log(this.state.listState[idx].IsListExpanded);
        return this.state.listState[idx].IsListExpanded;
    }

    render() {
        return (
            <div>
                <List>
                    {this.state.bounties.map(item => {

                        if (item.Children.length === 0) {
                            return (
                                <ListItem button>
                                    <ListItemText primary={item.Title} />
                                </ListItem>
                            );
                        }
                        else {
                            return (
                                <div>
                                    <ListItem button onClick={ () => this.setListState(item.ID) } >
                                        <ListItemText primary={item.Title} />
                                        {
                                            this.getListState(item.ID) ? <ExpandLess /> : <ExpandMore />
                                        }
                                    </ListItem>
                                    <Collapse in={ this.getListState(item.ID) } timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                item.Children.map(item => {
                                                    return (
                                                        <ListItem button>
                                                            <ListItemText primary={item.Title} />
                                                        </ListItem>
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
            </div>
                );
            }
        }