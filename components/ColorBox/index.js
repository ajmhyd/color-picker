import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ColorBoxStyles } from './ColorBoxStyles.js';

const useStyles = makeStyles(ColorBoxStyles);

export default function ColorBox({
  background,
  name,
  showingFullPalette,
  paletteId,
  colorId,
}) {
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
        {showingFullPalette && (
          <Link
            href="/palette/[paletteId]/[colorId]"
            as={`/palette/${paletteId}/${colorId}`}
          >
            <span
              className={classes.seeMore}
              onClick={e => e.stopPropagation()}
              role="button"
              onKeyDown={e => e.stopPropagation()}
              tabIndex={0}
            >
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showingFullPalette: PropTypes.bool.isRequired,
  paletteId: PropTypes.string,
  colorId: PropTypes.string,
};
