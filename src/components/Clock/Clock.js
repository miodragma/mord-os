import { useEffect, useState } from 'react';

import { formatTime, subscribeClock, unsubscribeClock } from '../../utils/formatTime';

import classes from './Clock.module.scss';

const Clock = () => {

  const [currentDateTime, updateCurrentDateTime] = useState(new Date());
  const timeFormat = formatTime(currentDateTime);

  useEffect(() => {
    const clockRef = subscribeClock(updateCurrentDateTime);
    return () => unsubscribeClock(clockRef);
  }, []);
  return (
    <div className={classes.clock}>
      <div>{timeFormat}</div>
    </div>
  );
};

export default Clock;
