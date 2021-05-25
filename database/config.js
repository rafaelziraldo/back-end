const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect( 'mongodb://localhost:27017/redSocial' , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }


}


module.exports = {
    dbConnection
}