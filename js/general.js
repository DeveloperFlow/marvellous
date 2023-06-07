var Menu = document.getElementById("menu")
var Main = document.getElementById("main")
var Html = document.getElementsByTagName("html")[0]
var contactFunctions = {email:emailContact,phone:phoneContact,uw:uwContact,wa:waContact}
var sections = [document.getElementById("intro"),document.getElementById("skills"),document.getElementById("projects")]
var smallScreen = 700

window.onload = function(){
    var minDelay = 0 //in seconds
    minDelay *= 1000
    var loadEnd = Number(new Date())
    var timeToLoad = loadEnd - loadStart

    function load(){
        remove(beforeLoad)
        changeClass(document.body,"not-loaded","")
        updateSection()
        addMenuEvent()
        iniSkills()
        iniProjects()
        contactSetup()
        adjust()
        addEvent(window,"resize",adjust)
        scrollNShow()
    }
    function adjust(){
        var winDim = windowDim()
        if(winDim.w < smallScreen){
            changeClass(document.body,"","ss")
        }
        else{changeClass(document.body,"ss","")}
    }
    function contactSetup(){
        var contactMethods = document.getElementById("contact-methods")
        var contactPlatforms  = document.getElementById("contact-platforms")
        var children = contactMethods.children
        for(var i = 0; i < children.length; i++){
            add(children[i])
            var clone = children[i].cloneNode(true)
            clone.id = ""
            clone.onclick = children[i].onclick
            contactPlatforms.appendChild(clone)
        }
        function add(element){
            element.onclick = contactFunctions[element.name]
        }
    }
    function addMenuEvent(){
        for(var i = 0; i < Menu.children.length; i++){
            add(Menu.children[i],i)
        }
        function add(item,index){item.onclick = function(){moveToSection(sections[index])}}
    }
    if(timeToLoad >= minDelay){load()}
    else{setTimeout(load,minDelay - timeToLoad)}
}

function iniSkills(){
    var skillsList = document.getElementById("skills-list")
    var numSkills = Skills.length
    for(var i = 0; i < numSkills; i++){
        var skill = Skills[i]
        var name = skill.name
        var skillNode = document.createElement("div")
        skillNode.className = "pointer skill space-up minor-pad scroll-n-view"
        var  nameNode = document.createElement("span")
        nameNode.className = "name oneline"
        nameNode.innerHTML = name
        var arrow = document.createElement("span")
        arrow.innerHTML = "->"; arrow.className = "arrow"

        append(skillNode,[nameNode,arrow])
        skillsList.appendChild(skillNode); 
    }
}

function iniProjects(){
    var projectsList = document.getElementById("projects-list")
    var numProjects = Projects.length
    var cf = document.createElement("div"); cf.className = "clear-fix"
    for(var i = 0; i < numProjects; i++){
        var project = Projects[i]
        var name = project.name
        var projectNode = document.createElement("div")
        projectNode.className = "project pointer scroll-n-view from-left"
        var nameNode = document.createElement("div"); nameNode.innerHTML = name
        nameNode.className = "name"
        var image = document.createElement("img"); 
        image.src = "projects/images/" + project.image[0].toString()

        append(projectNode,[image,nameNode])
        projectsList.appendChild(projectNode)
    }
    projectsList.appendChild(cf)
}

function emailContact(){
    var email = "Ohazuruikemarvellous34@gmail"
    copy(email,function(){customAlert("Email address Copied"); location.href = "mailto://" + email})
}
function phoneContact(){
    var phone = "+2349161553359"
    copy(phone,function(){customAlert("Phone Number Copied"); location.href = "phone://" + phone})
}
function uwContact(){
    
}
function waContact(){
    var phone = "+2349161553359"
    var message = "Hello Marvellous, I saw your portfolio and want to speak with you"
    window.open("https://wa.me/"+phone+"?text="+message)
}


function updateSection(){
    var indicators = Menu.children
    var current = 0
    var lastScroll
    findSection()
    addEvent(document,"scroll",update)
    function findSection(){
        for(var i = 0; i < indicators.length; i++){
            var thisSection = sections[i]
            var coord = thisSection.getBoundingClientRect()
            if(coord.top <= 0 && coord.bottom > 0){
                if(current in indicators){changeClass(indicators[current],"current","")}
                current = i
                changeClass(indicators[current],"","current")
                break
            }
        }
        lastScroll = getDocScroll()
    }
    function update(){
        //get variables
        var coord = sections[current].getBoundingClientRect()
        var pos = getDocScroll()
        var downScroll; var upScroll
        //if the scroll is downward
        if(lastScroll < pos){downScroll = true}
        else if(lastScroll > pos){upScroll = true}

        if((downScroll && coord.bottom <= 0) || (upScroll && coord.top >= 0)){
            findSection()
        }
        else{lastScroll = pos;}
    }
}
function getDocScroll(){
    var docPos
    if(window.scrollY != undefined){docPos = window.scrollY}
    else if(Html.scrollTop != 0 ){docPos = Html.scrollTop}
    else{docPos = document.body.scrollTop}
    return docPos
}

function moveToSection(target){
    var docPos = getDocScroll()
    var top = Math.ceil(target.getBoundingClientRect().top + docPos)
    scroll(0,top)
}
