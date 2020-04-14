import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useFilters } from '../../services/filter/Filter';
import FiltreChoice from '../filtre-choice/FiltreChoice';

export default function Header() {

    const [loading, setLoading] = useState(true);
    const [filterChoice, setFilterChoice] = useState('data-title');
    const filterChoiceRef = useRef(filterChoice);
    const filters = useFilters();
    const classes = useStyles();
useEffect(() => {
    if(filters.tags){
        setLoading(false)
    }
    return () => {
        console.log('cleanup')
    };
}, [filters]);

useEffect(() => {
    filterChoiceRef.current = filterChoice
}, [filterChoice]);

// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleChange = (filtre, event) => {
        const inputname = event.target.value
        filters.filterName(inputname, filtre)        
    }
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const cbChoice = newchoice => {
        setFilterChoice(newchoice)       
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={7} sm={8}>
                        <Link to="/">
                            <Typography variant="h6">
                                Logo
                            </Typography>
                        </Link>
                    </Grid> 
                    { loading ? "loading" :
                    <Grid item xs={5} sm={4}>
                        <Grid  container >
                            <Grid item xs={4} className="flex-center">
                                <FiltreChoice  cb={cbChoice}/>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container className={classes.search}>
                                    <Grid item xs={3} lg={1} className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </Grid>
                                    <Grid item xs={9}  lg={11}>
                                        <InputBase
                                        placeholder="Search..."
                                        type="search"
                                        onChange={(e) => handleChange(filterChoiceRef.current, e)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>                   
                        </Grid>
                    </Grid> 
                    }
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