
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
const ResetToken = require("./RestToken/RestToken")(sequelize, DataTypes);
const RoomModel = require("./rooms/rooms")(sequelize, DataTypes);
const BookingModel = require("./Bookings")(sequelize, DataTypes);
const PaymentModel = require("./Payment")(sequelize, DataTypes);
const EmployeeModel = require("./employees/Employees")(sequelize, DataTypes);
const ServiceModel = require("./services")(sequelize, DataTypes);
const BookedServiceModel = require("./Booked_Services")(sequelize, DataTypes);
const RoomsFratuer=require("./RoomsFratuer")(sequelize, DataTypes);
const RoomTypeModel = require("./rooms/room_types")(sequelize, DataTypes);
const RoomFeatureModel = require("./rooms/room_Features")(sequelize, DataTypes);
const RoomTypeFeatureModel = require("./rooms/room_type_features")(sequelize,DataTypes);
const RoomAllocationModel = require("./rooms/roomAllocation")(sequelize, DataTypes);
const EmployeeRoleModel = require("./employees/EmployeesRoles")(sequelize, DataTypes);
const EmployeeRoleAssignmentModel = require("./employees/Employee_Role_Assignments")(sequelize, DataTypes);
const CustomerModel = require('./users')(sequelize, DataTypes);
// const AmenityModel = require("./Amenities")(sequelize, DataTypes);
// const HotelAmenityModel = require("./Hotel_Amenities")(sequelize, DataTypes);

// Define relationships
// CustomerModel.hasMany(BookingModel, { foreignKey: "customer_id" });
// BookingModel.belongsTo(CustomerModel, { foreignKey: "customer_id" });
ResetToken.belongsTo(users, { foreignKey: 'userID' });

CustomerModel.hasMany(BookingModel, { foreignKey: "customer_id" });
BookingModel.belongsTo(CustomerModel, { foreignKey: "customer_id" });

RoomModel.hasMany(BookingModel, { foreignKey: "theRoomID" });
BookingModel.belongsTo(RoomModel, { foreignKey: "theRoomID" });

PaymentModel.hasMany(BookingModel, { foreignKey: "paymentID" });
BookingModel.belongsTo(PaymentModel, { foreignKey: "paymentID" });

BookingModel.belongsToMany(ServiceModel, {
  through: BookedServiceModel,
  foreignKey: "bookings_id",
});
ServiceModel.belongsToMany(BookingModel, {
  through: BookedServiceModel,
  foreignKey: "service_id",
});

// EmployeeModel.belongsToMany(EmployeeRoleModel, {
//   through: EmployeeRoleAssignmentModel,
//   foreignKey: "employee_id",
// });
// EmployeeRoleModel.belongsToMany(EmployeeModel, {
//   through: EmployeeRoleAssignmentModel,
//   foreignKey: "role_id",
// });

EmployeeRoleModel.hasMany(EmployeeModel, { foreignKey: "roolsID" });
EmployeeModel.belongsTo(EmployeeRoleModel, { foreignKey: "roolsID" });

RoomModel.belongsToMany(RoomFeatureModel, {
  through: RoomsFratuer,
  foreignKey: "rooms_id",
});
RoomFeatureModel.belongsToMany(RoomModel, {
  through: RoomsFratuer,
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
  ResetToken : new DataCollection(ResetToken),
  rooms: new DataCollection(RoomModel),
  bookings: new DataCollection(BookingModel),
  payments: new DataCollection(PaymentModel),
  employee: new DataCollection(EmployeeModel),
  services: new DataCollection(ServiceModel),
  bookedServices: new DataCollection(BookedServiceModel),
  roomTypes: new DataCollection(RoomTypeModel),
  roomFeatures: new DataCollection(RoomFeatureModel),
  roomTypeFeatures: new DataCollection(RoomTypeFeatureModel),
  roomAllocations: new DataCollection(RoomAllocationModel),
  employeeRoles: new DataCollection(EmployeeRoleModel),
  employeeRoleAssignments: new DataCollection(EmployeeRoleAssignmentModel),
  RoomsFratuer:new DataCollection(RoomsFratuer),
  customer: new DataCollection(CustomerModel),
  CustomerModel,
  RoomModel,
  PaymentModel,
  EmployeeModel,
  ServiceModel,
  BookedServiceModel,
  RoomFeatureModel,
  EmployeeRoleModel
  // Amenities,
  // HotelAmenities,
};
