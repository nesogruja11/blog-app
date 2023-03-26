import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard.jsx";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";
import TopContent from '../../components/TopContent/TopContent.jsx';
import { useApprovedBlogs } from '../../hooks/services/useBlog.js';
import { useState, useEffect } from 'react';

function Home(){

    const { data: approvedBlogsData } = useApprovedBlogs();
    const [approvedBlogs, setApprovedBlogs] = useState();


    useEffect(() => {
       setApprovedBlogs(approvedBlogsData);
    }, [approvedBlogsData]);


    console.log(approvedBlogs);


    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <BlogCard/>
                        <BlogCard/>
                        <BlogCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <TopContent title="Top autori" array={["Marko Marković", "Marko Marković", "Marko Marković", "Marko Marković", "Marko Marković"]}/>
                        <TopContent  title="Top blogovi" array={["Blog 1", "Blog 2", "Blog 3", "Blog 4"]}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;