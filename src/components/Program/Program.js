import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import ProgramBar from '../ProgramBar/ProgramBar';

import classes from './Program.module.scss';

const Program = React.memo(props => {

  const { children, onClickProgram, zIndex, program } = props;
  const { id, type, currentLabel } = program;

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
        style={{
          zIndex: zIndex,
          width: program.width,
          height: program.height,
          display: program.isMinimized ? 'none' : 'flex',
        }}
        ref={programRef}
        onClick={onClickProgramHandler}>
        <ProgramBar type={type} id={id} currentLabel={currentLabel}/>
        {children}
      </div>
    </Draggable>
  )

});

export default Program;
