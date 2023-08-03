
"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const DataCollection = require("./collection");
const usersModel = require("./users");

// const DB_URL =
//   process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

// let sequelizeOptions =
//   process.env.NODE_ENV === "production"
//     ? {
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {};

// const CustomerModel = require("./Customers")(sequelize, DataTypes);
const sequelize = new Sequelize(DATABASE_URL);

const users = usersModel(sequelize, DataTypes);
const RoomModel = require("./rooms/rooms")(sequelize, DataTypes);
const BookingModel = require("./Bookings")(sequelize, DataTypes);
const PaymentModel = require("./Payment")(sequelize, DataTypes);
const EmployeeModel = require("./employees/Employees")(sequelize, DataTypes);
const ServiceModel = require("./services")(sequelize, DataTypes);
const BookedServiceModel = require("./Booked_Services")(sequelize, DataTypes);
const RoomTypeModel = require("./rooms/room_types")(sequelize, DataTypes);
const RoomFeatureModel = require("./rooms/room_Features")(sequelize, DataTypes);
const RoomTypeFeatureModel = require("./rooms/room_type_features")(
  sequelize,
  DataTypes
);
const RoomAllocationModel = require("./rooms/roomAllocation")(
  sequelize,
  DataTypes
);
const EmployeeRoleModel = require("./employees/EmployeesRoles")(
  sequelize,
  DataTypes
);
const EmployeeRoleAssignmentModel =
  require("./employees/Employee_Role_Assignments")(sequelize, DataTypes);
// const AmenityModel = require("./Amenities")(sequelize, DataTypes);
// const HotelAmenityModel = require("./Hotel_Amenities")(sequelize, DataTypes);

// Define relationships
// CustomerModel.hasMany(BookingModel, { foreignKey: "customer_id" });
// BookingModel.belongsTo(CustomerModel, { foreignKey: "customer_id" });

BookingModel.belongsTo(RoomModel, { foreignKey: "room1" });
RoomModel.hasMany(BookingModel, { foreignKey: "room1" });

BookingModel.hasMany(PaymentModel, { foreignKey: "booking_id" });
PaymentModel.belongsTo(BookingModel, { foreignKey: "booking_id" });

BookingModel.belongsToMany(ServiceModel, {
  through: BookedServiceModel,
  foreignKey: "booking_id",
});
ServiceModel.belongsToMany(BookingModel, {
  through: BookedServiceModel,
  foreignKey: "service_id",
});

EmployeeModel.belongsToMany(EmployeeRoleModel, {
  through: EmployeeRoleAssignmentModel,
  foreignKey: "employee_id",
});
EmployeeRoleModel.belongsToMany(EmployeeModel, {
  through: EmployeeRoleAssignmentModel,
  foreignKey: "role_id",
});

RoomTypeModel.belongsToMany(RoomFeatureModel, {
  through: RoomTypeFeatureModel,
  foreignKey: "type_id",
});
RoomFeatureModel.belongsToMany(RoomTypeModel, {
  through: RoomTypeFeatureModel,
  foreignKey: "feature_id",
});

BookingModel.hasOne(RoomAllocationModel, { foreignKey: "booking_id" });
RoomAllocationModel.belongsTo(BookingModel, { foreignKey: "booking_id" });

// RoomModel.belongsToMany(AmenityModel, {
//   through: HotelAmenityModel,
//   foreignKey: "room_number",
// });
// AmenityModel.belongsToMany(RoomModel, {
//   through: HotelAmenityModel,
//   foreignKey: "amenity_id",
// });






module.exports = {
  db: sequelize,
  users: new DataCollection(users),
  Rooms: new DataCollection(RoomModel),
  Bookings: new DataCollection(BookingModel),
  Payments: new DataCollection(PaymentModel),
  Employee: new DataCollection(EmployeeModel),
  Services: new DataCollection(ServiceModel),
  BookedServices: new DataCollection(BookedServiceModel),
  RoomTypes: new DataCollection(RoomTypeModel),
  RoomFeatures: new DataCollection(RoomFeatureModel),
  RoomTypeFeatures: new DataCollection(RoomTypeFeatureModel),
  RoomAllocations: new DataCollection(RoomAllocationModel),
  EmployeeRoles: new DataCollection(EmployeeRoleModel),
  EmployeeRoleAssignments: new DataCollection(EmployeeRoleAssignmentModel),
  RoomModel
  // Amenities,
  // HotelAmenities,
};
