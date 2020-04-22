import React, { useState } from 'react';
import { videodir } from '../../utils/utils';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const MovieChoice = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cosmetique, setCosmetique] = useState(props.videos[0].name);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleClick = (event) => {   
        setAnchorEl(event.currentTarget);
    };
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleClose = (isChoiced, choice = null, newcos = null) => {
        setAnchorEl(null);
        // send data to parent component
        if(isChoiced){
            props.videoChange(choice)
            setCosmetique(newcos)
        }
    };
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    if(props.videos.length < 2){
        return(
            <Typography variant="h6" component="p">
                {cosmetique}
            </Typography>
        )
    }else{
        return(
        <div>
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
            {props.videos.map((video) => (
                <MenuItem key={video.id} value={video.name} onClick={() => handleClose(true, videodir+video.video_name, video.name)}>
                {video.name}
                </MenuItem>
            ))}
            </Menu>
        </div>
        )  
    }

}

export default MovieChoice;