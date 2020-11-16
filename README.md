Last years picks:

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

service nginx status
 
docker run --name breaking-santa-bourgeous   -d   -v /opt/breaking-santa:/go/src/breaking-santa   -w /go/src/breaking-santa   --network="host"   --expose 8080 -p 8080:8080   --env MYSQL_DB=bourgeous   --env PORT=8080 breaking-santa

docker run --name breaking-santa-fisher   -d   -v /opt/breaking-santa:/go/src/breaking-santa   -w /go/src/breaking-santa   --network="host"   --expose 8081 -p 8081:8081   --env MYSQL_DB=fisher   --env PORT=8081 breaking-santa