import React from 'react';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Button from '@material-ui/core/Button';
const Shuffle = props => {
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleClick = () => {
        const randSaison = Math.floor((Math.random() * Object.keys(props.data).length));
        const randEpisode = Math.floor((Math.random() * props.data[randSaison].episodes.length) + 1);
        props.changeSrc(randSaison, randEpisode, false)
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Button onClick={handleClick}>
            <ShuffleIcon fontSize="large" />
        </Button>      
    )
}

export default Shuffle;
