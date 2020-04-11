import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';

export default function Header() {

    const classes = useStyles();
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Link to="/">
                            <Typography variant="h6">
                                Logo
                            </Typography>
                        </Link>
                    </Grid> 
                    <Grid item xs={3}>
                        <Grid  container className={classes.search}>
                            <Grid item xs={1} className={classes.searchIcon}>
                                <SearchIcon />
                            </Grid>
                            <Grid item xs={11}>
                                <InputBase
                                placeholder="Search…"
                                />
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>


            </Toolbar>
        </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
    search: {
    //   position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    //   marginRight: theme.spacing(2),
    //   marginLeft: 0,
    //   width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    //   },
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
  }));