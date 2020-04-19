import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const RedirectAll = props => {

        return(
            <div className="abs">
                <Link to={props.url}>
                    <Button color="primary">
                        <Typography variant="h3" component="h4" className="text-center">
                                Il y a eu un petit probleme, cliquer moi !
                        </Typography>  
                    </Button>
                </Link>
            </div>
        )       

}

export default RedirectAll;