import React, { useEffect } from 'react'
import { Box, Container, Divider, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBlog,
} from "../redux/slices/blogSlice";

import BlogCard from '../components/BlogCard';
function BlogPage() {
    const dispatch = useDispatch()
    const { blogList } = useSelector(
        (state) => state.blogKey
    );
    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);
    return (
        <Box component="div">
            <Container maxWidth="lg" component="main" >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography component='h2' variant='h4' sx={{ my: 5 }}>Blogs</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
                        {blogList.map(blog => (
                            <BlogCard blog={blog} />
                        ))}
                    </Box>

                </Box>
            </Container>

        </Box>
    )
}

export default BlogPage