const DataCollection = require('../src/models/collection');

const MockModel = {
    name: "MockModel",
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };
  
  const MockModel1 = { name: "MockModel1" };
  const MockModel2 = { name: "MockModel2" };
  const MockModel3 = { name: "MockModel3" };
  
  describe("DataCollection", () => {
    let dataCollection;
  
    beforeEach(() => {
      dataCollection = new DataCollection(MockModel);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("get(id)", () => {
      test("should call model.findOne with correct parameters when id is provided", () => {
        const id = 1;
        dataCollection.get(id);
        expect(MockModel.findOne).toHaveBeenCalledWith({
          where: { [`${MockModel.name.toLowerCase()}_id`]: id },
        });
      });
  
      test("should call model.findAll when id is not provided", () => {
        dataCollection.get();
        expect(MockModel.findAll).toHaveBeenCalled();
      });
    });
  
    describe("create(record)", () => {
      test("should call model.create with the provided record", () => {
        const record = { name: "Test Record" };
        dataCollection.create(record);
        expect(MockModel.create).toHaveBeenCalledWith(record);
      });
    });
  
    describe("update(id, data)", () => {
      test("should call model.findOne and then record.update with the provided data", async () => {
        const id = 1;
        const data = { name: "Updated Record" };
        const mockRecord = { update: jest.fn() };
        MockModel.findOne.mockResolvedValue(mockRecord);
  
        await dataCollection.update(id, data);
  
        expect(MockModel.findOne).toHaveBeenCalledWith({
          where: { [`${MockModel.name.toLowerCase()}_id`]: id },
        });
        expect(mockRecord.update).toHaveBeenCalledWith(data);
      });
    });
  
    describe("delete(id)", () => {
      test("should call model.destroy with the provided id", () => {
        const id = 1;
        dataCollection.delete(id);
        expect(MockModel.destroy).toHaveBeenCalledWith({
          where: { [`${MockModel.name.toLowerCase()}_id`]: id },
        });
      });
    });
  
    describe("readOne(id, model, model1, model2, model3)", () => {
      test("should call model.findOne with correct parameters and include models", async () => {
        const id = 1;
        const mockModel = { name: "MockModel" };
        const mockModel1 = { name: "MockModel1" };
        const mockModel2 = { name: "MockModel2" };
        const mockModel3 = { name: "MockModel3" };
  
        await dataCollection.readOne(id, mockModel, mockModel1, mockModel2, mockModel3);
  
        expect(MockModel.findOne).toHaveBeenCalledWith({
          where: { [`${MockModel.name.toLowerCase()}_id`]: id },
          include: [
            { model: mockModel },
            { model: mockModel1 },
            { model: mockModel2 },
            { model: mockModel3 },
          ],
        });
      });
    });
  
    describe("readAll(model, model1, model2, model3)", () => {
      test("should call model.findAll with correct parameters and include models", async () => {
        const mockModel = { name: "MockModel" };
        const mockModel1 = { name: "MockModel1" };
        const mockModel2 = { name: "MockModel2" };
        const mockModel3 = { name: "MockModel3" };
  
        await dataCollection.readAll(mockModel, mockModel1, mockModel2, mockModel3);
  
        expect(MockModel.findAll).toHaveBeenCalledWith({
          include: [
            { model: mockModel },
            { model: mockModel1 },
            { model: mockModel2 },
            { model: mockModel3 },
          ],
        });
      });
    });
  
    describe("findAll(model)", () => {
      test("should call model.findAll with the provided model in include", async () => {
        const mockModel = { name: "MockModel" };
  
        await dataCollection.findAll(mockModel);
  
        expect(MockModel.findAll).toHaveBeenCalledWith({
          include: [{ model: mockModel }],
        });
      });
    });
  
    describe("findone(id, model)", () => {
      test("should call model.findOne with correct parameters and include model", async () => {
        const id = 1;
        const mockModel = { name: "MockModel" };
  
        await dataCollection.findone(id, mockModel);
  
        expect(MockModel.findOne).toHaveBeenCalledWith({
          where: { [`${MockModel.name.toLowerCase()}_id`]: id },
          include: [{ model: mockModel }],
        });
      });
    });
  });
