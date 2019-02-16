const { mkdirSync } = require("fs");
const { execSync } = require("child_process");

const toMilliseconds = seconds => seconds * 1000;

const getCurrentDate = () => {
  const now = new Date();
  const pad = number => number.toString().padStart(2, "0");

  return {
    year: now.getFullYear(),
    month: pad(now.getMonth() + 1),
    day: pad(now.getDate()),
    hours: pad(now.getHours()),
    minutes: pad(now.getMinutes()),
    seconds: pad(now.getSeconds())
  };
};

const getDirectoryPath = path => {
  const { year, month, day, hours } = getCurrentDate();

  return `${path}/${year}/${month}/${day}/${hours}`;
};

const getFileName = path => {
  const { year, month, day, hours, minutes, seconds } = getCurrentDate();

  return `${path}/${year}_${month}_${day}_${hours}_${minutes}_${seconds}.jpg`;
};

const shoot = (basePath, options) => {
  const directory = getDirectoryPath(basePath);

  mkdirSync(directory, { recursive: true });

  const file = getFileName(directory);

  const output = execSync(`/opt/vc/bin/raspistill ${options} -o ${file}`);

  console.log(file);
};

const delay = process.env.TIME_DELAY || 30;
const basePath = process.env.BASE_PATH || "/var/photos";
const options = process.env.OPTIONS || "";

console.log(`Delay: ${delay}s, Path: '${basePath}', Options: '${options}'`);

setInterval(shoot, toMilliseconds(delay), basePath, options);
