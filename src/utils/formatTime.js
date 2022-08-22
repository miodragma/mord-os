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

const timeOptions = { hour12: true, hour: 'numeric', minute: '2-digit', hour12suffix: true };

export const formatTime = (dateTime) => {
  const time = dateTime.toLocaleTimeString([], timeOptions);
  return timeOptions.hour12suffix ? time : time.replace('AM', '').replace('PM', '')
};

const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };

export const formatDate = (dateTime) => {
  return dateTime.toLocaleDateString([], dateOptions);
};
