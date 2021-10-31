import React, { useState } from "react";
import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";
import Typography from '@mui/material/Typography';
import { RatingView } from 'react-simple-star-rating';
import './BookList.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function MyStarRating(r) {
  return (
    <div >
      <RatingView ratingValue={r}  />
    </div>
  )
}

const BookList = ({list, onDelete}) => {
  return (
    <div className="kartice" >
    {list.map((kartica) =>(       
       
    <Card className="kartica" key={kartica.id}>       
      <CardContent>           
        <Typography   component="div">
          {kartica.title}         
        </Typography>
        <Typography>
        {kartica.authors.join(",")}
        </Typography>
        <Typography >
       Published: {kartica.publishDate}
          </Typography>
        <Typography >
        <RatingView className="ocenaDugme" ratingValue={kartica.rating} size={20} />
        <Button className="details"><TableDropdown text="Details"
                  items={
                      [
                        {text: "Detaljno", link: true, path: `/book/${kartica.id}/view`},
                        {text: "Promeni", link: true, path: `/book/${kartica.id}/edit`},
                        {text: "Obrisi", link: false, action: () => onDelete(kartica.id)}
                      ]
                  }
                  /></Button>     
          </Typography>        
      </CardContent> 
    </Card>
    ))}
    </div>
  );
}

export default BookList;