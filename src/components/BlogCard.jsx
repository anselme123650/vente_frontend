import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, Grid, TextField } from '@mui/material';

const BlogCard = ({ blog }) => {
  return (
    <Card sx={{ width: 500, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {blog.titre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {new Date(blog.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Lire plus
        </Button>
      </CardActions>
    </Card>
  );
};



export default BlogCard;
