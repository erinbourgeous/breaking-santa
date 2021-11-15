2021 Picks:
+--------+----------+
| Giver  | Receiver |
+--------+----------+
| Gina   | Dad      |
| Erin   | Gina     |
| Devin  | Lori     |
| Brett  | Mom      |
| Megan  | Erin     |
| Lori   | Brett    |
| Drew   | Devin    |
| Mom    | Megan    |
| Curtis | Drew     |
| Dad    | Curtis   |
+--------+----------+

2020 Picks:

Bourgeous Family
+--------+----------+
| Giver  | Receiver |
+--------+----------+
| Devin  | Brett    |
| Drew   | Erin     |
| Erin   | Dad      |
| Megan  | Gina     |
| Gina   | Devin    |
| Brett  | Drew     |
| Mom    | Lori     |
| Lori   | Mom      |
| Curtis | Megan    |
+--------+----------+

Fisher Family
+-------+----------+
| Giver | Receiver |
+-------+----------+
| Ky    | Shann    |
| Mari  | Erin     |
| Will  | Chad     |
| Erin  | Mari     |
| Shann | Devin    |
| Chad  | Will     |
| Devin | Anjai    |
| Anjai | Ky       |
+-------+----------+


2019 picks:

Bourgeous Family
+-------+----------+
| Giver | Receiver |
+-------+----------+
| Gina  | Erin     |
| Lori  | Mom      |
| Devin | Curtis   |
| Erin  | Lori     |
| Dad   | Megan    |
| Mom   | Gina     |
| Drew  | Devin    |
| Megan | Dad      |
+-------+----------+

Fisher Family
+-------+----------+
| Giver | Receiver |
+-------+----------+
| Shann | Mari     |
| Anjai | Ky       |
| Chad  | Anjai    |
| Erin  | Chad     |
| Will  | Erin     |
| Devin | Shann    |
| Mari  | Devin    |
+-------+----------+


Site passwords
/etc/nginx/.htpasswd

Reset passwords
cat /dev/null > .htpasswd
htpasswd -c /etc/nginx/.htpasswd bourgeous
htpasswd -c /etc/nginx/.htpasswd fisherelli

RedLight123


service nginx status
 
docker run --name breaking-santa-bourgeous   -d   -v /opt/breaking-santa:/go/src/breaking-santa   -w /go/src/breaking-santa   --network="host"   --expose 8080 -p 8080:8080   --env MYSQL_DB=bourgeous   --env PORT=8080 breaking-santa

docker run --name breaking-santa-fisher   -d   -v /opt/breaking-santa:/go/src/breaking-santa   -w /go/src/breaking-santa   --network="host"   --expose 8081 -p 8081:8081   --env MYSQL_DB=fisher   --env PORT=8081 breaking-santa