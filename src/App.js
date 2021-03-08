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
import { searchRepositories, searchUsers,getBookmarks } from '../src/services/search';
import Grid from '@material-ui/core/Grid';
import ListRepo from './components/ListRepo';
import { useHistory } from "react-router-dom";
import ListUsers from './components/ListUsers';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import BookmarkList from './components/BookmarkList'

import { useContext } from 'react';
import ListBookmark from './components/ListBookmark';

const KullaniciContext = React.createContext()

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
  grow: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 2,
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
  rectangle: {
    width: '360px',
    height: '46px',
    flexGrow: '0',
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
  },
  book: {
    width: '24px',
    height: '24px',
    margin: '4px 8px 0 63px',
    objectFit: 'contain'
  },
  airbnb: {
    width: '182px',
    height: '24px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: '250px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.2',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#375f9d'
  },
  listDivider: {
    width: '952px',
    height: '1px',
    margin: '23px 64px 44px 63px',
    backgroundColor: '#bebebe'
  },
  number: {
    width: '360px',
    height: '46px',
    flexGrow: '0',
    margin: '8px 0 0',
    padding: '13px 22px 13px 20px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  verticaldvder: {
    width: '1px',
    height: '855px',
    marginLeft: '-5px',
    marginBottom: '0',
    transformY: 'rotate(90deg)',
    backgroundColor: '#c4c4c4',
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


  let sear;
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRepositories(e.target.value)
        .then(searchFound => {
          console.log("repo", searchFound.total_count);
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
          searchFound.map(function(val, index){ 
           console.log("value",val.full_name);
           console.log((val.full_name).includes(e.target.value));
           setBookmarks(val);
        })

        });
    }
  }
  function goToBookmarkList() {
    history.push('/list-bookmarks') ;
  }
   console.log("bookmarks", bookmarks);

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
          <BookmarkBorderIcon className={classes.bookmarkBorder} onClick={goToBookmarkList}/>
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
            {/* <InsertDriveFileIcon/> */}
            <Tab icon={<InsertDriveFileIcon />} label="Repositories" {...a11yProps(0)} />
            {/* <InsertEmoticonIcon/> */}
            <Tab icon={<InsertEmoticonIcon />} label="Users" {...a11yProps(1)} />
            {/* <BookmarkBorderIcon/> */}
            <Tab icon={<BookmarkBorderIcon />} label="Bookmarked" {...a11yProps(2)} />

          </Tabs>
        </Grid>
        <Grid className="right-pane" item md={8} xs={12}>
          <TabPanel value={value} index={0}>
            <ListRepo data={values} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListUsers data={users}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
              <ListBookmark data={bookmarks}/>
         </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}