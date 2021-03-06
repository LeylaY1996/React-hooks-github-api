import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { repoDetail } from './../services/search';
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

export default function RepoDetail() {
    const [repoValue, setRepoValue] = useState();
    console.log("hell")
    var path = window.location.pathname;
    var str = path.split("/");
    console.log("url", str)

    useEffect(() => {
        repoDetail(str[2], str[3])
            .then(searchFound => {
                console.log("repo", searchFound);
                localStorage.setItem('SiteData', JSON.stringify(searchFound));
            });

    }, [])

    console.log("repovalue", JSON.parse(localStorage.getItem('SiteData')).id)
    return (
        <div>
            <Grid container alignItems="stretch" spacing={3}>
                <Grid className="left-pane" item md={4} xs={12}>
                    <List component="nav" aria-label="secondary mailbox folder">

                        <ListItem>
                            <ListItemIcon>
                                <BookOutlinedIcon />

                            </ListItemIcon>

                        </ListItem>
                        <ListItem>
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).full_name} />


                        </ListItem>
                        <ListItem>
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).description} />


                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LinkOutlinedIcon />

                            </ListItemIcon>
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).full_name} />


                        </ListItem>
                    </List>

                    <List component="nav" aria-label="secondary mailbox folder">

                        <ListItem>
                            <ListItemIcon>
                                <VisibilityOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Watch" />
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).id} />


                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <StarBorderSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Star" />

                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).stargazers_count} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <DeviceHubIcon />
                            </ListItemIcon>
                            <ListItemText primary="Fork" />

                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).forks_count} />
                        </ListItem>
                    </List>

                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem>
                            <ListItemIcon>
                                <DeviceHubIcon />
                            </ListItemIcon>
                            <ListItemText primary="Branches" />
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).default_branch} />

                        </ListItem>
                        <Divider />
                        <ListItem
                            button
                        >
                            <ListItemIcon>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Issues" />

                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).open_issues_count} />
                        </ListItem>
                        <Divider />
                        <ListItem
                            button
                        >
                            <ListItemIcon>
                                <DeviceHubIcon />

                            </ListItemIcon>
                            <ListItemText primary="Pull Requests" />

                            <ListItemText primary="-"/>
                        </ListItem>
                    </List>

                </Grid>
                <Grid className="right-pane" item md={8} xs={12}>
                <List component="nav" aria-label="main mailbox folders">
                        <ListItem>
                            <ListItemText primary={JSON.parse(localStorage.getItem('SiteData')).description} />
                        </ListItem>
                        </List>
                </Grid>
            </Grid>
        </div>
    )
}
