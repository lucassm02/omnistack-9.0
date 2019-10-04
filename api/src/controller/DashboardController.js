const User = require("../model/User");
const Spot = require("../model/Spot");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User doe not exist." });
    }

    const spots = await Spot.find({ user: user_id });
    return res.json(spots);
  }
};
