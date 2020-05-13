export const synctime = (): number => {
  if (process.env.REACT_APP_SYNCTIME === null) {
    return 10000;
  }
  return Number(process.env.REACT_APP_SYNCTIME);
};
export default synctime;
