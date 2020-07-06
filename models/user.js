// user model decleration 
// define use case
// import libraries 
'use strict';
const bcrypt = require('bcrypt')

// declare user model format
module.exports = function(sequelize, DataTypes) {
    // define user object 
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING, 
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number.'
                }
            }
        },
        admin: {
            type: DataTypes.STRING,
            validate: {
                args: [0, 2],
                msg: 'admin yes or no'
            }
        },
        bio: {
            type: DataTypes.STRING,
            validate: {
                args: [1, 900],
                msg: 'invalid bio'
            }
            
        }
    }, {
        hooks: {
            //take inputed password
            ///before record creation
                //take inputed password
                //hash pass
                //return new hash pass as pass for record
            beforeCreate: function(createdUser, options) {
                if(createdUser && createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash;

                }
            }
        }
    })
    user.associate = function(models) {
        //any associations can go here
    }
    //valid definition to validate at login
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
    }
    //remove password before any serialization of User object
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }

    return user;

};
