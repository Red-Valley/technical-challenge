import nprogress from 'nprogress';

let counter = 0;
let delayTimeout = {};

function checkProgress() {
  if (counter > 0) {
    clearTimeout(delayTimeout);
    nprogress.start();
  } else {
    delayTimeout = setTimeout(() => {
      nprogress.done();
    }, 200);
  }
}

export function increment() {
  counter += 1;
  checkProgress();
}

export function decrement() {
  counter -= 1;
  if (counter < 0) {
    counter = 0;
  }
  checkProgress();
}
