import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Delete } from '@material-ui/icons';
import { SortableElement } from 'react-sortable-hoc';
import { DraggableColorBoxStyles } from './DraggableColorBoxStyles';

const useStyles = makeStyles(DraggableColorBoxStyles);

export const DraggableColorBox = SortableElement(
  ({ handleClick, name, color }) => {
    const props = { color };
    const classes = useStyles(props);
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span> {name}</span>
          <Delete className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
);
