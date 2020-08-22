const debounce = (fn, time) => {
  let timer;
  return (...parms) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, parms);
    }, time);
  };
};

export { debounce };