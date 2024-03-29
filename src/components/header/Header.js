import React, { useEffect, useState, useRef, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFilterName } from '../../services/filter/Filter';
import FiltreChoice from '../filtre-choice/FiltreChoice';
import { store } from '../../redux/store';
import './Header.css';
import Loading from '../loading/Loading';
import EndAdornment from '../end-adornment/EndAdornment';
import Logo from '../logo/Logo';


export default function Header() {
    const [loading, setLoading] = useState(true);
    const [filterChoice, setFilterChoice] = useState('data-title');
    const [filterActive, setFilterActive] = useState(true);
    const filterChoiceRef = useRef(filterChoice);
    const [values, setValues] = useState({
        input: ""
    });    
    const filterfct = useFilterName();
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1280px)');
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(store.getState().general){
            setFilterActive(false)
        }else{
            setFilterActive(true)
        }
        if(filterfct){
            setLoading(false)
        }
    }, [filterfct]);
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

        filterfct(inputname, filtre)        
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
// Crée un composant LOGO qui permet de choisir entre FILM et SERIE, rester appyer dessus permet de changer de composant PAGE (ROOT/ROOTSERIES)
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Logo filterActive={filterActive} loading={loading}/>
                    { loading ? <Loading big={false}/> : !filterActive ? null :
                    <Fragment>            
                        <Grid item xs={6} sm={7}lg={2} className="flex-end">
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
                        <Grid item xs={6} sm={3}lg={1} className={matches ? `flex-center` : `flex-start`}>
                            <FiltreChoice  cb={cbChoice}/>
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
      transition: 'all .3s ease',
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
  }));