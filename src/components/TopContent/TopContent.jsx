import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function TopContent(props){

    return(
        <>
          <div style={{marginTop:'5px', marginLeft:'5px'}}>
          <Card sx={{ maxWidth: 700 }} style={{backgroundColor:'lightgrey'}}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {props?.title}
              </Typography>
              <p>
              {
                props?.array.map((x) => {
                  return <h5>{x}</h5>
                })
              }</p>
            </CardContent>
          </Card>
          </div>
        </>
    );
}

export default TopContent;