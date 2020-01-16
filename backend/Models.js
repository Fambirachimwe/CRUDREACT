const mongoose =  require('mongoose');
const Schema = mongoose.Schema;



const NamesSchema = new Schema({
    name: String
});



const NameModel = mongoose.model('NameModel', NamesSchema);

module.exports = NameModel;

