package main

import (
	"fmt"
	"strconv"
	"strings"
	"net/http"
	"os"
	"io/ioutil"
	"encoding/json"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	http.HandleFunc("/test", hello)
	http.HandleFunc("/api/getOutstandingGivers", getOutstandingGivers)
	http.HandleFunc("/api/getOutstandingReceivers", getOutstandingReceivers)
	http.HandleFunc("/api/getSpouseId", getSpouseId)
	http.HandleFunc("/api/submitSelection", postSelection)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})
	bind := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	fmt.Printf("listening on %s...", bind)
	err := http.ListenAndServe(bind, nil)
	if err != nil {
		panic(err)
	}
}

func index(res http.ResponseWriter, req *http.Request) {
	body, _ := ioutil.ReadFile("./index.html")
	fmt.Fprint(res, string(body))
}


func hello(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, dsn)
}


var user = os.Getenv("MYSQL_USER")
var database = os.Getenv("MYSQL_DB")
var dsn = user +"@tcp(localhost)/" + database
func getOutstandingGivers( res http.ResponseWriter, req *http.Request) {
	con, _ := sql.Open("mysql", dsn)
	defer con.Close()
	rows, _ := con.Query("SELECT person.id, person.name FROM person LEFT JOIN selection ON person.id = selection.giver_id WHERE selection.giver_id IS NULL")
	var array []map[string]string
	array = make([]map[string]string, 0)
	for rows.Next() {
		var id int
		var name string
		_ = rows.Scan(&id, &name)
		array = append(array, map[string]string{"id": strconv.Itoa(id), "name": name})
	}
	jsonObj, _ := json.Marshal(map[string][]map[string]string{"outstanding": array})
	res.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(res, string(jsonObj))
}

func getOutstandingReceivers( res http.ResponseWriter, req *http.Request){
	con, _ := sql.Open("mysql", dsn)
	defer con.Close()
	rows, _ := con.Query("SELECT person.id, person.name FROM person LEFT JOIN selection ON person.id = selection.receiver_id WHERE selection.receiver_id IS NULL")
	var array []map[string]string
	array = make([]map[string]string, 0)
	for rows.Next() {
		var id int
		var name string
		_ = rows.Scan(&id, &name)
		array = append(array, map[string]string{"id": strconv.Itoa(id), "name": name})
	}
	jsonObj, _ := json.Marshal(map[string][]map[string]string{"outstanding": array})
	res.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(res, string(jsonObj))
}

func postSelection( res http.ResponseWriter, req *http.Request){
	if req.Method == "GET" {
		res.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(res, "{\"error\":\"GET is Invalid\"}")
		return
	} else {
		giver_id := req.FormValue("giver_id")
		if hasGiverSelected(giver_id) {
					res.WriteHeader(http.StatusBadRequest)
					fmt.Fprintf(res, "{\"error\":\"Selected Giver has already chosen a Recipient\"}")
					return
		}
		receiver_id := req.FormValue("receiver_id")
		con, _ := sql.Open("mysql", dsn)
		randomFlag := 0
		if receiver_id == "" || receiver_id == "null" || receiver_id == "0"{
			con.QueryRow("SELECT person.id receiver_id FROM person LEFT JOIN selection ON person.id = selection.receiver_id WHERE selection.receiver_id IS NULL AND ? NOT IN (person.id, person.spouse_id) ORDER BY RAND() LIMIT 0 , 1", giver_id).Scan(&receiver_id)
			randomFlag = 1
		} else {
			if hasReceiverBeenSelected(receiver_id) {
						   	res.WriteHeader(http.StatusBadRequest)
							fmt.Fprintf(res, "{\"error\":\"Selected Receiver has already been chosen.\"}")
							return
					}
		}

		_, _ = con.Exec("INSERT INTO `selection`(`giver_id`, `receiver_id`, `random`) VALUES (?, ?, ?)", giver_id, receiver_id, randomFlag)

		receiver_name := ""
		con.QueryRow("SELECT name receiver_name FROM person WHERE id=?", receiver_id).Scan(&receiver_name)
		res.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(res, "{\"receiver_name\":\"%s\"}", receiver_name)
	}
}

func getSpouseId( res http.ResponseWriter, req *http.Request){
	giver_id := req.FormValue("giver_id")
	con, _ := sql.Open("mysql", dsn)
	defer con.Close()
	spouse_id := 0
	con.QueryRow("SELECT `spouse_id` spouse_id FROM `person` WHERE id = ?", giver_id).Scan(&spouse_id)
	res.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(res, "{\"spouse_id\":\"%v\"}", spouse_id)
}

func hasGiverSelected( giver_id string) bool{
	con, _ := sql.Open("mysql", dsn)
	hasSelected := false
		con.QueryRow("SELECT  EXISTS (SELECT * FROM selection where giver_id = ?) hasSelected", giver_id).Scan(&hasSelected)
	return hasSelected
}
func hasReceiverBeenSelected( receiver_id string) bool{
		con, _ := sql.Open("mysql", dsn)
		hasSelected := false
		con.QueryRow("SELECT  EXISTS (SELECT * FROM selection where receiver_id = ?) hasSelected", receiver_id).Scan(&hasSelected)
		return hasSelected
}
