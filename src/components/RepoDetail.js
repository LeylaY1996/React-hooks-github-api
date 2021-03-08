import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { getBookmarks, repoDetail,saveBookmark } from './../services/search';
import { useState, useEffect,useContext } from "react";
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
import BookmarkList from './BookmarkList';
import { ThingsProvider } from '../thingsContext'


export default function RepoDetail() {
    const [repoValue, setRepoValue] = useState();
    const [bookmarkData, setBookmarkData] = useState([]);

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
    console.log("bookmarklist",bookmarkData)
    return (
        <div>
           {/*  <ThingsProvider value={bookmarkData}>
                <BookmarkList/>
            </ThingsProvider> */}
            {repoValue &&
                <Grid container alignItems="stretch" spacing={3}>
                    <Grid className="left-pane" item md={4} xs={12}>
                        <List component="nav" aria-label="secondary mailbox folder">

                            <ListItem>
                                {<ListItemIcon>
                                    <BookOutlinedIcon />

                                </ListItemIcon>}

                            </ListItem>
                            <ListItem>
                                <ListItemText primary={repoValue.full_name} />


                            </ListItem>
                            <ListItem>
                                <ListItemText primary={repoValue.description} />


                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkOutlinedIcon />

                                </ListItemIcon>
                                <ListItemText primary={repoValue.full_name} />


                            </ListItem>
                        </List>

                        <List component="nav" aria-label="secondary mailbox folder">

                            <ListItem>
                                <ListItemIcon>
                                    <VisibilityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Watch" />
                                <ListItemText primary={repoValue.id} />


                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <StarBorderSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Star" />

                                <ListItemText primary={repoValue.stargazers_count} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <DeviceHubIcon />
                                </ListItemIcon>
                                <ListItemText primary="Fork" />

                                <ListItemText primary={repoValue.forks_count} />
                            </ListItem>
                        </List>

                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <DeviceHubIcon />
                                </ListItemIcon>
                                <ListItemText primary="Branches" />
                                <ListItemText primary={repoValue.default_branch} />

                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                            >
                                <ListItemIcon>
                                    <InfoOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Issues" />

                                <ListItemText primary={repoValue.open_issues_count} />
                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                            >
                                <ListItemIcon>
                                    <DeviceHubIcon />

                                </ListItemIcon>
                                <ListItemText primary="Pull Requests" />

                                <ListItemText primary="-" />
                            </ListItem>
                            <Button variant="outlined" color="primary" startIcon={<BookmarkBorderIcon />}  onClick={saveBookmarkFunc}
>
                                Add To Bookmarks
                            </Button>
                        </List>

                    </Grid>
                    <Grid className="right-pane" item md={8} xs={12}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText primary={repoValue.description}/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            }
        </div>
    )
}
