import React, { useState, useRef, useEffect } from 'react';
import { videodirseries, upadtelastAPI } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Fade from 'react-reveal/Fade';
import SaisonEpisodeChoice from '../saison-episode-choice/SaisonEpisodeChoice';
import Shuffle from '../shuffle/Shuffle';
import OneStep from '../one-step/OneStep';
import { store } from '../../redux/store';


const DetailSerie = props => {
    const videoRef = useRef()
    const [last_saison, setLast_saison] = useState(store.getState().lasts ? store.getState().lasts.saison : props.general.last_season_viewed ? props.general.last_season_viewed : 0);
    const [last_episode, setLast_episode] = useState(store.getState().lasts ? store.getState().lasts.episode :props.general.last_episode_viewed ? props.general.last_episode_viewed : 0);
    const [videosrc, setVideosrc] = useState(videodirseries+props.src[last_saison].episodes[last_episode].video_name);
    // const [videosrc, setVideosrc] = useState(null);

    const videosrcRef = useRef(videosrc)
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        setVideosrc(videodirseries+props.src[last_saison].episodes[last_episode].video_name)
        store.dispatch({ type: 'ADDLAST', data: {saison: last_saison, episode: last_episode}})
    }, [last_saison, last_episode, props.src]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        store.dispatch({ type: 'ADDSRC', data: props.src})
        videoRef.current.addEventListener("ended", () => {
            let newlast_episode = last_episode
            let newlast_saison = last_saison
            if(last_episode === (props.src[last_saison].episodes.length - 1) && last_saison === (Object.keys(props.src).length-1)){
                newlast_episode = 0;
                newlast_saison = 0
            }else{
                if(last_episode === (props.src[last_saison].episodes.length - 1)){
                    newlast_saison++
                    newlast_episode = 0
                }else{
                    newlast_episode++
                }
            }
            fetch(`${upadtelastAPI}/${props.general.id}/${newlast_saison}/${newlast_episode}`).then(res => {
                if(res.status !== 200 && !res.ok){
                    alert('SOmething went wrong on the backend when saving last episode')
                }
            });
        })
    }, [last_saison, last_episode, props.general.id, props.src]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    useEffect(() => {
        videosrcRef.current = videosrc
    }, [videosrc]);
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const handleSrcChange = (newsaison, newepisode, toSave) => {
        setLast_saison(newsaison)
        setLast_episode(newepisode)
        setVideosrc(videodirseries+props.src[newsaison].episodes[newepisode].video_name)
        videoRef.current.load()
        if(toSave){
            uptadeApiLastField(newepisode, newsaison)
        }
    }
// °°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°
    const uptadeApiLastField = (newlastepisode, newlastsaison) => {
        fetch(`${upadtelastAPI}/${props.general.id}/${newlastsaison}/${newlastepisode}`);
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
                                {props.general.name}
                            </Typography>
                        </Grid>
                        <Grid item lg={1} xs={12}className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                CHAÎNE
                            </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12}className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.general.Chaine}
                            </Typography>
                        </Grid>
                        <Grid item lg={1} xs={12}className="flex-center detail-info">
                            <Typography variant="overline" color="textSecondary" component="p">
                                REALISATEURS
                            </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12}className="flex-center">
                            <Typography variant="h6" component="p" className="text-center">
                                {props.general.Realisateur}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}className="flex-center">
                            <SaisonEpisodeChoice data={props.src} last_season={last_saison} last_episode={last_episode} changeSrc={handleSrcChange}/>
                        </Grid>
                        <Grid item xs={12}className="flex-center">
                            <video className="video" controls preload="auto" ref={videoRef}>
                                <source src={videosrc} type="video/mp4"/>
                            </video> 
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <OneStep direct="left" last_saison={last_saison} last_episode={last_episode} changeSrc={handleSrcChange} data={props.src}/>
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <Shuffle data={props.src} changeSrc={handleSrcChange}/>
                        </Grid>
                        <Grid item xs={4} className="flex-center">
                            <OneStep direct="right" last_saison={last_saison} last_episode={last_episode} changeSrc={handleSrcChange} data={props.src}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    </Grid>
    )
}

export default DetailSerie;