require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tech_zone_db`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Products, Users, Favorites, Sales, Review} = sequelize.models;

// Aca vendrian las relaciones

Users.belongsToMany(Products, { through: Favorites });
Products.belongsToMany(Users, { through: Favorites });

const Cart = sequelize.define(
  "Cart",
  { quantity: DataTypes.INTEGER },
  {
    timestamps: false,
  }
);
Users.belongsToMany(Products, { through: Cart });
Products.belongsToMany(Users, { through: Cart });

Users.hasMany(Sales);
Sales.belongsTo(Users);

Users.hasMany(Review);
Review.belongsTo(Users);
Products.hasMany(Review);
Review.belongsTo(Products);

const SalesProducts = sequelize.define(
  "SalesProducts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Sales.belongsToMany(Products, {
  through: SalesProducts,
});
Products.belongsToMany(Sales, {
  through: SalesProducts,
});
// Product.hasMany(Reviews);

module.exports = {
  Cart,
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
