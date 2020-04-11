export const measure = (el) => {
  return new Promise((resolve) => {
    el.measureInWindow((x, y, width, height) => {
      resolve({ x, y, width, height });
    });
  });
};

export const delay = (timeout = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
