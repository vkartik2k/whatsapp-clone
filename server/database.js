const Sequelize = require('sequelize')

const database = new Sequelize('whatsapp', 'root', 'SYSADMIN@1234!',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        min:0,
        max:5
    },
    logging: false
})

const Message = database.define('Message', {
    mid : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    content : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    to : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    from : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    deliveredOn : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receivedOn : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    readOn : {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

const User = database.define('User', {
    phone : {
        type : Sequelize.STRING,
        primaryKey : true,
    },
    handle : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    displayPicture : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    registeredOn : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastSeen : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isActive :{
        type: Sequelize.STRING,
        allowNull: false,
    }
})

database.sync()
    .then(() => console.log('DATABASE HAS BE SYNCED.'))
    .catch((err) => console.error('PROBLEM IN SYNCING DATABASE.'))

exports = module.exports = {Message, User}