
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
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
            allowNUll: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
