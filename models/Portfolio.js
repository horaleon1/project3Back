const mongoose = require('mongoose');

const PortfolioSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  coins:{
   Bitcoin:String,
   Ethereum:String,
  }
})

module.exports = mongoose.model('portfolio', PortfolioSchema);