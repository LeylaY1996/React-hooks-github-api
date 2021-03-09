import React, { useEffect, useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import { getBookmarks } from './../services/search';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

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
  icon:{
    width: '100px',
    height:'200px'
  },
  iconTxt:{
    marginTop:'-10px',
    marginLeft:'30px'
  }
 
}));
export default function BookmarkList() {
  const [bookList, setBookList] = useState();
  const classes = useStyles();

  useEffect(() => {
    getBookmarks()
      .then(searchFound => {
        console.log("starrepo", searchFound);
        setBookList(searchFound);
      });

  }, []);

  return (
    <div>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid className="left-pane" item md={4} xs={12}>
          <List >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <BookOutlinedIcon className={classes.icon}/>
              </ListItemAvatar>
            </ListItem>
              <ListItemText className={classes.iconTxt}
                primary="Bookmarks"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"

                      color="textPrimary"
                    >
                      {/* {repo.description} */}
                    </Typography>
                  </React.Fragment>
                }
              />
          </List>
        </Grid>
        <Divider className={classes.verticaldvder}/>

        <Grid className="right-pane" item md={8} xs={12}>
          <List >
            {bookList && Object.values(bookList).map((repo, index) =>
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
                  <Divider />
                </ListItem>
              </Link>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}