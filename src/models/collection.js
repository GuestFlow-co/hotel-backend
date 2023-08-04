'use strict';

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
  async readOne(id, model,model1) {
    const records = await this.model.findOne({
    where: { [`${this.model.name.toLowerCase()}_id`]: id } ,
    include: [
      { model: model },
      { model: model1 }
    ]
    });
    return records;
  }
  async readAll(model, model1) {
    const records = await this.model.findAll({
      include: [
        { model: model },
        { model: model1 }
      ]
    });
    return records;
  }
}

module.exports = DataCollection;