import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { videodirseries } from '../../utils/utils';


const SaisonEpisodeChoice = props => {
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElEpisode, setAnchorElEpisode] = React.useState(null);

    const [cosmetique, setCosmetique] = useState(props.last_season ? `Saison ${props.data[props.last_season].numero}` :  `Saison ${props.data[0].numero}` );
    const [cosmetiqueEpisode, setCosmetiqueEpisode] = useState(props.last_season && props.last_episode ? `Episode ${props.data[props.last_season].episodes[props.last_episode].numero}` :  `Episode ${props.data[0].episodes[0].numero}` );
    const [saisonCurrent, setSaisonCurrent] = useState(props.last_season ? props.last_season : 0);
    const [episodeMenu, setEpisodeMenu] = useState(null);
    const [saisonMenu, setSaisonMenu] = useState(null);

// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        const createEpisodeMenu = (data) => {   
            const menu = data.map( (item) => 
                <MenuItem key={item.id} value={item.numero} onClick={() => insideHandleCloseEpisode(true, null, item)}>{`Episode ${item.numero}`}</MenuItem>   
            );
            return menu;   
        };
        const insideHandleCloseEpisode = (isChoiced, choice = null, newcos = null) => {
            setAnchorElEpisode(null);
            if(isChoiced){
                props.changeSrc(videodirseries+newcos.videoName)
                setCosmetiqueEpisode(`Episode ${newcos.numero}`)
            }
        };
        setEpisodeMenu(createEpisodeMenu(props.data[saisonCurrent].episodes))
    }, [saisonCurrent, props]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        const createSaisonMenu = (data) => {   
            const menu = data.map( (item, i) => 
            <MenuItem key={item.id} value={item.numero} onClick={() => handleClose(true, i, item.numero)}>{`Saison ${item.numero}`}</MenuItem>
            );
            console.log(menu)
            return menu;   
        };
        setSaisonMenu(createSaisonMenu(props.data))
    }, [props.data]);
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
const handleClose = (isChoiced, choice = null, newcos = null) => {
    setAnchorEl(null);
    if(isChoiced){
        setSaisonCurrent(choice)
        setCosmetique(`Saison ${newcos}`)
    }
};
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleCloseEpisode = (isChoiced, choice = null, newcos = null) => {
    setAnchorElEpisode(null);
    if(isChoiced){
        props.changeSrc(videodirseries+newcos.videoName)
        setCosmetiqueEpisode(`Episode ${newcos.numero}`)
    }
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
                    onClose={() => handleClose(false)}
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
                    onClose={() => handleCloseEpisode(false)}
                    >
                    {episodeMenu ? episodeMenu : "loading"}
                </Menu>
            </Grid>
        </Grid>
    )
}

export default SaisonEpisodeChoice;