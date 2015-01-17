package main

import (
    "io/ioutil"
    "net/http"
)

func yesterday(res http.ResponseWriter, req *http.Request) {
    render(res, req, "yesterday");
}

func today(res http.ResponseWriter, req *http.Request) {
    render(res, req, "today");
}

func tomorrow(res http.ResponseWriter, req *http.Request) {
    render(res, req, "tomorrow");
}


func render(res http.ResponseWriter, req *http.Request, name string) {
    jsn, readErr := ioutil.ReadFile(name + ".json")
    if readErr != nil {
        http.Error(res, readErr.Error(), http.StatusInternalServerError)
        return
    }

    res.Header().Set("Content-Type", "application/json")
    res.Write(jsn)
}

func main() {
    http.HandleFunc("/today", today)
    http.HandleFunc("/yesterday", yesterday)
    http.HandleFunc("/tomorrow", tomorrow)
    http.ListenAndServe(":8000", nil)
}
