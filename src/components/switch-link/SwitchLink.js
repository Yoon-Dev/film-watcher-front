import React, { useState, useEffect } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SwitchCameraRoundedIcon from '@material-ui/icons/SwitchCameraRounded';




const SwitchLink = () => {
    const {pathname} = useLocation() 
    const [toRedirect, setToRedirect] = useState("/series");
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(pathname.includes("/series")){
            setToRedirect("/")
        }else{
            setToRedirect("/series")
        }
    }, [pathname]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Grid item xs={2}>
            <Link to={toRedirect}>
                <Button>
                    <SwitchCameraRoundedIcon color="secondary"/>
                </Button>
            </Link>
        </Grid>
    )

}

export default SwitchLink