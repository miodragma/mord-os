import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import ProgramBar from '../ProgramBar/ProgramBar';

import classes from './Program.module.scss';

const Program = React.memo(props => {

  const { children, type, id, onClickProgram, zIndex } = props;

  const programRef = useRef(null);

  useEffect(() => onClickProgram(id), [id, onClickProgram]);

  const onClickProgramHandler = () => {
    onClickProgram(id);
  };

  return (
    <Draggable
      handle=".programBar"
      bounds="parent"
      nodeRef={programRef}>
      <div
        className={classes.program}
        style={{ zIndex: zIndex }}
        ref={programRef}
        onClick={onClickProgramHandler}>
        <ProgramBar type={type} id={id}/>
        {children}
      </div>
    </Draggable>
  )

});

export default Program;
