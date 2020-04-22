import React, { useState, useEffect } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

const SwitchLink = () => {
    const {pathname} = useLocation() 
    const [toRedirect, setToRedirect] = useState("/series");
    const [state, setState] = useState({
        checkedA: pathname.includes("/series") ? true : false,
        checkedB: pathname.includes("/series") ? false : true
    });
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        if(pathname.includes("/series")){
            setToRedirect("/")
        }else{
            setToRedirect("/series")
        }
    }, [pathname]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Grid item xs={2}>
            <Link to={toRedirect}>
                <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color="secondary"
                />
            </Link>
        </Grid>
    )

}

export default SwitchLink