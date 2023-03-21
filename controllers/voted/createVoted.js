const votedModel = require("../../models/votedModel");
const electionModel = require("../../models/electionModel");
const { StatusCodes } = require("http-status-codes");
const Pusher = require("pusher");
const dayjs = require("dayjs");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

const createvoted = async (req, res) => {
  const { electionId, electionTitle, electionStatus } = req.cookies;
  const { voteData, voterId, voterName } = req.body;

  const electData = await electionModel.findById(electionId);

  const timestampDayjs = dayjs(electData.endDate);
  const nowDayjs = dayjs();

  if (electData.endDate && timestampDayjs.isBefore(nowDayjs)) {
    return res.status(StatusCodes.OK).json("electionEnded");
  }

  if (electionStatus !== "running") {
    return res.status(StatusCodes.FORBIDDEN).json("cantVoteNotRunning");
  }

  const isVoted = await votedModel.findOne({
    voterName,
    voterId,
    createdBy: electionId,
  });

  if (isVoted) {
    return res.status(401).json("alreadyVoted");
  }

  await pusher.trigger(process.env.PUSHER_ENV, "my-event", {
    voterId,
    voterName,
    createdBy: electionId,
    timeVoted: Date.now(),
    electionTitle,
    voteData,
  });

  if (electionId && voteData && voterId && voterName && electionTitle) {
    const voted = await votedModel.create({
      voterId,
      voterName,
      electionTitle,
      createdBy: electionId,
      timeVoted: Date.now(),
      voteData,
    });
    if (voted) {
      return res.status(StatusCodes.CREATED).json(voted);
    } else {
      return res.status(StatusCodes.OK).json("votedError");
    }
  } else {
    return res.status(StatusCodes.OK).json("votedError");
  }
};
module.exports = createvoted;
