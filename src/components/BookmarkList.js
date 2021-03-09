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

export default function BookmarkList() {
  const [bookList, setBookList] = useState();

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
                <BookOutlinedIcon />
              </ListItemAvatar>
              <ListItemText
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
              <Divider />
            </ListItem>
          </List>
        </Grid>
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