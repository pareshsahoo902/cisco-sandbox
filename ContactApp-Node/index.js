const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



//app config
const app = express();
const PORT = process.env.PORT || 8001;
const connectionURL = "mongodb+srv://Admin:Admin123@cluster0.unff6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//middleware
app.use(express.json())
app.use(cors())


// DB config
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const contact = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    telephone: String,
    email: String,
    address: String

})

const Contact = mongoose.model('Contact', contact)


//api endpoints
app.get('/api/', (req, res) => {
    res.status(200).send("CONTACT API BASE")
});


app.post('/api/addContact', (req, res) => {
    Contact.find({ telephone: req.body.telephone })
        .exec()
        .then(contact => {
            if (contact.length > 0) {
                return res.status(409).json({
                    message: 'Number Already Exists'
                })
            } else {

                const contactDeatils = new Contact({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    telephone: req.body.telephone,
                    email: req.body.email,
                    address: req.body.address,
                });
                contactDeatils.save().then(result => {
                    res.status(201).json({
                        status: true,
                        message: "Saved Succesfully"
                    })
                }).catch(err => {
                    res.status(500).json({
                        message: err
                    })
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: err
            })
        })
})



app.get('/api/getContacts', (req, res) => {

    Contact.find((err, users) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(users);

        }
    })



})


app.get('/api/getContacts/:id', (req, res) => {

    Contact
        .findById(req.params.id)
        .then(doc => {
            if (!doc) { return res.sendStatus(404); }
            else {
                res.status(200).send(doc);
            }
        })



})



app.put('/api/contact/:id', (req, res) => {

    const options = { returnNewDocument: true };
    Contact.findOneAndUpdate({ _id: req.params.id }, req.body, options)
        .then(contact => {
            if (!contact) {
                return res.sendStatus(403);
            } else {
                return res.status(200).send({
                    message: "Contact Updated Succesfully!",
                    status: true,


                });
            }
        })
        .catch(err => {
            return res.status(403).send(err);
        })
})


app.delete('/api/contact/:id', (req, res) => {

    const options = { returnNewDocument: true };
    Contact.deleteOne({ _id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.sendStatus(403);
            } else {
                return res.status(200).send({
                    message: "Contact Deleted Succesfully!",
                    status: true,


                });
            }
        })
        .catch(err => {
            return res.status(403).send(err);
        })
})


//listner
app.listen(PORT, () => console.log(`listning on local host ${PORT}`))