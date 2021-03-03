import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import MoodSharpIcon from '@material-ui/icons/MoodSharp';
import { useState, useEffect } from "react";
import {searchRepositories} from '../src/services/search';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ffffff',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  bookmarkBorder: {
    width: '24px',
    height: '24px',
    margin: '5px 8px 5px 10px',
    objectFit: 'contain',
  },
  rectangle : {
    width:'360px',
    height:'46px',
    flexGrow:'0',
    margin: '8px 0 0',
    padding: '11px 22px 11px 16px',
  },
  repositorySearch: {
    width: '1440px',
  height: '900px',
  backgroundColor: '#ffffff'
  },
  divider: {
    width: '360px',
    height: '1px',
    margin: '8px 0 24px',
    backgroundColor: '#c4c4c4'
  },
  line: {
    width: '1px',
  height: '835px',
  margin: '65px 63px 0 0',
  transform: 'rotate(90deg)',
  backgroundColor: '#c4c4c4'
  },
  listIcon: {
    width: '24px',
    height: '24px',
    flexGrow: '0',
    margin: '0 32px 0 0',
    objectFit: 'contain'
  }
}));

export default function App() {
  const classes = useStyles();
  const[search,setSearch] = useState([]);
  const [value, setValue] = React.useState();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log("tıklanı");
      setValue({value:e.target.value})
    }
  }

  console.log("Heyy",value);
  useEffect(() => {
      let mounted = true;
      let i;
      searchRepositories().then(value => {
          if(mounted){
            searchRepositories(value)
          }
          console.log("Users",value);
      })
      return() => mounted = false;
  }, [])
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
              <img src="logo.png"/>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase onKeyPress={handleKeyPress}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
            <BookmarkBorderIcon className={classes.bookmarkBorder}/>
            Bookmarks
        </Toolbar>
      </AppBar>
      <List component="nav" className={classes.repositorySearch} aria-label="mailbox folders">
        <ListItem button className={classes.rectangle}>
          <InsertDriveFileSharpIcon className={classes.listIcon}/>
          <ListItemText primary="Repositories" />
        </ListItem>
        <ListItem button className={classes.rectangle}>
          <MoodSharpIcon className={classes.listIcon}/>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button className={classes.rectangle}>
          <BookmarkBorderIcon className={classes.listIcon}/>
          <ListItemText primary="Bookmarked" />
        </ListItem>
      <Divider className={classes.divider}/>
    </List>

    </div>
  );
}
