import React, { useEffect, useState } from 'react';
import { imgdir } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const Thumb = props => {
    const [tags, setTags] = useState(null);
    useEffect(() => {
        console.log(props.data.tags)
        let tmptags = '';
        props.data.tags.forEach((v, i) => {
            if(i !== props.data.tags.length - 1){
                console.log(v, i)
                tmptags += `${v.name}, ` 
            }else{
                tmptags += v.name
            }
            
        });
        setTags(tmptags)
    }, [props.data.tags]);
    const classes = useStyles();
//  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    return (
        <Grid item xs={3}>
            <Link to={`/${props.data.id}`} className={classes.link}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                        image={imgdir+props.data.imageName}
                        src='img'
                        title={props.data.name}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {props.data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
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
            </Link>        
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