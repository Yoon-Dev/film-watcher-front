import React, { useState, useEffect, useRef } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

const OneStep = props => {
    const [dir, setDir] = useState(null);
    const [last_saison, setLast_saison] = useState(null);
    const [last_episode, setLast_episode] = useState(null);
    const dirRef = useRef(dir)
    useEffect(() => {
        setLast_saison(props.last_saison)
        setLast_episode(props.last_episode)
        switch (true) {
            case (props.direct === "left" && props.last_episode > 0) || (props.direct === "left" && props.last_saison > 0):
                setDir('left') 
                break;
            case (props.direct === 'right' && props.last_episode !== (props.data[props.last_saison].episodes.length - 1)) || (props.direct === 'right' && props.last_saison !== props.data.length-1):
                setDir('right')
                break;
            default:
                setDir(false)
                break;
        }
    }, [props]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        dirRef.current = dir
    }, [dir]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleClick = () => {
        console.log(props.direct, props.last_saison, props.last_episode, typeof(props.last_episode), props.data, props.changeSrc)
        if(dir === "right"){
            if(last_episode < props.data[last_saison].episodes.length-1){
                setLast_episode(last_episode+1)
                props.changeSrc(last_saison, last_episode+1)
            }else{
                setLast_saison(last_saison+1)
                setLast_episode(0)
                props.changeSrc(last_saison+1, 0)
            }
        }else{
            if(last_episode < 1){
                setLast_saison(last_saison-1)
                setLast_episode(props.data[last_saison-1].episodes.length-1)
                props.changeSrc(last_saison-1, props.data[last_saison-1].episodes.length-1)
            }else{
                setLast_episode(last_episode-1)
                props.changeSrc(last_saison, last_episode-1)
            }
        }
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    if(!dir){
        return(null)
    }else{
        return(
            <Button onClick={handleClick}>
                { dir === "left" ? <ArrowBackIcon fontSize="large"/> : dir === "right" ? <ArrowForwardIcon fontSize="large"/> : null} 
            </Button>
        )
    }

}

export default OneStep;
