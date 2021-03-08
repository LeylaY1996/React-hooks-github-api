import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

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
      
export default function ListUsers(props) {
     console.log("Propstayım",props);
     const classes = useStyles();
     let users = props.data;

    return (
        <div>
        <List className={classes.root}>
        {users && users.map((user, index) =>
           <Link key={user.id} to={`/user-detail/${user.login}`}>
                <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={user.avatar_url} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={user.login}
                        secondary={
                        <React.Fragment>
                        <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                        >
                            {user.type}/{user.html_url}
                        </Typography>
                        </React.Fragment>
                        }
                        />
                <Divider variant="inset" component="li" />
                </ListItem>
                </Link>
        )}

        </List>        
        </div>

            )
}
