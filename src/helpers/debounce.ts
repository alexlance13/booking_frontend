export default (callback: any, time: number) => {
  let interval: number;
  const clear = () => clearTimeout(interval);
  const wrapped = (...args: any) => {
    clear();
    interval = setTimeout(() => {
      callback(...args);
    }, time);
  };
  return [wrapped, clear];
};
