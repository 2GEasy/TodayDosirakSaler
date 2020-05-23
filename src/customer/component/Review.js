import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  
  useEffect(()=>{
    console.log("Review:",props.rvw_id);
  },[])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <>
    
    <Card className={classes.root} style={{margin:20}}>
      <CardHeader
        title={props.title}
        subheader="구매 메뉴"
      />
      <CardMedia
        className={classes.media}
        image="이미지"
        title="리뷰 이미지"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
        <Rating
          name="score"
          value={props.score}
          disabled
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {props.regDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="더 보기"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>사장님 댓글</Typography>
          <Typography paragraph>
            맛있게 드셔주셔서 감사합니다.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    
    
    </>
  );
}