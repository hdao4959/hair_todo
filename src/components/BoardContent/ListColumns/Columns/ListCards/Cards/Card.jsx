import { Badge, Tooltip, Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const showCardAction = () => {
  if (!!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length) {
    return 1;
  }
  return 0;
}
const Card = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: card });

  const cardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <>
      <MuiCard ref={setNodeRef} style={cardStyle} {...attributes} {...listeners}
        className={`${isDragging ? 'isDragging' : ''}`} key={card._id}
        sx={{
          cursor: 'pointer',
          mb: 1,
          overflow: 'unset'
        }}>
        {card?.cover &&
          <CardMedia
            sx={{ height: 150 }}
            image={card?.cover}
            title={card?.title}
          />
        }

        <CardContent sx={{ paddingLeft: 1, paddingBottom: 0, paddingRight: 1 }}>
          <Typography variant="p" color="text.secondary">
            {card?.title}
          </Typography>
        </CardContent>

        {showCardAction && <CardActions >

          {!!card?.memberIds?.length && <Button size="small"><Tooltip title="People"><Badge badgeContent={card?.memberIds?.length} color='primary.main'>
            <GroupIcon /></Badge></Tooltip></Button>}

          {!!card?.comments?.length && <Button size="small"><Tooltip title="People"><Badge badgeContent={card?.comments?.length} color='primary.main'>
            <ForumIcon /></Badge></Tooltip></Button>}

          {!!card?.attachments?.length && <Button size="small"><Tooltip title="People"><Badge badgeContent={card?.attachments?.length} color='primary.main'>
            <AttachmentIcon /></Badge></Tooltip></Button>}


        </CardActions>}

      </MuiCard >

    </>
  )
}

export default Card
