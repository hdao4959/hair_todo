import { Badge, Box, Tooltip } from '@mui/material';
import theme, { NavBarHeight, BoardBarHeight } from "../theme"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AddIcon from '@mui/icons-material/Add';
const BoardContentHeight = `calc(100vh - ${NavBarHeight} - ${BoardBarHeight})`
const BoardContent = () => {
  return (
    <Box sx={{
      width: "100%",
      height: BoardContentHeight,
      display: "flex",
      // flexWrap: 'nowrap',
      alignItems: 'center',
      gap: 1,
      px: 1,
      overflowX: 'auto',
      // whiteSpace: 'nowrap',
      // backgroundColor: "primary.main" 
    }}>




      <Box sx={{
        width: 250,
        minWidth: 250,
        height: `calc(${BoardContentHeight} - 20px)`,
        backgroundColor: 'primary.main',
        borderRadius: 2,
        paddingTop: 1,
        paddingX: 1,

        // marginX: 1
      }}>
        <Card sx={{ mb: 1 }}>
          <Button sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', color: 'inherit' }}
            id="button-title-content"
            aria-controls={open ? 'title-content' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}

          >
            Lizard <ExpandMoreIcon />
          </Button>
          <CardMedia
            sx={{ height: 140 }}
            image="https://cdn.pixabay.com/photo/2023/11/17/16/54/boat-8394639_1280.jpg"
            title="green iguana"
          />
          <CardContent>

            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><Tooltip title="People"><Badge badgeContent={10} color='primary.main'><GroupIcon /></Badge></Tooltip></Button>
            <Button size="small"><Tooltip title="People"><Badge badgeContent={10} color='primary.main'><ForumIcon /></Badge></Tooltip></Button>
            <Button size="small"><Tooltip title="People"><Badge badgeContent={10} color='primary.main'><AttachmentIcon /></Badge></Tooltip></Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: 1 }}>Card 1</Card>
        <Card sx={{ mb: 1 }}>Card 1</Card>

        <Button sx={{
          width: '100%',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'gray',
            color: 'white'
          }
        }}><AddIcon />Add new card </Button>
      </Box>




















    </Box>
  )
}

export default BoardContent
