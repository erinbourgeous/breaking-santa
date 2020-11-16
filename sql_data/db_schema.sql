-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE IF NOT EXISTS `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `spouse_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `selection`
--

CREATE TABLE IF NOT EXISTS `selection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `giver_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `random` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);


USE bourgeous;
SELECT p1.name as Giver, p2.name as Receiver
FROM selection 
	JOIN person p1 ON p1.id=selection.giver_id
	JOIN person p2 ON p2.id=selection.receiver_id;
	
	

