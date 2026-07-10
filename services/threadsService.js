const snapsave = require("metadownloader");

module.exports = async (url) => {
  try {
    const result = await snapsave(url);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch Instagram/Facebook media");
  }
};
