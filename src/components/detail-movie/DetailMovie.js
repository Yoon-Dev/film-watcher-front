import React, { useState, useEffect, useRef } from 'react';
import { videodir, subtitledir } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './DetailMovie.css'
import Fade from 'react-reveal/Fade';


const DetailMovie = props => {
    console.log(props.data)
    const videoRef = useRef()
    const [tags, setTags] = useState(null);
    useEffect(() => {
        console.log(videoRef.current)
        videoRef.current.addEventListener("loadedmetadata", () => {
            // track = this.addTextTrack("captions", "English", "en");
            props.data.subtitles.forEach((el) => {
                if(el && el !== undefined && videoRef.current){
                    let track = document.createElement("track");
                    track.label = el.langue;
                    track.src = subtitledir+el.subtitleName;
                    track.addEventListener("load", () => {
                        track.mode = "showing";
                        videoRef.current.textTracks[0].mode = "showing";
                     });
                    videoRef.current.appendChild(track)
                }
            })
            videoRef.current.classList.remove('hidden-video')
         });
        let tmptags = '';
        props.data.tags.forEach((v, i) => {
            if(i !== props.data.tags.length - 1){
                tmptags += `${v.name}, ` 
            }else{
                tmptags += v.name
            }     
        });
        setTags(tmptags)

    }, [props.data, props.data.subtitles]);

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Grid item xs={12}>
            <Fade top >
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
                                <video className="video hidden-video" controls preload="auto" ref={videoRef}>
                                    <source src={videodir+props.data.videoName} type="video/mp4"/>
                                </video> 
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Grid>
    )
}

export default DetailMovie;