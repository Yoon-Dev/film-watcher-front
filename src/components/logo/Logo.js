import React, { useState, useEffect, useRef } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SwitchLink from '../switch-link/SwitchLink'
const Logo = props => {
    const selfRef = useRef()
    const {pathname} = useLocation() 
    const [isHomed, setIsHomed] = useState(true);

// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(pathname.includes("/series")){
            setIsHomed(false)
        }else{
            setIsHomed(true)
        }
    }, [pathname]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
        return(
            <Grid item xs={1} ref={selfRef}>
                <Grid container alignItems="center">
                    <Grid item xs={10}>
                        <Link to={isHomed ? "/" : "/series"}>
                            <img src={isHomed ? '/logo.gif' : '/logo2.gif'} alt="logo" className="logo"/>
                        </Link>
                    </Grid>
                    {props.loading ? null : !props.filterActive ? null : 
                    <Grid item xs={2}>
                        <SwitchLink/>
                    </Grid>
                    }
                </Grid>
            </Grid> 
        )
}

export default Logo;