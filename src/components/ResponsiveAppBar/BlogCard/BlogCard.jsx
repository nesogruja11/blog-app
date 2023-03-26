import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import blog from '../../../assets/img/blog2.jpg';

function BlogCard(){

    return(
        <>
          <div style={{marginTop:'5px', marginLeft:'5px'}}>
          <Card sx={{ maxWidth: 1000 }} style={{backgroundColor:'lightgrey'}}>
            <CardMedia
              sx={{ height: 200 }}
              image={blog}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          </div>
        </>
    );
}

export default BlogCard;