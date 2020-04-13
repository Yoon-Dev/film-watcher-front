import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const FiltreChoice = props => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cosmetique, setCosmetique] = useState('movie');
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
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(false)}
            >
            <MenuItem onClick={() => handleClose(true, 'data-title', 'movies')}>Movies</MenuItem>
            <MenuItem onClick={() => handleClose(true, 'data-tags', 'tags')}>Tags</MenuItem>
            <MenuItem onClick={() => handleClose(true, 'data-acteurs', 'acteurs')}>Acteurs</MenuItem>
            <MenuItem onClick={() => handleClose(true, 'data-realisateur', 'realisateur')}>Realisateur</MenuItem>
        </Menu>
        </div>

    )
}

export default FiltreChoice;