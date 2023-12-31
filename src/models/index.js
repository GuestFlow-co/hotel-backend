"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const DataCollection = require("./collection");
const usersModel = require("./users");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const users = usersModel(sequelize, DataTypes);
const ResetToken = require("./RestToken/RestToken")(sequelize, DataTypes);
const RoomModel = require("./rooms/rooms")(sequelize, DataTypes);
const BookingModel = require("./Bookings")(sequelize, DataTypes);
const PaymentModel = require("./Payment")(sequelize, DataTypes);
const EmployeeModel = require("./employees/Employees")(sequelize, DataTypes);
const ServiceModel = require("./services")(sequelize, DataTypes);
const BookedServiceModel = require("./Booked_Services")(sequelize, DataTypes);
const RoomsFeatures = require("./RoomsFeatures")(sequelize, DataTypes);
const RoomTypeModel = require("./rooms/room_types")(sequelize, DataTypes);
const RoomFeatureModel = require("./rooms/room_Features")(sequelize, DataTypes);
const ResturantsModel = require("./resturant/food")(sequelize, DataTypes);


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
const tourCommnet = require("./tour/tourCommnet")(sequelize, DataTypes);
const CommentRoom = require("./rooms/roomCommnet")(sequelize, DataTypes);

GuideModel.hasMany(BookingModel, { foreignKey: "guide_id" });
BookingModel.belongsTo(GuideModel, { foreignKey: "guide_id" });

RoomModel.hasMany(CommentRoom, { foreignKey: "commnet_id" });
CommentRoom.belongsTo(RoomModel, { foreignKey: "commnet_id" });

TourModel.hasMany(tourCommnet, { foreignKey: "commnet_id" });
tourCommnet.belongsTo(TourModel, { foreignKey: "commnet_id" });

GuideModel.hasMany(TourModel, { foreignKey: "guideId" });
TourModel.belongsTo(GuideModel, { foreignKey: "guideId" });

TourModel.hasMany(BookingModel, { foreignKey: "tourId" });
BookingModel.belongsTo(TourModel, { foreignKey: "tourId" });

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


EmployeeRoleModel.hasMany(EmployeeModel, { foreignKey: "roleID" });
EmployeeModel.belongsTo(EmployeeRoleModel, { foreignKey: "roleID" });

RoomModel.belongsToMany(RoomFeatureModel, {
  through: RoomsFeatures,
  foreignKey: "rooms_id",
});
RoomFeatureModel.belongsToMany(RoomModel, {
  through: RoomsFeatures,
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
  RoomsFeatures: new DataCollection(RoomsFeatures),
  user: new DataCollection(CustomerModel),
  guide: new DataCollection(GuideModel),
  tour: new DataCollection(TourModel),
  theTourCommnet:new DataCollection(tourCommnet),
  Resturants:new DataCollection(ResturantsModel),
  commentRoom:new DataCollection(CommentRoom),
  tourCommnet,
  CommentRoom,
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
  ResturantsModel
};
