--
-- Database: `bourgeous`
--

--
-- Dumping data for table `person`
--

TRUNCATE `bourgeous`.`person`;

INSERT INTO `person` (`id`, `name`, `spouse_id`) VALUES
(1, 'Mom', 2),
(2, 'Dad', 1),
(3, 'Megan', 4),
(4, 'Drew', 3),
(5, 'Gina', 10),
(6, 'Erin', 7),
(7, 'Devin', 6),
(8, 'Lori', 9),
(9, 'Curtis', 8),
(10, 'Brett', 5);
