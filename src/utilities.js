import { MAX_INPUT_VALUE } from '~/constants/config';

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

export const times = (n, iterator) => {
  const accum = Array(Math.max(0, n));

  for (let i = 0; i < n; i += 1) {
    accum[i] = iterator.call();
  }

  return accum;
};

export const getEmptyUserInput = () => {
  return [...Array(MAX_INPUT_VALUE)].map(() => '');
};

export const getSecretValue = (max = 4) => {
  let nums = [...Array(10).keys()];
  const result = [];

  times(max, () => {
    const randomNum = nums[Math.floor(Math.random() * nums.length)];
    result.push(String(randomNum));

    nums = nums.filter((item) => item !== randomNum);
  });

  return result;
};

export const compareResults = (user = [], ai = []) => {
  if (user.join('') === ai.join('')) {
    return { isMatched: true };
  }

  let bulls = 0;
  let cows = 0;

  // check for bulls
  ai.forEach((item, index) => {
    if (item === user[index]) {
      bulls += 1;
    }
  });

  // checked for cows
  user.forEach((item) => {
    if (ai.includes(item)) {
      cows += 1;
    }
  });

  return { bulls, cows, isMatched: false };
};

export const getRandomItemFromList = (list = []) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getRandomNumberFromRange = ({ min = 1, max = 10, isInt = false }) => {
  return Number((Math.random() * (min - max) + max).toFixed(isInt ? 0 : 1));
};

export const renderTimes = (n, render) => {
  return [...Array(n)].map(render);
};
