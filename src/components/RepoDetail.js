import React from 'react'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { repoDetail} from './../services/search';
import { useState, useEffect } from "react";


export default function RepoDetail() {
    
    useEffect(() => {
      var path = window.location.pathname;
      var str = path.split("/");
        console.log("url",str)
    repoDetail(str[2],str[3])
    .then(searchFound => {
      console.log("repo",searchFound);
     
    });
}, [])
    return (
        <div>
                 <Grid container alignItems="stretch" spacing={3}>
  <Grid className="left-pane" item md={4} xs={12}>
  
        <Divider/>
</Grid>
 <Grid className="right-pane" item md={8} xs={12}>
  </Grid>
</Grid>
        </div>
    )
}
