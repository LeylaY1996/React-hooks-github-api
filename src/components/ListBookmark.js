import React from 'react'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

export default function ListBookmark(props) {
    const bookList = props.data
    return (
        <div>
             <List >
      {bookList && props.data &&
     Object.values(props).length == 1 ? 
      <Link key={bookList.id} to={`/repo-detail/${bookList.full_name}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <BookOutlinedIcon />
            </ListItemAvatar>
            <ListItemText
              primary={bookList.full_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"

                    color="textPrimary"
                  >
                    {bookList.description}
                  </Typography>
                </React.Fragment>
              }
            />
            <Divider />
          </ListItem>
        </Link>
      
      :
      Object.values(bookList).map((repo, index) =>
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
        </div>
    )
}
