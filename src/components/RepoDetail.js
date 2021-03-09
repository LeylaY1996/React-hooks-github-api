import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { getBookmarks, repoDetail, saveBookmark } from './../services/search';
import { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import StarBorderSharpIcon from '@material-ui/icons/StarBorderSharp';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Button from '@material-ui/core/Button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    verticaldvder: {
      width: '3px',
      height: '968px',
      marginLeft: '-15px',
      marginTop: '10px',
      marginBottom: '0',
      transformY: 'rotate(90deg)',
      backgroundColor: 'black	',
    },
    icon: {
        height:'100px',
        width:'300px',
        marginLeft:'-110px',
        color:'black'
    },
    fullName: {
       color: '#375f9d',
       marginLeft:'10px',
       fontSize:'250px',
       fontWeight:'bold'
    },
    description: {
       marginLeft:'10px',
       fontSize:'250px',
       fontWeight:'bold'
    },
    watch: {
        marginLeft:'10px',
        marginRight: '40px'
    }, 
    btn: {
        marginLeft:'10px',
        width: '368px',
        height:'38px',
        color:'#375f9d',
        marginTop:'30px'
    },
    count: {
        color: '#2c98f0',
        marginLeft: '100px',
    }
  }));
export default function RepoDetail() {
    const [repoValue, setRepoValue] = useState();
    const [bookmarkData, setBookmarkData] = useState([]);
    const classes = useStyles();

    var path = window.location.pathname;
    var str = path.split("/");

    useEffect(() => {
        repoDetail(str[2], str[3])
            .then(searchFound => {
                console.log("repo", searchFound);
                setRepoValue(searchFound);
            });

    }, []);

    function saveBookmarkFunc() {
        saveBookmark(str[2], str[3])
            .then((json) => {
                // handle success
                getBookmarks()
                    .then(searchFound => {
                        console.log("starrepo", searchFound);
                        setBookmarkData(searchFound);
                    });
            })
            .catch(error => error);

    }
    console.log("bookmarklist", bookmarkData)
    return (
        <div>
            {repoValue &&
                <Grid container alignItems="stretch" spacing={3}>
                    <Grid className="left-pane" item md={4} xs={12}>
                        <List component="nav" aria-label="secondary mailbox folder">

                            <ListItem>
                                {<ListItemIcon>
                                    <BookOutlinedIcon className={classes.icon}/>

                                </ListItemIcon>}

                            </ListItem>
                            <ListItem>
                                <ListItemText primary={repoValue.full_name} className={classes.fullName}/>


                            </ListItem>
                            <ListItem>
                                <ListItemText primary={repoValue.description} className={classes.description}/>


                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkOutlinedIcon className={classes.watch}/>

                                </ListItemIcon>
                                <ListItemText primary={repoValue.full_name} className={classes.fullName}/>


                            </ListItem>
                        </List>

                        <List component="nav" aria-label="secondary mailbox folder" className={classes.watch}>

                            <ListItem>
                                <ListItemIcon>
                                    <VisibilityOutlinedIcon className={classes.watch}/>
                                </ListItemIcon>
                                <ListItemText primary="Watch" />
                                <ListItemText className={classes.count} primary={repoValue.watchers_count} />


                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <StarBorderSharpIcon className={classes.watch}/>
                                </ListItemIcon>
                                <ListItemText primary="Star" />

                                <ListItemText className={classes.count} primary={repoValue.stargazers_count} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <DeviceHubIcon className={classes.watch}/>
                                </ListItemIcon>
                                <ListItemText primary="Fork" />

                                <ListItemText className={classes.count} primary={repoValue.forks_count} />
                            </ListItem>
                        </List>

                        <List component="nav" aria-label="main mailbox folders" className={classes.watch}>
                            <ListItem>
                                <ListItemIcon>
                                    <DeviceHubIcon className={classes.watch}/>
                                </ListItemIcon>
                                <ListItemText primary="Branches" />
                                <ListItemText className={classes.count} primary={repoValue.default_branch} />

                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                            >
                                <ListItemIcon>
                                    <InfoOutlinedIcon className={classes.watch}/>
                                </ListItemIcon>
                                <ListItemText primary="Issues" />

                                <ListItemText className={classes.count} primary={repoValue.open_issues_count} />
                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                            >
                                <ListItemIcon>
                                    <DeviceHubIcon className={classes.watch}/>

                                </ListItemIcon>
                                <ListItemText primary="Pull Requests" />

                                <ListItemText className={classes.count} primary="-" />
                            </ListItem>
                            <Button variant="outlined" color="primary" className={classes.btn} startIcon={<BookmarkBorderIcon />} onClick={saveBookmarkFunc}
                            >
                                Add To Bookmarks
                            </Button>
                        </List>

                    </Grid>
                    <Divider className={classes.verticaldvder}/>
                    <Grid className="right-pane" item md={8} xs={12}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText className={classes.description} primary={repoValue.description} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            }
        </div>
    )
}
