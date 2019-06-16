function showPic(whichPic) {
    if (!document.getElementById("placeholder")) return false

    var source = whichPic.getAttribute("href")
    var placeHolder = document.getElementById("placeholder")
    placeHolder.setAttribute("src", source)

    showDescription(whichPic)

    return true
}

function showDescription(whichPic) {
    if (document.getElementById("description")) {
        var title = whichPic.getAttribute("title")
        var description_element = document.getElementById("description")
        description_element.firstChild.nodeValue = title
    }
}

function countBodyChildren() {
    var body_element = document.getElementsByTagName("body")[0]
    var childrenCount = body_element.childNodes.length
    //alert(body_element.nodeName)
}

function popUp(winURL) {
    window.open(winURL, "popUP", "width=320,height=480")
}

function prepareLinks() {
    if (!document.getElementsByTagName) return false

    var links = document.getElementsByTagName("a")
    for (i=0; i<links.length; i++) {
        if (links[i].getAttribute("class") === "popup") {
            links[i].onclick = function () {
                popUp(this.href)
                return false
            }
        }
    }
}

function prepareGallery() {
    if (!document.getElementsByTagName || !document.getElementById) return false
    if (!document.getElementById("imagegallery")) return false

    var gallery = document.getElementById("imagegallery")
    var links = gallery.getElementsByTagName("a")
    for (var i=0; i<links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this)
        }
        //links[i].onkeypress = links[i].onclick
    }
}

function preparePlaceHolder() {
    if (!document.createElement) return false
    if (!document.createTextNode) return false
    if (!document.getElementById) return false
    if (!document.getElementById("imagegallery")) return false

    var placeholder = document.createElement("img")
    placeholder.setAttribute("id", "placeholder")
    placeholder.setAttribute("src", "../images/placeholder.png")
    placeholder.setAttribute("alt", "my image gallery")

    var description = document.createElement("p")
    description.setAttribute("id", "description")

    var desctext = document.createTextNode("Choose an image")

    description.appendChild(desctext)

    var gallery = document.getElementById("imagegallery")
    insertAfter(placeholder, gallery)
    insertAfter(description, placeholder)
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload
    if (typeof window.onload != "function") {
        window.onload = func
    } else {
        window.onload = function () {
            oldonload()
            func()
        }
    }
}

addLoadEvent(prepareLinks)
//addLoadEvent(preparePlaceHolder)
addLoadEvent(prepareGallery)