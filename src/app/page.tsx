import React from 'react';
import PostsMe from './_comonents/postsMe/page';
import Posts from './posts/page';
import { Grid } from '@mui/material';

export default function Home() {
  return (<>
    <div className='py-10'>
      <Grid container spacing={3}>
        <Grid sx={{ margin: "auto" }} item xs={8}>
          <PostsMe />
        </Grid>
        <Grid item xs={12}>
          <div className='m-auto flex justify-center flex-col items-center py-6 my-2'>
            <Posts />
          </div>
        </Grid>
      </Grid>
    </div>
  </>
  );
}
