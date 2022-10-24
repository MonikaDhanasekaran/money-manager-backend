const mongo  = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getOverview = async (req,res) => {
    try{
        const overviewData = await mongo.selectedDb.collection("overview").find().toArray();
        res.send(overviewData);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.updateOverview = async (req,res) => {
    try{
        const id = req.params.id;
        const updatedOverview = await mongo.selectedDb.collection("overview").findOneAndUpdate({ 
            _id: ObjectId(id) },
            {$set: {...req.body}},
            {returnDocument: "after"}
        );
        res.send(updatedOverview);
    }
    catch{
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.createOverview = async (req,res) => {
    try{
        console.log(req.body);
        const insertedOverview = await mongo.selectedDb.collection("overview").insertOne(req.body);
        res.send(insertedOverview);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
};