import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import clsx from 'clsx';
import { ColorBoxStyles } from './ColorBoxStyles.js';

const useStyles = makeStyles(ColorBoxStyles);

export default function ColorBox({ background, name, showingFullPalette }) {
  const props = { background, showingFullPalette };
  const classes = useStyles(props);
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={clsx(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        />
        <div
          className={clsx(classes.copyMessage, {
            [classes.showMessage]: copied,
          })}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton} type="button">
            Copy
          </button>
        </div>

        <span className={classes.seeMore}>More</span>
      </div>
    </CopyToClipboard>
  );
}
