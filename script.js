// fetching Element
const modeBtn = document.getElementById("btn-mode");
const searchBar = document.querySelector("[data-searchbar]");
const profileContainer = document.querySelector("[data-profilecontainer]");
const input = document.querySelector("[data-input]");
const searchBtn = document.querySelector("[data-searchbtn]");
const modeText = document.getElementById("mode-text");
const modeIcon = document.getElementById("mode-icon");
const url = "https://api.github.com/users/";
const dataError = document.getElementById("no-results");


// initial value
let darkMode = false;

// fetching api 
async function getUserData(giturl) {
    try {
        const response = await fetch(giturl);
        const data = await response.json();
        console.log(data);
        renderGitHubdata(data)
    } catch (error) {
        throw error
    }
}

// fatching elment for render data in UI
const avter = document.getElementById("avatar");
const userName = document.getElementById("name");
const user = document.getElementById("user");
const date = document.getElementById("date");
const bio = document.getElementById("bio");
const repo = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const userLocation = document.getElementById("location");
const twitter = document.getElementById("twitter");
const pagelink = document.getElementById("page");
const company = document.getElementById("company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

// data reander in UI 
function renderGitHubdata(data) {
    if (data.message !== "Not Found") {
        dataError.style.display = "none"

        function checkNull(para1, para2) {
            if (para1 === "" || para1 === null) {
                para2.style.opacity = 0.5;
                para2.previousElementSibling.style.opacity = 0.5;
                return false;
            } else {
                return true;
            }
        }

        avter.src = `${data.avatar_url}`;
        userName.innerText = userName.innerText === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;

        // joined date
        datesegment = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegment[2]} ${months[datesegment[1] - 1]} ${datesegment[0]}`;

        bio.innerText = data.bio === null ? "Bio is Not Available" : `${data.bio}`;
        repo.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        userLocation.innerText = checkNull(data.location, userLocation) ? data.location : "Not Available";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        pagelink.innerText = checkNull(data.blog, pagelink) ? data.blog : "Not Available";
        pagelink.href = checkNull(data.blog, pagelink) ? data.blog : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available"

        searchBar.classList.toggle("active");
        profileContainer.classList.toggle("active");
    }
    else {
        dataError.style.display = "block";
    }
}

// Adding EventListiners
searchBtn.addEventListener("click", function () {
    if (input.value !== "") {
        getUserData(url + input.value);
    }
})

input.addEventListener("keydown", function (e) {
    if (!e) {
        var e = window.event;
    }
    if (e.key == "Enter") {
        if (input.value !== "") {
            getUserData(url + input.value);
        }
    }
},
    false
)

input.addEventListener("input", function () {
    dataError.style.display = "none"
})

// Create function for darkmode and lightmode
const root = document.documentElement.style

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");

    modeText.innerText = "LIGHT";
    modeIcon.src = "./images/sun-icon.svg";
    darkMode = true;
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");

    modeText.innerText = "DARK";
    modeIcon.src = "../images/moon-icon.svg";
    darkMode = false;
}

modeBtn.addEventListener("click", function () {
    if (darkMode === false) {
        darkModeProperties();
    }
    else {
        lightModeProperties();
    }
})

getUserData(url + "GuptaPankaj02");