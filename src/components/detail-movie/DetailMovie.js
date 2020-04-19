import React, { useState, useEffect, useRef } from 'react';
import { videodir, subtitledir } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './DetailMovie.css'
import Fade from 'react-reveal/Fade';
import MovieChoice from '../movie-choice/MovieChoice';


const DetailMovie = props => {
    const videoRef = useRef()
    const [tags, setTags] = useState(null);
    const [videosrc, setVideosrc] = useState(videodir+props.data.videos[0].videoName);
    const [loaded, setLoaded] = useState(false);
    const loadedRef = useRef(loaded)
    useEffect(() => {
        videoRef.current.addEventListener("loadedmetadata", () => {
            if(!loadedRef.current){
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
                setLoaded(true)
                videoRef.current.classList.remove('hidden-video')
            }
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

    }, [props.data.subtitles, props.data.tags]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        loadedRef.current  = loaded
    }, [loaded]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleSrcChange = newsrc => {
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
                        <Grid container spacing={1} alignItems="center">
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography gutterBottom variant="h4" component="h2" className="movies-title flex-center text-center">
                                    {props.data.name}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    ACTEURS
                                </Typography>
                            </Grid>
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography variant="h6" component="p" className="text-center">
                                    {props.data.acteurs}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    REALISATEURS
                                </Typography>
                            </Grid>
                            <Grid item lg={2} xs={12}className="flex-center">
                                <Typography variant="h6" component="p" className="text-center">
                                    {props.data.realisateur}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    TAGS
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center">
                                <Typography variant="h6" component="p">
                                    {tags}
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center detail-info">
                                <Typography variant="overline" color="textSecondary" component="p">
                                    RUNNING TIME
                                </Typography>
                            </Grid>
                            <Grid item lg={1} xs={12}className="flex-center">
                                <Typography variant="h6" component="p">
                                    {props.data.duree}
                                </Typography>
                            </Grid>
                            <Grid item lg={3} xs={12}className="flex-center pt-single">
                                <Typography variant="body1" color="textPrimary" component="p">
                                    {props.data.resume}
                                </Typography>
                            </Grid>
                            <Grid item lg={9} xs={12}className="flex-center">
                                <Grid container spacing={1}>
                                    <Grid item lg={12} className="flex-center">
                                        <MovieChoice videos={props.data.videos} videoChange={handleSrcChange}/>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <video className="video hidden-video" controls preload="auto" ref={videoRef}>
                                            <source src={videosrc} type="video/mp4"/>
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