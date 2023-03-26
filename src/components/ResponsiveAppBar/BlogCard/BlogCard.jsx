import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import blog from '../../../assets/img/blog2.jpg';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function BlogCard(){

  const handleClickOnLink = () => {
    alert('click on blog link');
  }

    return(
        <>
          <div style={{marginTop:'5px', marginLeft:'10px'}}>
          <Card sx={{ maxWidth: 1300 }} style={{backgroundColor:'lightgrey'}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={blog}
                    title="green iguana"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Link onClick={handleClickOnLink}>
                  <Typography gutterBottom variant="h5" component="div">
                    Naslov bloga
                  </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                  Blog je web lokacija, nešto kao internetski dnevnik ili informativna web stranica, koji je se bavi pisanjem sadržaja iz jedne ili više odabranih tema. Sadržaj se piše u obliku blog članaka (ili blog postova) koji se na blogu prikazuju obrnutim kronološkim redoslijedom.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{float:'right'}}>
                    Datum kreiranja: 26.03.2023
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </div>
        </>
    );
}

export default BlogCard;