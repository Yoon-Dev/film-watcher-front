import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import MovieChoice from '../movie-choice/MovieChoice';
import { store } from '../../redux/store';


const DetailMovie = props => {
    const videoRef = useRef()
    const sourceRef = useRef()
    const [videosrc, setVideosrc] = useState(process.env.REACT_APP_VIDEO_DIR+props.src.videos[0].video_name);
    const [loaded, setLoaded] = useState(false);
    const loadedRef = useRef(loaded)
    useEffect(() => {
        store.dispatch({ type: 'ADDSRC', data: props.src})
        videoRef.current.addEventListener("loadedmetadata", () => {
            if(!loadedRef.current){
                props.src.subtitles.forEach((el) => {
                    if(el && el !== undefined && videoRef.current){
                        let track = document.createElement("track");
                        track.label = el.langue;
                        track.src = process.env.REACT_APP_SUBTITLE_DIR+el.subtitle_name;
                        track.addEventListener("load", () => {
                            track.mode = "showing";
                            videoRef.current.textTracks[0].mode = "showing";
                        });
                        videoRef.current.appendChild(track)
                    }
                })
                setLoaded(true)
                videoRef.current.classList.remove('hidden-video')
            }
         });
    }, [props.src]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        loadedRef.current  = loaded
    }, [loaded]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleSrcChange = newsrc => {
        videoRef.current.pause()
        setVideosrc(newsrc)
        sourceRef.current.setAttribute('src', newsrc)
        videoRef.current.load()
        videoRef.current.play()
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return(
        <Grid item xs={12}>
            <Fade top >
                <Card>
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography gutterBottom variant="h4" component="h2" className="movies-title flex-center text-center">
                                    {props.general.name}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    ACTEURS
                                </Typography>
                            </Grid>
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography variant="h6" component="p" className="text-center">
                                    {props.general.acteurs}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    REALISATEURS
                                </Typography>
                            </Grid>
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography variant="h6" component="p" className="text-center">
                                    {props.general.realisateur}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    TAGS
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center">
                                <Typography variant="h6" component="p">
                                    {props.general.tags}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    RUNNING TIME
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center">
                                <Typography variant="h6" component="p">
                                    {props.general.duree}
                                </Typography>
                            </Grid>
                            <Grid item lg={3} xs={12}className="flex-center pt-single">
                                <Typography variant="body1" color="textPrimary" component="p">
                                    {props.general.resume}
                                </Typography>
                            </Grid>
                            <Grid item lg={9} xs={12}className="flex-center">
                                <Grid container spacing={1}>
                                    <Grid item lg={12} className="flex-center">
                                        <MovieChoice videos={props.src.videos} videoChange={handleSrcChange}/>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <video className="video hidden-video" controls preload="auto" ref={videoRef}>
                                            <source src={videosrc} type="video/mp4" ref={sourceRef}/>
                                        </video> 
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fade>
        </Grid>
    )
}

export default DetailMovie;