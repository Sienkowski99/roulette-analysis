const LOGGER_THRESHOLD_MS = 5000;
let lastRollTimestamp = null;
const website = "csgofastcom";
const OBSERVER_CONFIG = { childList: true, subtree: true };

const sendResult = (name, value) => {
  fetch(`http://localhost:3000/sets/${name}/add/${value}`, {
    method: "POST",
  });
};

const targetClass = "game-history-list";
const elementToObserve = document.querySelector(`ul.${targetClass}`);

const reactToMutation = () => {
  const nowTimestamp = Date.now();
  const shouldLog =
    lastRollTimestamp === null ||
    nowTimestamp > lastRollTimestamp + LOGGER_THRESHOLD_MS;

  if (!shouldLog) {
    return;
  }

  const firstLi = elementToObserve.querySelector("li");
  if (!firstLi) {
    return;
  }

  const result = firstLi.textContent;
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
