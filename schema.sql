-- Create the Customers table
CREATE TABLE Customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);

-- Create the Rooms table
CREATE TABLE Rooms (
    room_number TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    rate INTEGER NOT NULL,
    status TEXT NOT NULL
);

-- Create the Bookings table
CREATE TABLE Bookings (
    booking_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    room_number TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_amount INTEGER NOT NULL,
    payment_status TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers (customer_id),
    FOREIGN KEY (room_number) REFERENCES Rooms (room_number)
);

-- Create the Payments table
CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    payment_date DATE NOT NULL,
    amount INTEGER NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings (booking_id)
);

-- Create the Employees table
CREATE TABLE Employees (
    employee_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    position TEXT NOT NULL,
    salary INTEGER NOT NULL
);

-- Create the Services table
CREATE TABLE Services (
    service_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    cost INTEGER NOT NULL
);

-- Create the Booked_Services table (many-to-many relationship between Bookings and Services)
CREATE TABLE Booked_Services (
    booking_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    PRIMARY KEY (booking_id, service_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings (booking_id),
    FOREIGN KEY (service_id) REFERENCES Services (service_id)
);

-- Create the Room_Types table
CREATE TABLE Room_Types (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL,
    description TEXT
);

-- Create the Room_Features table
CREATE TABLE Room_Features (
    feature_id INTEGER PRIMARY KEY,
    feature_name TEXT NOT NULL,
    description TEXT
);

-- Create the Room_Type_Features table (many-to-many relationship between Room_Types and Room_Features)
CREATE TABLE Room_Type_Features (
    type_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    PRIMARY KEY (type_id, feature_id),
    FOREIGN KEY (type_id) REFERENCES Room_Types (type_id),
    FOREIGN KEY (feature_id) REFERENCES Room_Features (feature_id)
);

-- Create the Room_Allocations table (tracks the room allocation for each booking)
CREATE TABLE Room_Allocations (
    allocation_id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    room_number TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings (booking_id),
    FOREIGN KEY (room_number) REFERENCES Rooms (room_number)
);

-- Create the Employees_Roles table (tracks the roles of employees)
CREATE TABLE Employees_Roles (
    role_id INTEGER PRIMARY KEY,
    role_name TEXT NOT NULL
);

-- Create the Employee_Role_Assignments table (tracks the role assignment for each employee)
CREATE TABLE Employee_Role_Assignments (
    assignment_id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees (employee_id),
    FOREIGN KEY (role_id) REFERENCES Employees_Roles (role_id)
);

-- Create the Amenities table (e.g., pool, gym, spa, etc.)
CREATE TABLE Amenities (
    amenity_id INTEGER PRIMARY KEY,
    amenity_name TEXT NOT NULL,
    description TEXT
);

-- Create the Hotel_Amenities table (many-to-many relationship between Rooms and Amenities)
CREATE TABLE Hotel_Amenities (
    room_number TEXT NOT NULL,
    amenity_id INTEGER NOT NULL,
    PRIMARY KEY (room_number, amenity_id),
    FOREIGN KEY (room_number) REFERENCES Rooms (room_number),
    FOREIGN KEY (amenity_id) REFERENCES Amenities (amenity_id)
);

