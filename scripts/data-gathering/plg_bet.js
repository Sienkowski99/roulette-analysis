const LOGGER_THRESHOLD_MS = 5000;
let lastRollTimestamp = null;
const website = "plgbet";

const sendResult = (name, value) => {
  fetch(`http://localhost:3000/sets/${name}/add/${value}`, {
    method: "POST",
  });
};

const handleLog = (arguments, originalLogger) => {
  if (arguments[0] !== "finishRoll") {
    return;
  }

  const nowTimestamp = Date.now();
  const enoughTimePassed =
    nowTimestamp > lastRollTimestamp + LOGGER_THRESHOLD_MS;
  const shouldLog = lastRollTimestamp === null || enoughTimePassed;

  if (!shouldLog) {
    return;
  }

  const result = arguments[1].roll;
  originalLogger.apply(console, [result]);
  sendResult(website, result);
  lastRollTimestamp = Date.now();
};

(function () {
  let originalConsoleLog = console.log;
  console.log = function () {
    handleLog(arguments, originalConsoleLog);
  };
})();
// plg.bet
