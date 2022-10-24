
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        date_created: {
            type: DataTypes.DATE,
            allowNUll: false
        },
        date_modified: {
            type: DataTypes.DATE,
            allowNUll: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            references: {
                model: 'post',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;