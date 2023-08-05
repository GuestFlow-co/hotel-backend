'use strict';
// const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(DATABASE_URL);
// const bookedServices = require("./bookedServices")(sequelize, DataTypes)

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      console.log("---"+this.model)
      return this.model.findOne({ where: { [`${this.model.name.toLowerCase()}_id`]: id } });
      // { where: { [`${this.model.name.toLowerCase()}_id`]: id } }
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne({ where: { [`${this.model.name.toLowerCase()}_id`]: id } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { [`${this.model.name.toLowerCase()}_id`]: id } });
  }
  async readOne(id, model,model1,model2) {
    const records = await this.model.findOne({
    where: { [`${this.model.name.toLowerCase()}_id`]: id } ,
    include: [
      { model: model },
      { model: model1 },
      {
        model: model2, 
      },
    ],
    });
    return records;
  }
  
  async readAll(model, model1, model2) {
    const records = await this.model.findAll({
      include: [
        { model: model },
        { model: model1 },
        {
          model: model2, 
        },
      ],
    });
    return records;
  }
  async findAll(model) {
    const records = await this.model.findAll({
      include: [
        { model: model }
      ],
    });
    return records;
  }
  async findone(id,model) {
    const records = await this.model.findOne({
      where: { [`${this.model.name.toLowerCase()}_id`]: id } ,
      include: [
        { model: model },
      
      ],
      });
    return records;
  }
  
}

module.exports = DataCollection;