import { useEffect, useState } from 'react';

import { formatTime, subscribeClock, unsubscribeClock } from '../../utils/formatTime';

import classes from './Clock.module.scss';

const timeOptions = { hour12: true, hour: 'numeric', minute: '2-digit', hour12suffix: true };

const Clock = () => {

  const [currentDateTime, updateCurrentDateTime] = useState(new Date());
  const dateTimeFormat = formatTime(currentDateTime, timeOptions);

  useEffect(() => {
    const clockRef = subscribeClock(updateCurrentDateTime);
    return () => unsubscribeClock(clockRef);
  }, []);
  return (
    <div className={classes.clock}>
      <div>{dateTimeFormat}</div>
    </div>
  );
};

export default Clock;
