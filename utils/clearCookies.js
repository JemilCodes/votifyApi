const clearCookie = (res, key) => {
  res.clearCookie(key, { httpOnly: true, secure: true });
};

module.exports = clearCookie;
