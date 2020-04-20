import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const SaisonEpisodeChoice = props => {
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElEpisode, setAnchorElEpisode] = React.useState(null);

    const [cosmetique, setCosmetique] = useState(props.last_season ? `Saison ${props.data[props.last_season].numero}` :  `Saison ${props.data[0].numero}` );
    const [cosmetiqueEpisode, setCosmetiqueEpisode] = useState(props.last_season && props.last_episode ? `Episode ${props.data[props.last_season].episodes[props.last_episode].numero}` :  `Episode ${props.data[0].episodes[0].numero}` );
    const [saisonCurrent, setSaisonCurrent] = useState(props.last_season ? props.last_season : 0);
    const saisonCurrentRef = useRef(saisonCurrent)
    const [episodeCurrent, setEpisodeCurrent] = useState(props.last_episode ? props.last_episode : 0);
    const episodeCurrentRef = useRef(episodeCurrent)
    const [episodeMenu, setEpisodeMenu] = useState(null);
    const [saisonMenu, setSaisonMenu] = useState(null);

// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        setSaisonCurrent(props.last_season)
        setCosmetiqueEpisode(`Episode ${props.data[props.last_season].episodes[props.last_episode].numero}`)
        const createEpisodeMenu = (data) => {   
            const menu = data.map( (item, i) => 
                <MenuItem key={item.id} value={item.numero} onClick={() => insideHandleCloseEpisode(true, i, item)}>{`Episode ${item.numero}`}</MenuItem>   
            );
            return menu;   
        };
        const insideHandleCloseEpisode = (isChoiced, choice = null, newcos = null) => {
            console.log("INSIDE")
            setAnchorElEpisode(null);
            if(isChoiced){
                props.changeSrc(saisonCurrentRef.current, choice)
                setEpisodeCurrent(choice)
                setCosmetiqueEpisode(`Episode ${newcos.numero}`)
            }
        };
        setEpisodeMenu(createEpisodeMenu(props.data[props.last_season].episodes))
    }, [saisonCurrent, props]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        setCosmetique(`Saison ${props.data[props.last_season].numero}`)
        const createSaisonMenu = (data) => {   
            const menu = data.map( (item, i) => 
            <MenuItem key={item.id} value={item.numero} onClick={() => handleClose(true, i, item.numero)}>{`Saison ${item.numero}`}</MenuItem>
            );
        const handleClose = (isChoiced, choice = null, newcos = null) => {
            setAnchorEl(null);
            if(isChoiced){
                props.changeSrc(choice, episodeCurrentRef.current)
                setSaisonCurrent(choice)
                setCosmetique(`Saison ${newcos}`)
            }
        };
            return menu;   
        };
        setSaisonMenu(createSaisonMenu(props.data))
    }, [props]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        saisonCurrentRef.current = saisonCurrent
    }, [saisonCurrent]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        episodeCurrentRef.current = episodeCurrent
    }, [episodeCurrent]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleClick = (event) => {   
    setAnchorEl(event.currentTarget);
};
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleClickEpisode = (event) => {   
    setAnchorElEpisode(event.currentTarget);
};
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleClose = () => {
    setAnchorEl(null);
};
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleCloseEpisode = () => {
    setAnchorElEpisode(null);
};
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Grid container>
            <Grid item xs={6} className="flex-end"> 
                <Button onClick={handleClick} color="inherit" variant="outlined">
                    <Typography variant="h6" component="p">
                        {cosmetique}
                    </Typography>
                </Button>
                    <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose()}
                    >
                    {saisonMenu ? saisonMenu : "loading"}
                </Menu>
            </Grid>
            <Grid item xs={6} className="flex-start">
                <Button onClick={handleClickEpisode} color="inherit" variant="outlined">
                    <Typography variant="h6" component="p">
                        {cosmetiqueEpisode}
                    </Typography>
                </Button>
                    <Menu
                    anchorEl={anchorElEpisode}
                    keepMounted
                    open={Boolean(anchorElEpisode)}
                    onClose={() => handleCloseEpisode()}
                    >
                    {episodeMenu ? episodeMenu : "loading"}
                </Menu>
            </Grid>
        </Grid>
    )
}

export default SaisonEpisodeChoice;