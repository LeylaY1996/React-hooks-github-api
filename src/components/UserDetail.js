import React from 'react'
import { userDetail, userRepos } from './../services/search';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';

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
        console.log("user", searchFound)
        localStorage.setItem('userData', JSON.stringify(searchFound));
      });
    userRepos(str[2])
      .then(repos => {
        setUserDetailRepos(repos);
        console.log("User repoları", repos);
        localStorage.setItem('userRepoData', JSON.stringify(repos));
      });
  }, []);

  return (
    <div>
      <p>Leyla</p>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid className="left-pane" item md={4} xs={12}>
          {UserDetail &&
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={UserDetail.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={UserDetail.login}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {UserDetail.type}/{UserDetail.html_url}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Divider variant="inset" component="li" />
            </ListItem>

          }
        </Grid>
        <Grid className="right-pane" item md={8} xs={12}>
          <List >
            {UserDetailRepos && UserDetailRepos.map((repo, index) =>
              <Link key={repo.id} to={`/repo-detail/${repo.full_name}`}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <BookOutlinedIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={repo.full_name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"

                          color="textPrimary"
                        >
                          {repo.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </Link>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}
