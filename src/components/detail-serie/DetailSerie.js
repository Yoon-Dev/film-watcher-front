import React, { useState, useRef } from 'react';
import { videodirseries } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Fade from 'react-reveal/Fade';
import SaisonEpisodeChoice from '../saison-episode-choice/SaisonEpisodeChoice';
import Shuffle from '../shuffle/Shuffle';
import OneStep from '../one-step/OneStep';

const DetailSerie = props => {
    const videoRef = useRef()
    const [videosrc, setVideosrc] = useState(props.data.lastSeasonViewed ? videodirseries+props.data.saisons[props.data.lastSeasonViewed].episodes[props.data.lastEpisodeViewed].videoName : videodirseries+props.data.saisons[0].episodes[0].videoName);
    const [last_saison, setLast_saison] = useState(props.data.lastSeasonViewed ? props.data.lastSeasonViewed : 0);
    const [last_episode, setLast_episode] = useState(props.data.lastEpisodeViewed ? props.data.lastEpisodeViewed : 0);

// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleSrcChange = (newsaison, newepisode) => {
    console.log(newsaison, newepisode)
    setLast_saison(newsaison)
    setLast_episode(newepisode)
    setVideosrc(videodirseries+props.data.saisons[newsaison].episodes[newepisode].videoName)
    videoRef.current.load()
}
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
    <Grid item xs={12}>
        <Fade top >
            <Card>
                <CardContent>
                    <Grid container spacing={1} alignItems="center" justifycontent="center">
                        <Grid item lg={3} xs={12}className="flex-center">
                            <Typography gutterBottom variant="h4" component="h2" className="movies-title flex-center text-center">
                                {props.data.name}
                            </Typography>
                        </Grid>
                        <Grid item lg={1} xs={12}className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                CHAÎNE
                            </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12}className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.data.Chaine}
                            </Typography>
                        </Grid>
                        <Grid item lg={1} xs={12}className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                REALISATEURS
                            </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12}className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.data.Realisateur}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}className="flex-center">
                            <SaisonEpisodeChoice data={props.data.saisons} last_season={last_saison} last_episode={last_episode} changeSrc={handleSrcChange}/>
                        </Grid>
                        <Grid item xs={12}className="flex-center">
                            <video className="video" controls preload="auto" ref={videoRef}>
                                <source src={videosrc} type="video/mp4"/>
                            </video> 
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <OneStep direct="left" last_saison={last_saison} last_episode={last_episode} changeSrc={handleSrcChange} data={props.data.saisons}/>
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <Shuffle data={props.data.saisons} changeSrc={handleSrcChange}/>
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <OneStep direct="right" last_saison={last_saison} last_episode={last_episode} changeSrc={handleSrcChange} data={props.data.saisons}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    </Grid>
    )
}

export default DetailSerie;