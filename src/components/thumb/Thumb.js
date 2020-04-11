import React from 'react';
import { imgdir } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';

const Thumb = props => {

    console.log(props);
    return (
        <Grid item xs={12}>
            <p>{props.data.name}</p>
            <img src={imgdir+props.data.imageName} alt="thumbnail"/>
        </Grid>
  );
}

export default Thumb;