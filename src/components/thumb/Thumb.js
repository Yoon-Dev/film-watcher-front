import React, { useEffect, useState } from 'react';
import { imgdir, moviesclass } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { store } from '../../redux/store';

const Thumb = props => {

    const [tags, setTags] = useState(null);
    const [read, setRead] = useState(false);
    useEffect(() => {
        let tmptags = '';
        props.data.tags.forEach((v, i) => {
            if(i !== props.data.tags.length - 1){
                tmptags += `${v.name}, ` 
            }else{
                tmptags += v.name
            }     
        });
        setTags(tmptags)
    }, [props.data]);
    const classes = useStyles();
//  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return (
        <Grid item xs={12} lg={3}className={`p-cardmovie ${moviesclass}`} data-title={props.data.name} data-tags={tags} data-acteurs={props.data.acteurs} data-realisateur={props.data.realisateur}>
                <Card>
                    <CardActionArea>
                        <Link to={`/${props.data.id}`} className={classes.link} onClick={() => store.dispatch({ type: 'ADDSINGLE', data: props.data})}>
                            <CardMedia
                            image={imgdir+props.data.imageName}
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
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    ACTEURS
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    REALISATEURS
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="h6" component="p">
                                    {props.data.acteurs}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="h6" component="p">
                                    {props.data.realisateur}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    TAGS
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    RUNNING TIME
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-start">
                                <Typography variant="h6" component="p">
                                    {tags}
                                </Typography>
                                </Grid>
                                <Grid item xs={6} className="flex-end">
                                <Typography variant="h6" component="p">
                                    {props.data.duree}
                                </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>                
                </Card>
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