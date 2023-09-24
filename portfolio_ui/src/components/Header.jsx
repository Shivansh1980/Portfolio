import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { ViewConstants } from '../constants';
import { useNavigate } from 'react-router';
import Tools from '../Tools'
import withCrossIcon from './higher-order-components/withCrossIcon';

const Header = () => {
  const navigate = useNavigate();
  const tools = new Tools();

  return (
    <AppBar position="sticky" style={{backgroundColor:"black", borderRadius:"5px"}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Portfolio
        </Typography>
        <Button color="inherit" onClick={(e) => navigate('/ai/')}>AI Models</Button>
        <Button color="inherit" onClick={(e) => navigate('/')}>About Shivansh</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
