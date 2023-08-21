const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const { logger } = require('./src/middleware/logEvents');
const { corsOptions } = require('./src/configs/corsOptions');
const { errorHandle } = require('./src/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./src/middleware/credentials');
const PORT = process.env.PORT || 3500;


//custom middleware logger
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(logger);


app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.get('/',(req,res)=> res.json("SERVER Working.."));
app.use('/create',require('./src/routes/Router'));
app.use('/api/v1/auth/',require('./src/routes/authRouter'));
app.use('/api/v1/properties',require('./src/routes/propertiesRouter'));
app.use('/api/v1/units',require('./src/routes/unitsRouter'));
app.use('/api/v1/utilities',require('./src/routes/utilityRouter'));
app.use('/api/v1/tenants',require('./src/routes/tenantRouter'));
app.use('/api/v1/payments',require('./src/routes/paymentRouter'));
app.use('/api/v1/agents',require('./src/routes/agentRouter'));
app.use('/api/v1/transactions',require('./src/routes/transactionRouter'));
//app.use('/api/busness/',require('./src/routesbusinessRouter'));

app.get('/', (req, res) => {
    res.send('Hello worlldk')

});

app.use(errorHandle)
app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
