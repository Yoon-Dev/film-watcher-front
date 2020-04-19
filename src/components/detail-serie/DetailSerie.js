import React, { useState, useRef } from 'react';
import { videodirseries } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Fade from 'react-reveal/Fade';
import SaisonEpisodeChoice from '../saison-episode-choice/SaisonEpisodeChoice';

const DetailSerie = props => {
    const videoRef = useRef()
    const [videosrc, setVideosrc] = useState(props.data.lastSeasonViewed ? videodirseries+props.data.saisons[0].episodes[0].videoName : videodirseries+props.data.saisons[0].episodes[0].videoName);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
const handleSrcChange = newsrc => {
    console.log(newsrc)
    setVideosrc(newsrc)
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
                            <SaisonEpisodeChoice data={props.data.saisons} last_season={props.data.lastSeasonViewed} last_episode={props.data.lastEpisodeViewed} changeSrc={handleSrcChange}/>
                        </Grid>
                        <Grid item xs={12}className="flex-center">
                            <video className="video" controls preload="auto" ref={videoRef}>
                                <source src={videosrc} type="video/mp4"/>
                            </video> 
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    </Grid>
    )
}

export default DetailSerie;