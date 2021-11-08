//importing all the modules required 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



//Configure your app here
const app = express();
const PORT = process.env.PORT || 8001;
//Connect with mongoDB here
const connectionURL = "mongodb+srv://Admin:Admin123@cluster0.unff6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//middleware
app.use(express.json())
//Include Cors for cross orgin access
app.use(cors())


// DB config
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Create a Schema for contact using mongoose
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

//Endpoint for adding a contact
app.post('/api/addContact', (req, res) => {
    //Check if same contact already exists
    Contact.find({ telephone: req.body.telephone })
        .exec()
        .then(contact => {
            if (contact.length > 0) {
                return res.status(409).json({
                    message: 'Number Already Exists'
                })
            } else {
                //Create a contact object and save it in mongoDB
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


//Endpoint for getting all contacts

app.get('/api/getContacts', (req, res) => {
    //find all contacts in DB
    Contact.find((err, users) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(users);

        }
    })



})

//Endpoint for getting a contact by id

app.get('/api/getContacts/:id', (req, res) => {
       //adding filter to find a contact by iD
    Contact
        .findById(req.params.id)
        .then(doc => {
            if (!doc) { return res.sendStatus(404); }
            else {
                res.status(200).send(doc);
            }
        })



})


//Endpoint for updating a contact by id
app.put('/api/contact/:id', (req, res) => {
    //get the contact by id to update
    const options = { returnNewDocument: true };
    //findoneandupdate updates the particular contact with new data
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

//Endpoint for deleting a contact by id
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

//start the server to listen for the request
//listner
app.listen(PORT, () => console.log(`listning on local host ${PORT}`))
