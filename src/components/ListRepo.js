import React from 'react'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from "react";

const useStyles = ({
    grow: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 2,
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
    },
    book :{
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
    listDivider:{
      width: '952px',
      height: '1px',
      margin: '23px 64px 44px 63px',
      backgroundColor: '#bebebe'
    }
  });
  
export default function ListRepo(props) {

  const [users,setUsers] = useState();
  let values = props.data;

    return (
      
        <List >
        { props.data && Object.values(values).map((value,index) => (
        <ListItem  key={index} alignItems="flex-start">
        <ListItemAvatar>
          <BookOutlinedIcon/>
        </ListItemAvatar>
        <ListItemText
          primary= {value[index].full_name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                
                color="textPrimary"
              >
               {value[index].description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
        ))}
        <Divider ></Divider>
        </List>
    )
}
