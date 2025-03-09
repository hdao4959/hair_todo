import { Badge, Box, Button, TextField, Tooltip } from '@mui/material';
import ModeSwitcher from '../ModeSwitcher';
import AppsIcon from '@mui/icons-material/Apps';
import TrelloLogo from '~/assets/trello-logo.svg'
import Workspaces from './Workspaces';
import Recent from './Recent';
import Starred from './Starred';
import Templates from './Templates';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Account from './Account';
import { NavBarHeight } from '~/theme';
const AppBar = () => {
  return (
    <Box sx={{
      width: "100%",
      height: NavBarHeight,
      padding: 1,
      display: "flex",
      alignItems: 'center',
      justifyContent: "space-between",
      overflowX: 'auto',
      overflowY: 'hidden',
      gap: 1
      // backgroundColor: "primary.light" 
    }}>
      <Box sx={{
        display: "flex",
        gap: 1,
        alignItems: 'center'
      }}>
          <AppsIcon />
          <img width="80px" src={TrelloLogo} alt="" />
      
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />


        <Button variant='outlined' sx={{ backgroundColor: "primary.dark", color: 'primary.light' }}>
          <AddIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: 'center' }}>
        <TextField sx={{ minWidth: 100 }} id="outlined-search" label="Search..." type="search" size="small" />
        <Tooltip title="Notification" >
          <Badge badgeContent={4} color="primary" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon color="action" title="notification" sx={{ color: "primary.main" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "primary.main" }} />
        </Tooltip>
        <ModeSwitcher />
        <Account />
      </Box>
    </Box>
  )
}

export default AppBar
