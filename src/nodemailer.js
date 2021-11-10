const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


const transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    secure: false,
    auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASSWORD
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        defaultLayout: './views/layouts/main'
    },
    viewPath: './views/',
    extName: '.hbs'
}));


module.exports = transporter