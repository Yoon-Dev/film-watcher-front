import React from 'react';
import Typography from '@material-ui/core/Typography';

const Loading = props => {
    if(props.big){
        return(
            <div className="abs">
                <Typography variant="h3" component="h4" className="text-center">
                    Chargement...
                </Typography>             
            </div>
        )
    }else{
        return(
            <div>Chargement...</div>
        )       
    }

}

export default Loading;