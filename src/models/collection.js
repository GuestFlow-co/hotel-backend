"use strict";

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      console.log("---" + this.model);
      return this.model.findOne({
        where: { [`${this.model.name.toLowerCase()}_id`]: id },
      });
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model
      .findOne({ where: { [`${this.model.name.toLowerCase()}_id`]: id } })
      .then((record) => record.update(data));
  }

  delete(id) {
    return this.model.destroy({
      where: { [`${this.model.name.toLowerCase()}_id`]: id },
    });
  }
  async readOne(id, model, model1, model2, model3, model4, model5) {
    const records = await this.model.findOne({
      where: { [`${this.model.name.toLowerCase()}_id`]: id },
      include: [
        { model: model },
        { model: model1 },
        { model: model2 },
        { model: model3 },
        { model: model4 },
        { model: model4, include: [{ model: model5 }] },
      ],
    });
    return records;
  }
  dirty() {
    return this.model.findAll({
      where: { roomStatus: "dirty" },
    });
  }

  async readAll(model, model1, model2, model3, model4, model5) {
    const records = await this.model.findAll({
      include: [
        { model: model },
        { model: model1 },
        { model: model2 },
        { model: model3 },
        { model: model4 },
        { model: model5 },
      ],
    });
    return records;
  }
  async readTow(model, model1) {
    const records = await this.model.findAll({
      include: [{ model: model }, { model: model1 }],
    });
    return records;
  }
  async findAll(model) {
    const records = await this.model.findAll({
      include: [{ model: model }],
    });
    return records;
  }
  async findone(id, model) {
    const records = await this.model.findOne({
      where: { [`${this.model.name.toLowerCase()}_id`]: id },
      include: [{ model: model }],
    });
    return records;
  }

  async readAllfortow(model, model1, model2, model3) {
    const records = await this.model.findAll({
      where: { check_In_Date: check_In_Date, check_Out_Date: check_Out_Date },
      include: [
        { model: model },
        { model: model1 },
        { model: model2 },
        { model: model3 },
      ],
    });
    return records;
  }

  async findAlls() {
    const records = await this.model.findAll({});
    return records;
  }
}

module.exports = DataCollection;
