export const subscribeClock = (onUpdate) => {
  const currentDateTime = new Date();
  let clockRef = setTimeout(() => {
    onUpdate(new Date());
    clockRef = setInterval(() => onUpdate(new Date()), 1000 * 60);
  }, (60 - currentDateTime.getSeconds()) * 1000);
  return clockRef;
};

export const unsubscribeClock = (clockRef) => {
  clearInterval(clockRef);
};

export const formatTime = (dateTime, timeOptions) => {
  const time = dateTime.toLocaleTimeString([], timeOptions);
  return timeOptions.hour12suffix ? time : time.replace('AM', '').replace('PM', '')
};
