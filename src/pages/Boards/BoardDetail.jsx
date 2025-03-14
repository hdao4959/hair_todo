import { Box, Container } from '@mui/material';
import theme from "../../theme"
import AppBar from '../../components/AppBar';
import BoardBar from '../../components/BoardBar';
import BoardContent from '../../components/BoardContent/BoardContent';

const BoardDetail = () => {

  return (
    <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default BoardDetail
