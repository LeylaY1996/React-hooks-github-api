import React from 'react'
import { userDetail, userRepos} from './../services/search';
import Grid from '@material-ui/core/Grid';
import { useState, useMemo, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import { Link } from 'react-router-dom'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import StarBorderSharpIcon from '@material-ui/icons/StarBorderSharp';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

export default function UserDetail() {
    const classes = useStyles();
    const [UserDetail, setuserDetail] = useState();
    const [UserDetailRepos, setUserDetailRepos] = useState();

    var path = window.location.pathname;

    var str = path.split("/");
    console.log("url", str[2])
    useEffect(() => {
        userDetail(str[2])
        .then(searchFound => {
            setuserDetail(searchFound);
            localStorage.setItem('userData', JSON.stringify(UserDetail));            
        });
      /*   userRepos(str[2])
        .then(repos => {
            setUserDetailRepos(repos);
            localStorage.setItem('userRepoData', JSON.stringify(UserDetailRepos));            
        });
        console.log("reposssssssssssssssss", UserDetailRepos); */
    });   


    return (
        <div>
            <Grid container alignItems="stretch" spacing={3}>
                <Grid className="left-pane" item md={4} xs={12}>
                <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={JSON.parse(localStorage.getItem('userData')).avatar_url}  />
                        </ListItemAvatar>
                        <ListItemText
                        primary={JSON.parse(localStorage.getItem('userData')).login}
                        secondary={
                        <React.Fragment>
                        <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                        >
                            {JSON.parse(localStorage.getItem('userData')).type}/{JSON.parse(localStorage.getItem('userData')).html_url}
                        </Typography>
                        </React.Fragment>
                        }
                        />
                <Divider variant="inset" component="li" />
                </ListItem> 
                </Grid>
                <Grid className="right-pane" item md={8} xs={12}>
             {/*    <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <BookOutlinedIcon />
            </ListItemAvatar>
            <ListItemText
              primary={JSON.parse(localStorage.getItem('userRepoData')).full_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"

                    color="textPrimary"
                  >
                    {JSON.parse(localStorage.getItem('userRepoData')).description}
                  </Typography>
                </React.Fragment>
              }
            />
            <Divider />
          </ListItem> */}
                </Grid>
            </Grid>
        </div>
    )
}
