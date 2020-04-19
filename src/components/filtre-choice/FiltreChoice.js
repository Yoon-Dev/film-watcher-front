import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';

const FiltreChoice = props => {
    const {pathname} = useLocation() 
    console.log(pathname)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cosmetique, setCosmetique] = useState('titre');
    const handleClick = (event) => {   
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = (isChoiced, choice = null, newcos = null) => {
        setAnchorEl(null);
        // send data to parent component
        if(isChoiced){
            props.cb(choice)
            setCosmetique(newcos)
        }
    };
    return(
        <div>
            <Button onClick={handleClick} color="inherit">{cosmetique}</Button>
            <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(false)}
            >
                <MenuItem onClick={() => handleClose(true, 'data-title', 'titre')}>Titre</MenuItem>
                <MenuItem onClick={() => handleClose(true, 'data-tags', 'type')}>Type</MenuItem>
                <MenuItem onClick={() => handleClose(true, 'data-acteurs', pathname === "/" ? 'acteurs' : 'chaîne')}>{pathname === "/" ? "Acteurs" : "Chaîne"}</MenuItem>
                <MenuItem onClick={() => handleClose(true, 'data-realisateur', 'realisateur')}>Realisateur</MenuItem>
            </Menu>
        </div>

    )
}

export default FiltreChoice;