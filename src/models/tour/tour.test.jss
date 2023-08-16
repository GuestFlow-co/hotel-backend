// const { Sequelize, DataTypes } = require("sequelize");
// const TourModel = require("../tour/tour");
// const { db } = require("../index");

// describe("Tour Model", () => {
//   const Tour = TourModel(db, DataTypes);

//   beforeAll(async () => {
//     await db.sync({ force: true });
//   });

//   afterEach(async () => {
//     await db.close();
//   });

//   afterAll(async () => {
//     await db.close();
//   });

//   test("should define a valid model", async () => {
//     const tour = await Tour.create({
//       description: "Test Tour",
//       start_date: new Date(),
//       end_date: new Date(),
//       Seat_price: 100,
//       guideId: 1,
//       max_capacity: 10,
//       availableSeat: 10,
//     });

//     expect(tour).toBeDefined();
//     expect(tour.Tour_id).toBeDefined();
//     expect(tour.description).toBe("Test Tour");
//     expect(tour.start_date).toBeInstanceOf(Date);
//     expect(tour.end_date).toBeInstanceOf(Date);
//     expect(tour.Seat_price).toBe(100);
//     expect(tour.guideId).toBe(1);
//     expect(tour.max_capacity).toBe(10);
//     expect(tour.availableSeat).toBe(10);
//   });

// });
