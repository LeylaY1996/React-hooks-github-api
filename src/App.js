import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useState } from "react";
import { searchRepositories, searchUsers, getBookmarks } from '../src/services/search';
import Grid from '@material-ui/core/Grid';
import ListRepo from './components/ListRepo';
import { useHistory } from "react-router-dom";
import ListUsers from './components/ListUsers';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ListBookmark from './components/ListBookmark';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
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
  verticaldvder: {
    width: '3px',
    height: 'auto',
    marginLeft: '-15px',
    marginTop: '10px',
    marginBottom: '0',
    transformY: 'rotate(90deg)',
    backgroundColor: '#FF0000	',
  },
  searchText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'right',
    fontDisplay: 'swap',
    fontWeight: 'bolder',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  result: {
    textAlign:'left',
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [values, setValues] = useState();
  const [repoSize, setRepoSize] = useState();
  const [userSize, setUserSize] = useState();
  const [users, setUsers] = useState();
  const [bookmarks, setBookmarks] = useState();

  const history = useHistory();


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRepositories(e.target.value)
        .then(searchFound => {
          console.log("repo", searchFound);
          setValues(searchFound.items);
          setRepoSize(searchFound.total_count)
        });

      searchUsers(e.target.value)
        .then(searchFound => {
          console.log("users", searchFound);
          setUsers(searchFound.items);
          setUserSize(searchFound.total_count)

        });

      getBookmarks()
        .then(searchFound => {
            setBookmarks(searchFound);
        });
    }
  }
  function goToBookmarkList() {
    history.push('/list-bookmarks');
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src="logo.png" />
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
          <BookmarkBorderIcon className={classes.bookmarkBorder} onClick={goToBookmarkList} />
            Bookmarks
        </Toolbar>
      </AppBar>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid className="left-pane" item md={4} xs={12}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab className={classes.searchText} icon={<InsertDriveFileIcon />} label="Repositories" {...a11yProps(0)} />
            <Tab className={classes.searchText} icon={<InsertEmoticonIcon />} label="Users" {...a11yProps(1)} />
            <Tab className={classes.searchText} icon={<BookmarkBorderIcon />} label="Bookmarked" {...a11yProps(2)} />

          </Tabs>
        </Grid>
        <Divider className={classes.verticaldvder}/>
        <Grid className="right-pane" item md={8} xs={12}>
          <TabPanel value={value} index={0}>
            <List className={classes.searchText}>
            <ListItem alignItems="flex-start" >
             
           
            {
              repoSize &&
              <ListItemText secondary="Repository Results"
              primary={repoSize} className={classes.results}
            />
            }
          </ListItem>
            </List>
            <ListRepo data={values} />
          </TabPanel>
          <TabPanel value={value} index={1}>
          <List>
            <ListItem alignItems="flex-start">
             {
              userSize &&
              <ListItemText secondary="Users Results"
              primary={repoSize} className={classes.results}
            />
            }
          </ListItem>
            </List>
            <ListUsers data={users} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ListBookmark data={bookmarks} />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}