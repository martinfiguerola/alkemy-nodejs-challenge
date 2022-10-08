const { Sequelize } = require('sequelize')
const { dbName, dbUser, dbPassword, dbhost } = require('../utils/config/index')
const userFactory = require('./User')
const characterFactory = require('./Characters')
const movieFactory = require('./Movies')
const genreFactory = require('./Genre')

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbhost,
  dialect: dbUser,
  logging: false
});

const User = userFactory(sequelize)
const Character = characterFactory(sequelize)
const Movie = movieFactory(sequelize)
const Genre = genreFactory(sequelize)

// Aca seteo mis relaciones

// --- M a N ---
Character.belongsToMany(Movie, { through: "characterMovie" });
Movie.belongsToMany(Character, { through: "characterMovie" })


// --- 1 a N ---
Genre.hasMany(Movie, {
  foreignKey: "genreId",
  sourceKey: 'id'
})
Movie.belongsTo(Genre, {
  foreignKey: "genreId",
  targetId: 'id'
})



module.exports = {
  conn: sequelize,
  User,
  Character,
  Movie,
  Genre
}