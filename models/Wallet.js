const mongoose = require('mongoose');

const WalletSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users'
  },
  amount:{
    type: String,
    required:true
  }
})

module.exports = mongoose.model('wallet', WalletSchema);