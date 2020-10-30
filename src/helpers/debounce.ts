export default (callback: any, time: number) => {
  let interval: number;
  return (...args: any) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      callback(...args);
    }, time);
  };
};
