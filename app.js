let memeImage = document.querySelector("#imgContent img");
let nextB = document.querySelector("#nextB");
let laughB = document.querySelector("#laughB");
let header = document.querySelector(".header");
let popUp = document.querySelector("#popUp");
let fullScreen = document.querySelector("#fullScreen");
let API_LINK = "https://meme-api.herokuapp.com/gimme";

// Laughing sound Effect
let laughEffect = new Audio("./Sounds/laughTrack.mp3");
laughEffect.volume = 0.2;
let clickSound = new Audio("./Sounds/click.mp3");
clickSound.volume = 1;

// Func that decides what loading screen to show
let totalLoadingScreens = 5;
let loadingScreen = () => {
	let RNG = Math.ceil(Math.random() * totalLoadingScreens);
	console.log("Loading screen number #", RNG);
	memeImage.src = `Images/loading${RNG}.gif`;
};
loadingScreen();

// Animated header that says "ENJOY THE MEMES"
let word = "SHOWING REDDITS LATEST MEMES";
let headerAnimate = () => {
	header.innerHTML = "";
	for (let i = 0; i < word.length; i++) {
		setTimeout(() => {
			header.innerHTML += word[i];
		}, i * 150);
	}
};
setTimeout(() => {
	header.style.transform = "translate(-50%, -50%) scale(1)";
	setTimeout(() => {
		headerAnimate();
		setTimeout(() => {
			header.style.transform = "translate(-50%, -50%) scale(0)";
		}, 4500);
	}, 2000);
}, 1000);

// Main func that gets the API data
let memeGenerator = async () => {
	let response = await axios.get(API_LINK);
	memeImage.src = response.data.url;
};

// Next BUTTON that generates next IMG
let browsingStarted = false;
nextB.addEventListener("click", async () => {
	clickSound.play();
	memeGenerator();
	browsingStarted = true;
	// Added just to stop animated header on Next Button
	header.innerHTML = "";
	for (let i = 0; i < 99; i++) {
		clearInterval(i);
	}
});

// Laugh BUTTON that SAVES the img *WORK IN PROGRESS*
let laughBx = true;
laughB.addEventListener("click", () => {
	clickSound.play();
	if (laughBx && browsingStarted) {
		laughBx = false;
		browsingStarted = false;
		laughEffect.play();
		popUp.style.opacity = "1";
		popUp.style.transform = "rotate(35deg) scale(2)";
		setTimeout(() => {
			popUp.style.opacity = "0";
			popUp.style.transform = "rotate(35deg) scale(0)";
			laughBx = true;
		}, 2000);
	}
});

// Fullscreen BUTTON
fullScreen.addEventListener("click", () => {
	clickSound.play();
	openFullscreen();
});

// Fullscreen func
var elem = document.documentElement;
function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	}
}

// Miscellaneous
let lastUpdatedTime = new Date("3/25/2022, 2:14:42 PM");
console.log("Last update time:");
console.log(lastUpdatedTime.toLocaleString());
let timeNow = new Date().getTime();
console.log("Hours since the last update:");
let timeSpan = (timeNow - lastUpdatedTime.getTime()) / (1000 * 60 * 60);
console.log(Math.ceil(timeSpan));
