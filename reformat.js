function averageColors(c1, c2, precent) {
    if (isNaN(precent)) precent = 1;
    var rAve = Math.round(c1.r * precent * 1.0 + c2.r * (1 - precent));
    var gAve = Math.round(c1.g * precent + c2.g * (1 - precent));
    var bAve = Math.round(c1.b * precent + c2.b * (1 - precent));
    return "rgb(" + rAve + "," + gAve + "," + bAve + ")";
}

function getColor(percentage) {
    var stops = [{ loc: 100, r: 0, g: 128, b: 0 }, { loc: 85, r: 173, g: 216, b: 230 }, { loc: 75, r: 255, g: 255, b: 0 }, { loc: 65, r: 255, g: 165, b: 0 }, { loc: 40, r: 255, g: 0, b: 0 }, { loc: 0, r: 0, g: 0, b: 0 }]
    var topStop = stops[0];
    var bottumStop = stops[stops.length - 1];

    percentage = Math.min(percentage,100);

    for (var i = 0; i < stops.length; i++) {
        var stop = stops[i]
        if (stop.loc >= percentage && stop.loc < topStop.loc) topStop = stop;
        if (stop.loc <= percentage && stop.loc > bottumStop.loc) bottumStop = stop;
    }
    var average = averageColors(topStop, bottumStop, (percentage - bottumStop.loc) / (topStop.loc - bottumStop.loc));
    return average;
}

function recolorGrades() {
    try {
        var grades = document.getElementsByClassName("colorMyGrade");

        for (var i = 0; i < grades.length; i++) {
            var gradeCell = grades[i];
            var gradeText = gradeCell.firstElementChild.innerHTML;
            if (!gradeText.includes("<br>")) {
                continue;
            }
            var percentageString = gradeText.slice(gradeText.indexOf("<br>") + "<br>".length);
            var percentage = parseInt(percentageString);
            gradeCell.style.background = getColor(percentage);
        }
    } catch (e) { }
}

function reformatCourseInfo() {
    try {
        var contacts = document.getElementsByClassName("button mini dialogM");

        for (var j = 0; j < contacts.length;) {
            var elem = contacts[j];
            var courseInfo = elem.parentNode;
            courseInfo.removeChild(elem);
            courseInfo.innerHTML = "<strong>" + courseInfo.innerHTML.replace(new RegExp("&nbsp;", 'g'), '').replace("<br>", "</strong><br>");
        }
    } catch (e) { }
}

function removeExplanation() {
    try {
        var infoParagraph = document.getElementsByClassName("grade-info")[0];
        infoParagraph.parentNode.removeChild(infoParagraph);
    } catch (e) { }
}

function reformatHeader() {
    try {
        var banner = document.getElementsByClassName("navbar navbar-default")[0];
        banner.style = "margin-top: 0 !important";
        var image = banner.getElementsByTagName("img")[0];
        image.src = "https://sites.google.com/a/troop186.net/troop186seattle/SourceLogo.png"
        image.height = 48;
        image.width = 240;
        var userInfo = document.getElementById("topbar-tools");
        userInfo.parentNode.removeChild(userInfo);
        var dumbTools = document.getElementById("topbar-tools2");
        var toolParent = dumbTools.parentNode;
        toolParent.removeChild(dumbTools);
        toolParent.appendChild(userInfo);
        var userLinks = userInfo.getElementsByTagName("a");
        for (var j = 0; j < userLinks.length; j++) {
            userLinks[j].style.color = "white";
        }
        var userLis = userInfo.getElementsByTagName("li");
        for (var j = 0; j < userLis.length; j++) {
            userLis[j].style.color = "white";
            userLis[j].style.background = "transparent";
        }
    } catch (e) { }
}

function colorAssignments() {
    try {
        var assignmentsTable = document.getElementById("assigment-list").getElementsByTagName("tbody")[0];
        var assignmentsTableItmes = assignmentsTable.getElementsByTagName("tr");
        for (var j = 0; j < assignmentsTableItmes.length; j++) {
            var assignment = assignmentsTableItmes[j];
            var assignmentElements = assignment.getElementsByTagName("td");
            var gardePercentage = parseInt(assignmentElements[assignmentElements.length - 2].innerText);
            if (isNaN(gardePercentage)) {
                continue;
            }
            assignmentElements[assignmentElements.length - 2].style.background = getColor(gardePercentage);
        }
    } catch (e) { }
}

function reformatAssignmentsTitle(){
    try {
    var classInfoTable = document.getElementsByClassName("linkDescList")[0];
    var classInfo = classInfoTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");

    var divWrapper = document.createElement("div");
    var divTitle = document.createElement("div");

    var title = document.createElement("h1");
    title.innerText = classInfo[0].innerText;
    title.style.margin = 0;
    var subtitle = document.createElement("p");
    subtitle.innerText = classInfo[1].innerText;
    divTitle.appendChild(title);
    divTitle.appendChild(subtitle);
    divTitle.style = "display: inline-block; float:left; margin: 0 10px;";

    var gradeBadge = document.createElement("div");
    gradeBadge.style = "display: inline-block; float:left; text-align: center; font-weight: bold; padding: 0 5px;";
	var letter = classInfo[3].innerText.substring(0 ,classInfo[3].innerText.indexOf(" "));
	var num = classInfo[3].innerText.substring(classInfo[3].innerText.indexOf(" ")).replace(new RegExp(" ", 'g'), "").replace(new RegExp("\u00a0", 'g'), "").replace("%","");

    gradeBadge.innerHTML = letter + "<br>" + num + "%";
    gradeBadge.style.background = getColor(parseInt(num));

    divWrapper.appendChild(divTitle);
    divWrapper.appendChild(gradeBadge)

    var currentTitle = document.getElementsByTagName("h1")[0];
    currentTitle.parentNode.replaceChild(divWrapper, currentTitle);
    classInfoTable.parentNode.removeChild(classInfoTable);
    } catch (e) { }
}

function recolorTableHeadings(){
    try {
    var thArray = document.getElementsByTagName("th");
    for (var j = 0; j < thArray.length; j++) {
        var th = thArray[j];
        if(th.style.background == ""){
            th.style.background = "#114890";
            th.style.color = "white";
            th.style.borderColor = "#114890";
            try {
            var children = th.childNodes;
            for(var i = 0; i < children.length; i++){
                children[i].style.color = "white";
            }
        } catch (e) { }
        }
    }
    } catch (e) { }
}

function reformatGradesSummary(){
    recolorGrades();
    removeExplanation();
    reformatCourseInfo();
}

function reformatCourseGrade(){
    colorAssignments();
    reformatAssignmentsTitle();
}

function login(){
    chrome.storage.sync.get("userInfo", (store) => {
        var userInfo = store.userInfo;
        if(!userInfo.enabled) return;
        var username = document.getElementById("fieldAccount");
        if(username == undefined) return;
        username.value = userInfo.username;
        var pw = document.getElementById("pw");
        pw.value = userInfo.password;
        document.getElementById("btn-enter").click();
    });
}

function reformatSource(){
    login();
    reformatHeader();
    recolorTableHeadings();
    try {
        reformatGradesSummary();
    } catch (error) {}
    try {
        reformatCourseGrade();
    } catch (error) {}
}

reformatSource();