const check = require('valid-url');
const checkURL = (url) => Boolean(check.isWebUri(`${url}`));
export { checkURL };