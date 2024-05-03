const LOGGER_THRESHOLD_MS = 5000;
let lastRollTimestamp = null;
const website = "csgo500com";
const OBSERVER_CONFIG = { childList: true, subtree: true };

const sendResult = (name, value) => {
  fetch(`http://localhost:3000/sets/${name}/add/${value}`, {
    method: "POST",
  });
};

const targetClass = "roulette-history-list";
const elementToObserve = document.querySelector(`div.${targetClass}`);

const reactToMutation = () => {
  const nowTimestamp = Date.now();
  const shouldLog =
    lastRollTimestamp === null ||
    nowTimestamp > lastRollTimestamp + LOGGER_THRESHOLD_MS;

  if (!shouldLog) {
    return;
  }

  const lastDelementToObserve =
    elementToObserve.querySelector("div:last-child");

  if (!lastDelementToObserve) {
    return;
  }
  const cssClasses = Array.from(lastDelementToObserve.classList);
  let result = null;
  if (cssClasses.includes("green")) {
    result = "green";
  } else if (cssClasses.includes("black")) {
    result = "black";
  } else if (cssClasses.includes("red")) {
    result = "red";
  }

  if (!result) {
    return;
  }

  console.log(result);
  sendResult(website, result);
  lastRollTimestamp = Date.now();
};

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      reactToMutation();
    }
  }
});

observer.observe(elementToObserve, OBSERVER_CONFIG);
// csgofast.com
