import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

import Navigator from './components/theme/Navigator';
import Header from './components/theme/Header';

import Dashboard from './components/pages/Dashboard';
import Leaderboard from './components/pages/Leaderboard';
import Bounties from './components/pages/Bounties';

import API from './util/BountyAPI';

let theme = createMuiTheme({
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

theme = {
    ...theme,
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1),
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
                margin: '0 16px',
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up('md')]: {
                    padding: 0,
                    minWidth: 0,
                },
            },
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1),
            },
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
            },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#404854',
            },
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        MuiListItemIcon: {
            root: {
                color: 'inherit',
                marginRight: 0,
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32,
            },
        },
    },
    props: {
        MuiTab: {
            disableRipple: true,
        },
    },
    mixins: {
        ...theme.mixins,
        toolbar: {
            minHeight: 48,
        },
    },
};

const drawerWidth = 256;

const styles = {
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    mainContent: {
        flex: 1,
        padding: '48px 36px 0',
        background: '#eaeff1',
    },
};

class App extends React.Component {
    state = {
        mobileOpen: false,
        users: [],
        totalPoints: 0
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    componentDidMount() {
        API.getUsers(null).then(res => {
            var totalPoints = 0;
            var users = res.data;

            for (var x = 0; x < users.length; x++) {
                totalPoints += users[x].Points;
            }

            users.sort((function (a, b) {
                return parseInt(a.Points) - parseInt(b.Points);
            }));

            this.setState({
                users: users,
                totalPoints: totalPoints
            });
        });
        
    }

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <BrowserRouter>
                        <CssBaseline />
                        <nav className={classes.drawer}>
                            <Hidden smUp implementation="js">
                                <Navigator
                                    PaperProps={{ style: { width: drawerWidth } }}
                                    variant="temporary"
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                />
                            </Hidden>
                            <Hidden xsDown implementation="css">
                                <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                            </Hidden>
                        </nav>
                        <div className={classes.appContent}>
                            <Header onDrawerToggle={this.handleDrawerToggle} users={this.state.users} totalPoints={this.state.totalPoints} />
                            <main className={classes.mainContent}>

                                <Route path="/" exact render={() => (<Dashboard />)} />
                                <Route path="/leaderboard" render={() => (<Leaderboard />)} />
                                <Route path="/my-bounties" render={() => (<Bounties />)} />

                            </main>
                        </div>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);