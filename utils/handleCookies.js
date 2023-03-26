const handleCookies = (res, key, value) => {
  const deployment = process.env.NODE_ENV;

  res.cookie(key, value, {
    httpOnly: true,
    ...(deployment === "production" && { secure: true }),
    ...(deployment === "production" && { sameSite: "None" }),
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

module.exports = handleCookies;
