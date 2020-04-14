import React, { useState, useEffect } from 'react';
import { videodir } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './DetailMovie.css'
const DetailMovie = props => {

    const [tags, setTags] = useState(null);
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
    }, [props.data.tags]);
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

    return(
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={2} className="flex-center">
                            <Typography gutterBottom variant="h4" component="h2" className="movies-title flex-center text-center">
                                {props.data.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                ACTEURS
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.data.acteurs}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                REALISATEURS
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.data.realisateur}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                TAGS
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center">
                            <Typography variant="h6" component="p">
                                {tags}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                RUNNING TIME
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className="flex-center">
                            <Typography variant="h6" component="p">
                                {props.data.duree}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} className="flex-center pt-single">
                            <Typography variant="body1" color="textPrimary" component="p">
                                {props.data.resume}
                            </Typography>
                        </Grid>
                        <Grid item xs={9} className="flex-center">
                            <video className="video" controls>
                                <source src={videodir+props.data.videoName} type="video/mp4"/>
                            </video>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default DetailMovie;