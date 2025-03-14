import Card from './Cards/Card';
import { Box } from '@mui/material';


const ListCards = ({ cards }) => {

  return (

    <Box sx={{
      paddingX: 0.5
    }}>
      {cards.map((card, index) => {
        return (
          <Card key={index} card={card} />

        )
      })}

    </Box>
  )
}

export default ListCards
