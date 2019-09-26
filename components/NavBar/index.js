import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  MenuItem,
  Slider,
  Select,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { NavBarStyles } from './NavBarstyles';

const useStyles = makeStyles(NavBarStyles);

export default function NavBar({ level, setLevel, format, setFormat }) {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router.query);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleFormatChange = e => {
    setFormat(e.target.value);
    setOpen(true);
  };

  const handleSliderChange = (e, value) => {
    setLevel(value);
  };
  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link href="/palette/[pid]" as="/palette/material-ui-colors">
          <a>Color Picker</a>
        </Link>
      </div>
      <div>
        <span>Level: {level}</span>
        <div className={classes.slider}>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            onChange={(e, value) => handleSliderChange(e, value)}
            step={100}
          />
        </div>
      </div>
      <div className={classes.selectContainer}>
        <Select value={format} onChange={e => handleFormatChange(e)}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}</span>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={() => setOpen(false)}
        action={[
          <IconButton
            onClick={() => setOpen(false)}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <Close />
          </IconButton>,
        ]}
      />
    </header>
  );
}
