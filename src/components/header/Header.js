import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFilters } from '../../services/filter/Filter';
import FiltreChoice from '../filtre-choice/FiltreChoice';
import { store } from '../../redux/store';
import './Header.css';
import Loading from '../loading/Loading';
import EndAdornment from '../end-adornment/EndAdornment';

export default function Header() {

    const [loading, setLoading] = useState(true);
    const [filterChoice, setFilterChoice] = useState('data-title');
    const [filterActive, setFilterActive] = useState(true);
    const filterChoiceRef = useRef(filterChoice);
    const [values, setValues] = useState({
        input: ""
    });    
    const filters = useFilters();
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1280px)');
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        store.subscribe(() => {
            if(store.getState()){
                setFilterActive(false)
            }else{
                setFilterActive(true)
            }
        })
        console.log(store.getState())
        if(filters.tags){
            setLoading(false)
        }
        return () => {
            console.log('cleanup')
        };
    }, [filters]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        filterChoiceRef.current = filterChoice
    }, [filterChoice]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleChange = (filtre, event, prop) => {
        let inputname = '';
        if(event){
            inputname = event.target.value
            setValues({ ...values, [prop]: event.target.value });
        }

        filters.filterName(inputname, filtre)        
    }
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleClick = () => {
        setValues({ input: "" });
        handleChange(filterChoiceRef.current, null, 'input')
    };
//   °°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const cbChoice = newchoice => {
        setFilterChoice(newchoice)       
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                        <Link to="/">
                            <img src="./logo.gif" alt="logo" className="logo"/>
                        </Link>
                    </Grid> 
                    { loading ? <Loading big={false}/> : !filterActive ? null :
                    <Fragment>
                        <Grid item xs={5} lg={1} className={matches ? `flex-start` : `flex-end`}>
                            <FiltreChoice  cb={cbChoice}/>
                        </Grid>
                        <Grid item xs={6} lg={10} className="flex-start">
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <div>
                                    <InputBase
                                    placeholder="Search..."
                                    type="text"
                                    value={values.input}
                                    onChange={(e) => handleChange(filterChoiceRef.current, e, 'input')}
                                    endAdornment={<EndAdornment click={() => handleClick()} value={values}/>}
                                    autoFocus={true}
                                    size="large"
                                    />
                                </div>
                            </div>
                        </Grid> 
                    </Fragment>      
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
      '&:focus': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      display: 'inline-flex',
      padding: '.6em',
      boxShadow: '7px 7px 14px #575757, -7px -7px 14px #6b6b6b;',
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
  }));