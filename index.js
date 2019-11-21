const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');


const app = express();

// Initializing middleware

// Form Data middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body middleware
app.use(bodyParser.json());

//Cors middleware
app.use(cors());

//Setting a static path
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

require('./config/passport')(passport);



// app.get('/', (req,res) => {
//     res.send("<h1>Hello World!</h1>");
// });

const user = require('./routes/api/users');
app.use('/api/users',user);


//Connecting to database
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
    useNewUrlParser: true})
    .then(() => {
        console.log(`Connected to database ${db}`);
    }).catch(err => {
    console.log(`Unable to connect to database ${err}`);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
})


