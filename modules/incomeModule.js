const mongo  = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getIncome = async (req,res) => {
    try{
        const incomeData = await mongo.selectedDb.collection("income").find().toArray();
        res.send(incomeData);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.updateIncome = async (req,res) => {
    try{
        const id = req.params.id;
        const updatedIncome = await mongo.selectedDb.collection("income").findOneAndUpdate({ 
            _id: ObjectId(id) },
            {$set: {...req.body}},
            {returnDocument: "after"}
        );
        res.send(updatedIncome);
    }
    catch{
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.createIncome = async (req,res) => {
    try{
        console.log(req.body);
        const insertedIncome = await mongo.selectedDb.collection("income").insertOne(req.body);
        res.send(insertedIncome);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.deleteIncome = async (req,res) => {
    try{
        const id = req.params.id;
        const deletedIncome = await mongo.selectedDb.collection("income").remove({ _id: ObjectId(id) });
        res.send(deletedIncome);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}