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
const RoomsFratuer = require("./RoomsFeatures")(sequelize, DataTypes);
const RoomTypeModel = require("./rooms/room_types")(sequelize, DataTypes);
const RoomFeatureModel = require("./rooms/room_Features")(sequelize, DataTypes);

const RoomTypeFeatureModel = require("./rooms/room_type_features")(
  sequelize,
  DataTypes
);

const EmployeeRoleModel = require("./employees/EmployeesRoles")(
  sequelize,
  DataTypes
);
const EmployeeRoleAssignmentModel =
  require("./employees/Employee_Role_Assignments")(sequelize, DataTypes);
const CustomerModel = require("./users")(sequelize, DataTypes);
const TourModel = require("./tour/tour")(sequelize, DataTypes);
const GuideModel = require("./guide/guide")(sequelize, DataTypes);

// const AmenityModel = require("./Amenities")(sequelize, DataTypes);
// const HotelAmenityModel = require("./Hotel_Amenities")(sequelize, DataTypes);

// Define relationships
// CustomerModel.hasMany(BookingModel, { foreignKey: "customer_id" });
// BookingModel.belongsTo(CustomerModel, { foreignKey: "customer_id" });

GuideModel.hasMany(BookingModel, { foreignKey: "guide_id" });
BookingModel.belongsTo(GuideModel, { foreignKey: "guide_id" });

GuideModel.hasMany(TourModel, { foreignKey: "tourId" });
TourModel.belongsTo(GuideModel, { foreignKey: "tourId" });

TourModel.hasMany(BookingModel, { foreignKey: "tourId" });
BookingModel.belongsTo(TourModel, { foreignKey: "tourId" });

// GuideModel.belongsTo(TourModel, { foreignKey: "guide_id" });
// TourModel.hasMany(GuideModel, { foreignKey: "guide_id" });

// GuideModel.hasMany(BookingModel, { foreignKey: "guide_id" });
// BookingModel.belongsTo(GuideModel, { foreignKey: "guide_id" });

ResetToken.belongsTo(users, { foreignKey: "userID" });

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

RoomModel.belongsToMany(EmployeeModel, {
  through: EmployeeRoleAssignmentModel,
  foreignKey: "rooms_id",
});
EmployeeModel.belongsToMany(RoomModel, {
  through: EmployeeRoleAssignmentModel,
  foreignKey: "employee_id",
});


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

module.exports = {
  db: sequelize,
  users: new DataCollection(users),
  ResetToken: new DataCollection(ResetToken),
  rooms: new DataCollection(RoomModel),
  bookings: new DataCollection(BookingModel),
  payments: new DataCollection(PaymentModel),
  employee: new DataCollection(EmployeeModel),
  services: new DataCollection(ServiceModel),
  bookedServices: new DataCollection(BookedServiceModel),
  roomTypes: new DataCollection(RoomTypeModel),
  features: new DataCollection(RoomFeatureModel),
  roomTypeFeatures: new DataCollection(RoomTypeFeatureModel),
  employeeRoles: new DataCollection(EmployeeRoleModel),
  employeeRoleAssignments: new DataCollection(EmployeeRoleAssignmentModel),
  RoomsFratuer: new DataCollection(RoomsFratuer),
  customer: new DataCollection(CustomerModel),
  guide: new DataCollection(GuideModel),
  tour: new DataCollection(TourModel),
  GuideModel,
  TourModel,
  
  CustomerModel,
  RoomModel,
  BookingModel,
  PaymentModel,
  EmployeeModel,
  ServiceModel,
  BookedServiceModel,
  RoomFeatureModel,
  EmployeeRoleModel,
  EmployeeRoleAssignmentModel,
  // Amenities,
  // HotelAmenities,
};
