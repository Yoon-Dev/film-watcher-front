import React, { useEffect, useState, Fragment } from 'react';
import { imgdir, imgdirseries, moviesclass, seriesclass } from '../../utils/utils';
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

const Thumb = props => {
        const [tags, setTags] = useState(null);
        const [read, setRead] = useState(false);
        useEffect(() => {
            if(props.movie){

                let tmptags = '';
                props.data.tags.forEach((v, i) => {
                    if(i !== props.data.tags.length - 1){
                        tmptags += `${v.name}, ` 
                    }else{
                        tmptags += v.name
                    }     
                });
                setTags(tmptags)
            }
        }, [props.data]);

    const classes = useStyles();
//  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return (
        <Grid item xs={12} lg={3}className={`p-cardmovie ${props.movie ? moviesclass: seriesclass}`} data-title={props.data.name} data-tags={props.movie ? tags : props.data.type} data-acteurs={props.movie ? props.data.acteurs : props.data.Chaine} data-realisateur={props.data.realisateur}>
            <Fade bottom cascade>
                <Card>
                    <CardActionArea>
                        <Link to={props.movie ? `/detail/${props.data.id}` : `/detail/series/${props.data.id}`} className={classes.link} onClick={() => store.dispatch({ type: 'ADDSINGLE', data: props.data})}>
                            <CardMedia
                            image={props.movie ? imgdir+props.data.imageName : imgdirseries+props.data.imageName}
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
                                { props.movie ? 
                                <Fragment>
                                    <Grid item xs={12} className="flex-center" onClick={() => {setRead(!read)}}>
                                        <Typography variant="overline" color="textSecondary" component="p">
                                            {read ? 'Cacher' : 'Lire le résumé'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={read ? 'show' : 'hidden'}>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            {props.data.resume}
                                        </Typography>
                                    </Grid>
                                </Fragment>
                                
                                : null}
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="overline" color="textSecondary" component="p">
                                { props.movie ?  "ACTEURS" : "CHAÎNE" } 
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="overline" color="textSecondary" component="p">
                                  { props.movie ? "REALISATEURS" : "NOMBRE DE SAISON" }
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="h6" component="p">
                                    {props.movie ? props.data.acteurs : props.data.Chaine}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="h6" component="p">
                                    {props.movie ? props.data.realisateur : props.data.saisons.length}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    {props.movie ? "TAGS" : "REALISATEUR"}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    {props.movie ? "RUNNING TIME" : "TYPE"}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="h6" component="p">
                                    {props.movie ? tags : props.data.Realisateur}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="h6" component="p">
                                    {props.movie ? props.data.duree : props.data.type}
                                </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>                
                </Card>
            </Fade>
        </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        '& *': {
            textDecoration: 'none'
        }
    }
  }));

export default Thumb;