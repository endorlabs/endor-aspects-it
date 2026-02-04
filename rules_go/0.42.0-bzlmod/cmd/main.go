package main

import (
	"errors"
	"fmt"
	"log"

	// "io"
	"net/http"
	"os"

	"github.com/Shulammite-Aso/bazel-demo-app/bazel"
	"github.com/Shulammite-Aso/bazel-demo-app/handlers"
	"github.com/antchfx/xmlquery"
	"github.com/bgentry/go-netrc/netrc"
	"github.com/bwmarrin/snowflake"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func doNotInvoke() (string, error) {
	return bazel.Runfile("/tmp/does/not/exist")
}

func main() {
	fmt.Println("Hello world")
	wadl, err := xmlquery.LoadURL("https://httpbin.org/get")
	if err != nil {
		panic(err)
	}

	netrc := netrc.Machine{
		Login:    "test",
		Password: "test",
		Account:  "test",
	}

	fmt.Println(netrc)

	logrus.Info("Hello world")

	uuid, err := uuid.NewUUID()
	if err != nil {
		panic(err)
	}

	fmt.Println(uuid)

	sf, err := snowflake.NewNode(1)
	if err != nil {
		panic(err)
	}

	fmt.Println(sf.Generate())

	attr := xmlquery.FindOne(wadl, "//application/@xmlns")
	fmt.Println(attr.InnerText())

	router := mux.NewRouter()

	router.HandleFunc("/greet", handlers.Greet).Methods("GET")
	router.HandleFunc("/greet-many", handlers.GreetMany).Methods("GET")

	address := ":5000"

	log.Printf("server started at port %v\n", address)

	err = http.ListenAndServe(address, router)

	if errors.Is(err, http.ErrServerClosed) {
		log.Printf("server closed\n")
	} else if err != nil {
		log.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}
}
