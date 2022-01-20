// import goes here
const userFcomposerHash = require("./user");

const handlerComposerList = [
  // goes here
  userFcomposerHash,
];

const handlerFComposerHash = {};

handlerComposerList.forEach(handler => {
  Object.assign(handlerFComposerHash, handler);
});

module.exports = handlerFComposerHash;
