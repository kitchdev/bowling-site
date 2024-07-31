INSERT INTO Blocked_Dates (blocked_date, reason) VALUES
('2024-07-04', 'Independence Day'),
('2024-12-25', 'Christmas Day');




INSERT INTO Availability (day_of_week, start_time, end_time) VALUES
('Monday', '09:00:00', '12:00:00'),
('Monday', '15:00:00', '17:00:00'),
('Monday', '18:00:00', '22:00:00'),
('Tuesday', '12:00:00', '16:00:00'),
('Tuesday', '19:00:00', '22:00:00'),
('Wednesday', '12:00:00', '16:00:00'),
('Wednesday', '19:00:00', '22:00:00'),
('Thursday', '09:00:00', '12:00:00'),
('Thursday', '15:00:00', '17:00:00'),
('Thursday', '18:00:00', '22:00:00'),
('Friday', '12:00:00', '16:00:00'),
('Friday', '19:00:00', '22:00:00'),
('Saturday', '09:00:00', '12:00:00'),
('Saturday', '15:00:00', '17:00:00'),
('Saturday', '18:00:00', '22:00:00'),
('Sunday', '09:00:00', '12:00:00'),
('Sunday', '15:00:00', '17:00:00'),
('Sunday', '18:00:00', '22:00:00');


insert  into lanes (lane_number, max_capacity) values 
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 5);

insert into roles (role_name, permissions) values
  ('customer', ['customer']), 
  ('employee', ['customer, employee']), 
  ('admin', ['customer', 'employee', 'admin']);