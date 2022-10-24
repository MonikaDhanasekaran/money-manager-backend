const mongo  = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getExpense = async (req,res) => {
    try{
        const expenseData = await mongo.selectedDb.collection("expense").find().toArray();
        res.send(expenseData);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.updateExpense = async (req,res) => {
    try{
        const id = req.params.id;
        const updatedExpense = await mongo.selectedDb.collection("expense").findOneAndUpdate({ 
            _id: ObjectId(id) },
            {$set: {...req.body}},
            {returnDocument: "after"}
        );
        res.send(updatedExpense);
    }
    catch{
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.createExpense = async (req,res) => {
    try{
        console.log(req.body);
        const insertedExpense = await mongo.selectedDb.collection("expense").insertOne(req.body);
        res.send(insertedExpense);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.deleteExpense = async (req,res) => {
    try{
        const id = req.params.id;
        const deletedExpense = await mongo.selectedDb.collection("expense").remove({ _id: ObjectId(id) });
        res.send(deletedExpense);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}