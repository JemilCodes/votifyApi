const handleCookies = (res, key, value) => {
  const deployment = process.env.NODE_ENV;
  console.log(deployment);

  res.cookie(key, value, {
    httpOnly: true,
    ...(deployment === "production" && { secure: true }),
    // sameSite: "None", //cross-site cookie
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

module.exports = handleCookies;
