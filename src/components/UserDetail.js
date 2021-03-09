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
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

  inline: {
    display: 'inline',
  },
  verticaldvder: {
    width: '3px',
    height: 'auto',
    marginLeft: '-15px',
    marginTop: '10px',
    marginBottom: '0',
    transformY: 'rotate(90deg)',
    backgroundColor: 'black	',
  },
  avatar:{
    height:'250px',
    width:'250px',
    marginLeft:'170px',
    marginTop:'50px'
  },
  avatarText:{
    textAlign:'left',
    marginLeft:'150px',
    padding:'5px'
  },
  list:{
    padding:'5px',
    marginTop:'20px'
  },
  btn: {
    marginLeft: '120px',
    marginTop: '-50px',

    textAlign:'left'
  },
  btnTxt: {
    textAlign:'left',
    fontWeight:'90px'
  }
}));

export default function UserDetail() {
  const classes = useStyles();
  const [UserDetail, setuserDetail] = useState();
  const [UserDetailRepos, setUserDetailRepos] = useState();
  const [userCount, setUserCount] = useState();

  var path = window.location.pathname;

  var str = path.split("/");
  console.log("url", str[2])
  useEffect(() => {
    userDetail(str[2])
      .then(searchFound => {
        setuserDetail(searchFound);
        setUserCount(searchFound.public_repos);

        console.log("user", searchFound)
      });
    userRepos(str[2])
      .then(repos => {
        setUserDetailRepos(repos);
        console.log("User repoları", repos);
      });
  }, []);

  return (
    <div>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid className="left-pane" item md={4} xs={12}>
        {UserDetail &&
        <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" className={classes.avatar} src={UserDetail.avatar_url} />
              </ListItemAvatar>
            </ListItem>
          }
          {UserDetail &&
          
            <ListItem alignItems="flex-start">
              <ListItemText className={classes.avatarText}
                primary={UserDetail.login}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {UserDetail.type} / {UserDetail.html_url}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>

          }
        </Grid>
        <Divider className={classes.verticaldvder}/>

        <Grid className="right-pane" item md={8} xs={12}>
          <List >
            <ListItem alignItems="flex-start" className={classes.list}>
                  <ListItemText primary="Repositories" className={classes.btnTxt}/>
                </ListItem>
                   <Button className={classes.btn} variant="outlined" color="primary" 
                            >
                                {userCount}
                            </Button>
            {UserDetailRepos && UserDetailRepos.map((repo, index) =>
              <Link key={repo.id} to={`/repo-detail/${repo.full_name}`}>
                <ListItem alignItems="flex-start" className={classes.list}>
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
