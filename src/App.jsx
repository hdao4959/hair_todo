import { Button } from '@mui/material';
import {   Experimental_CssVarsProvider as CssVarsProvider, useColorScheme } from '@mui/material/styles';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlined from '@mui/icons-material/DarkMode'


const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeOutlined/> : <LightModeIcon/>}
    </Button>
  );
};

function App() {
  return (
    // <CssVarsProvider theme={theme} >
      <>
        {/* đào xuân hải */}
        <ModeSwitcher />
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </>
    // </CssVarsProvider>
  );
}

export default App;
