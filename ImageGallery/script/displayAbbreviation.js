function displayAbbreviations() {
    if (!document.getElementsByTagName) return

    var abbreviations = document.getElementsByTagName("abbr")
    if (abbreviations.length <= 0) return
    var defs = new Array()

    for (var i=0; i<abbreviations.length; i++) {
        var definition = abbreviations[i].getAttribute("title")
        var key = abbreviations[i].lastChild.nodeValue
        defs[key] = definition
    }

    var dlist = createDefinitionList(defs)

    if (dlist !== null) {
        insertDL2Html(dlist)
    }

}

function createDefinitionList(definitions) {
    if (!document.createElement) return null
    if (!document.createTextNode) return null

    var dlist = document.createElement("dl")
    for (key in definitions) {
        var definition = definitions[key]

        var dtitle = document.createElement("dt")
        var dtitle_text = document.createTextNode(key)
        dtitle.appendChild(dtitle_text)

        var ddesc = document.createElement("dd")
        var ddesc_text = document.createTextNode(definition)
        ddesc.appendChild(ddesc_text)

        dlist.appendChild(dtitle)
        dlist.appendChild(ddesc)
    }

    return dlist
}

function insertDL2Html(dlist) {
    var header = document.createElement("h2")
    var header_text = document.createTextNode("Abbreviations")
    header.appendChild(header_text)

    document.body.appendChild(header)
    document.body.appendChild(dlist)
}

function displayCitations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return

    var quotes = document.getElementsByTagName("blockquote")
    for (var i=0; i<quotes.length; i++) {
        if (!quotes[i].getAttribute("cite")) continue

        var url = quotes[i].getAttribute("cite")

        var quote_children = quotes[i].getElementsByTagName("*")
        if (quote_children.length < 1) continue

        var elem = quote_children[quote_children.length - 1]

        var link = document.createElement("a")
        var link_text = document.createTextNode("source")
        link.appendChild(link_text)
        link.setAttribute("href", url)

        var superscript = document.createElement("sup")
        superscript.appendChild(link)

        elem.appendChild(superscript)
    }
}

function displayAccesskeys() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return

    var links = document.getElementsByTagName("a")
    var akeys = Array()

    for (var i=0; i<links.length; i++) {
        var current_link = links[i]
        if (!current_link.getAttribute("accesskey")) continue
        var key = current_link.getAttribute("accesskey")
        var text = current_link.lastChild.nodeValue
        akeys[key] = text
    }

    var list = document.createElement("ul")
    for (key in akeys) {
        var str = key + ": " + text
        var item = document.createElement("li")
        var item_text = document.createTextNode(str)
        item.appendChild(item_text)
        list.appendChild(item)
    }

    var header = document.createElement("h3")
    var header_text = document.createTextNode("AccessKeys")
    header.appendChild(header_text)

    document.body.appendChild(header)
    document.body.appendChild(list)
}

addLoadEvent(displayAbbreviations)
addLoadEvent(displayCitations)
addLoadEvent(displayAccesskeys)