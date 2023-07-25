import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ViewConstants } from '../constants';
import { useNavigate } from 'react-router';
import ProjectForm from './forms/ProjectForm';
import Tools from '../Tools'
import withCrossIcon from './higher-order-components/withCrossIcon';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const tools = new Tools();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (view) => {
    setAnchorEl(null);
    if(view === ViewConstants.PROJECT_VIEW) navigate('projects/');
    if(view === ViewConstants.PROJECT_FORM) {
      tools.displayComponent(<ProjectForm/>);
    }
  };

  return (
    <AppBar position="sticky" style={{backgroundColor:"black", borderRadius:"5px"}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Portfolio
        </Typography>
        <Button color="inherit" onClick={(e) => navigate('/')}>About Shivansh</Button>
        <Button color="inherit" onClick={(e)=> navigate('ai_models/')}>AIs</Button>
        <Button color="inherit" onClick={handleClick}>
          Projects
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={(e) => handleClose(ViewConstants.PROJECT_VIEW)}>View projects</MenuItem>
          <MenuItem onClick={(e) => handleClose(ViewConstants.PROJECT_FORM)}>Add new project</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
