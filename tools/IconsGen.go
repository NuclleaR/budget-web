package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"unicode/utf8"
)

func main() {
	if len(os.Args) > 1 {
		getData(os.Args[1])
	} else {
		panic("set path")
	}
}

type IconData struct {
	Styles  []string `json:"styles"`
	Free    []string `json:"free"`
	Label   string   `json:"label"`
	Unicode string   `json:"unicode"`
	Name    string
}

type TemplateData struct {
	IconData []IconData
}

func getData(path string) {
	url := "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json"

	var data map[string]IconData

	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	bodyResp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(bodyResp, &data)
	if err != nil {
		panic(err)
	}

	templateData := TemplateData{
		IconData: make([]IconData, len(data)),
	}

	i := 0
	for key, iconData := range data {
		switch key {
		case "repeat":
			iconData.Name = "faRepeat"
		case "subscript":
			iconData.Name = "subScript"
		case "500px":
			iconData.Name = "fa500px"
		case "42-group":
			iconData.Name = "fa42Group"
		case
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"0":
			iconData.Name = "fa" + key
		default:
			iconData.Name = kebabToCamel(key)
		}

		count := utf8.RuneCountInString(iconData.Unicode)
		if count < 4 {
			pad := strings.Repeat("0", 4-count)
			iconData.Unicode = pad + iconData.Unicode
		}
		iconData.Unicode = fmt.Sprintf("\\u%s", iconData.Unicode)
		templateData.IconData[i] = iconData
		i++
	}

	sort.Slice(templateData.IconData, func(i, j int) bool {
		return templateData.IconData[i].Name < templateData.IconData[j].Name
	})

	t := template.Must(template.New("tsFile").Parse(tsTemplate))

	f, err := os.Create(path + "/FontAwesomeIcons.ts")
	if err != nil {
		log.Println("create file: ", err)
		return
	}

	t.Execute(f, templateData)
}

func kebabToCamel(data string) string {
	words := strings.Split(data, "-")
	final := ""
	for i, word := range words {
		if i == 0 {
			final += word
		} else {
			final += strings.Title(word)
		}
	}
	return final
}

var tsTemplate = `export enum FontAwesome {
	{{- range $element:= .IconData}}
	{{$element.Name}} = "{{$element.Name}}",
	{{- end}}
}

export const unicodeMap: Record<FontAwesome, string> = {
	{{- range $element := .IconData}}
  [FontAwesome.{{$element.Name}}]: "{{$element.Unicode}}",
	{{- end}}
};
`
