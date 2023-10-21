const { Sequelize } = require('sequelize');

//we don't need to use the mysql2 as it is used internally by sequelize

//A constructor function is a function that creates an instance of a class.
//that creates an instance of a class. In Javascript, a constructor gets called
//when you declare an object using the new keyword.
const sequelize = new Sequelize('sequelize', 'root', 'Pattern@123', {
    // host: 'localhost',
    // port: 3306,
    dialect: 'mysql',
    //define: {
    //    freezeTableName: true //this will set for every table in the DB
    //}
});

//async wait is just another way to interact with promises. However, these keywords are only 
//used with functions. The sequelize documentation uses await and async but we will be using then() instead.
// sequelize.authenticate().then(()=>{
//     console.log("Connection is successful!");
// }).catch((err)=>{
//     console.log("Error connecting to DB!");
// });

// async function myFunction(){
//     await sequelize.authenticate();
//     console.log("Connection Successful!");
// } 

// myFunction();

// console.log("Another task....")

//When we say sequelize is interacting with the model it implies, it is communicating with the table in the DB.
//So you can query the model, add a column, remove a column

const Users = sequelize.define('user', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    age: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21
    },
    active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    freezeTableName: true,
    timestamps: false
});

//By Default value of each column is null

//Accessing the models
console.log(sequelize.models.user);

//Sync it with the DB and insert table into the DB
Users.sync( { alter: true } ).then((data)=>{
    console.log("Table and model synced successfully!")
}).catch((err)=>{
    console.log("Error syncing the table and model")
});

//Sequelize automatically pluralize the table names and uses that as the table name. This pluralization is of course done under
//the hood by a library called inflection.

//Sequelize automatically adds two columns by itself createdAt and updatedAt

//NOTE: Sequelize only creates table only when table doesn't exists

//sequelize.sync({alter: true})--> This will apply to all the tables that are modeled in the program.
//User.drop(); to drop a table
//sequelize.drop() to delete each table.

//sequelize.drop({match: /_test$/ }); // this will drop all tables ending with the _test
//means match at the end

