import React from 'react';
import { imgdirseries, seriesclass } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { store } from '../../redux/store';
import Fade from 'react-reveal/Fade';

const ThumbsSeries = props => {
    const classes = useStyles();
    return(
        <Grid item xs={12} lg={3}className={`p-cardmovie ${seriesclass}`} data-title={props.data.name} data-type={props.data.type} data-chaine={props.data.Chaine} data-realisateur={props.data.Realisateur}>
        <Fade bottom cascade>
            <Card>
                <CardActionArea>
                    <Link to={`/detail/series/${props.data.id}`} className={classes.link} onClick={() => store.dispatch({ type: 'ADDSINGLE', data: props.data})}>
                        <CardMedia
                        image={imgdirseries+props.data.imageName}
                        src='img'
                        title={props.data.name}
                        />
                    </Link>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h4" component="h2" className="movies-title">
                                    {props.data.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-start">
                            <Typography variant="overline" color="textSecondary" component="p">
                                CHAÎNE
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-end">
                            <Typography variant="overline" color="textSecondary" component="p">
                                NOMBRE DE SAISON
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-start">
                            <Typography variant="h6" component="p">
                                {props.data.Chaine}
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-end">
                            <Typography variant="h6" component="p">
                                {props.data.saisons.length}
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-start">
                            <Typography variant="overline" color="textSecondary" component="p">
                                REALISATEUR
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-end">
                            <Typography variant="overline" color="textSecondary" component="p">
                                TYPE
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-start">
                            <Typography variant="h6" component="p">
                                {props.data.Realisateur}
                            </Typography>
                            </Grid>
                            <Grid item xs={6} className="flex-end">
                            <Typography variant="h6" component="p">
                                {props.data.type}
                            </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>                
            </Card>
        </Fade>
    </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        '& *': {
            textDecoration: 'none'
        }
    }
  }));

export default ThumbsSeries;