// console.log("let's write js");
// let currentsong = new Audio();
// let play = document.querySelector("#play");
// let songs;
// let currfolder;

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getsongs(folder) {
//     currfolder = folder;
//     let response = await fetch(`http://127.0.0.1:5500/spotify/${folder}/`);
//     let html = await response.text();

//     // Create a temporary element to parse the HTML response
//     let tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;

//     // Extract song links ending with .mp3
//     let as = tempDiv.getElementsByTagName("a");
//     songs = [];
//     for (let i = 0; i < as.length; i++) {
//         let href = as[i].getAttribute("href");
//         if (href.endsWith(".mp3")) {
//             songs.push(decodeURIComponent(href.split(`/${folder}/`)[1]));
//         }
//     }
// }

// const playMusic = (track, pause = false) => {
//     currentsong.src = `/spotify/${currfolder}/` + track;
//     if (!pause) {
//         currentsong.play();
//         play.src = "pause.svg";
//     }
//     document.querySelector(".songinfo").innerHTML = decodeURIComponent(track.replace(/%20/g, " "));
//     document.querySelector(".time").innerHTML = "00:00 / 00:00";

//     let songUL = document.querySelector(".sname ul");
//     songUL.innerHTML = "";
//     for (const song of songs) {
//         songUL.innerHTML += `
//             <li>
//                 <img class="invert" src="music.svg" alt="">
//                 <div class="info">
//                     <div>${decodeURIComponent(song.replace(/%20/g, " "))}</div>
//                     <div>song vansh</div>
//                 </div>
//                 <div class="playnow">
//                     <img class="invert" src="play.svg" alt="">
//                 </div>
//             </li>`;
//     }

//     Array.from(document.querySelectorAll(".sname li")).forEach(e => {
//         e.addEventListener("click", () => {
//             playMusic(e.querySelector(".info > div:first-child").textContent.trim());
//         });
//     });
// }

// async function displayAlbums() {
//     console.log("displaying albums")
//     let a = await fetch(`/songs/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a")
//     let cc = document.querySelector(".cc")
//     let array = Array.from(anchors)
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index]; 
//         if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
//             let folder = e.href.split("/").slice(-2)[0]

//             // Get the metadata of the folder
//             let a = await fetch(`/songs/${folder}/info.json`)
//             let response = await a.json(); 
//             cc.innerHTML = cc.innerHTML + `<div data-folder="cs" class="card ">
//                         <div class="play">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
//                                 <circle cx="14" cy="14" r="12" fill="green" />
//                                 <path
//                                     d="M20.8906 14.846C20.5371 16.189 18.8667 17.138 15.5257 19.0361C12.296 20.8709 10.6812 21.7884 9.37983 21.4196C8.8418 21.2671 8.35159 20.9776 7.95624 20.5787C7 19.6139 7 17.7426 7 14C7 10.2574 7 8.3861 7.95624 7.42132C8.35159 7.02245 8.8418 6.73288 9.37983 6.58042C10.6812 6.21165 12.296 7.12907 15.5257 8.96393C18.8667 10.86197 20.5371 11.811 20.8906 13.154C21.0365 13.7084 21.0365 14.2916 20.8906 14.846Z"
//                                     stroke="white" stroke-width="1.5" stroke-linejoin="round" fill="none" />
//                             </svg>

//                         </div>
                        
                        
//                         <img src="/songs/${folder}/cover.jpeg" alt="">
//             <h2>${response.title}</h2>
//             <p>${response.description}</p>
//         </div>`
//         }
//     }

//     // Load the playlist whenever card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => { 
//         e.addEventListener("click", async item => {
//             console.log("Fetching Songs")
//             songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)  
//             playMusic(songs[0])

//         })
//     })
// }

// async function main() {



//     await getsongs("songs/cs"); // Corrected folder path

//     playMusic(songs[0], true);



//     // display all the albumns on the page
//     await displayAlbums();
//     play.addEventListener("click", () => {
//         if (currentsong.paused) {
//             currentsong.play();
//             play.src = "pause.svg";
//         } else {
//             currentsong.pause();
//             play.src = "play.svg";
//         }
//     });

//     currentsong.addEventListener("timeupdate", () => {
//         document.querySelector(".time").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
//         document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
//     });

//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         currentsong.currentTime = (currentsong.duration * percent) / 100;
//     });

//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-1%";
//     });

//     document.querySelector(".cross").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120%";
//     });

//     // Previous button functionality
//     let previous = document.querySelector("#previous");
//     previous.addEventListener("click", () => {
//         currentsong.pause();
//         let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
//         if (index > 0) {
//             playMusic(songs[index - 1]);
//         } else {
//             playMusic(songs[songs.length - 1]); // Wrap around to the last song if at the first song
//         }
//     });

//     // Next button functionality
//     let forward = document.querySelector("#forward");
//     forward.addEventListener("click", () => {
//         currentsong.pause();
//         let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
//         if (index < songs.length - 1) {
//             playMusic(songs[index + 1]);
//         } else {
//             playMusic(songs[0]); // Wrap around to the first song if at the last song
//         }
//     });

//     // Adding event listener to the volume bar
//     document.querySelector(".range input").addEventListener("change", (e) => {
//         currentsong.volume = e.target.value / 100;
//         if (currentsong.volume > 0) {
//             document.querySelector(".volume > img").src = "volume.svg";
//         } else {
//             document.querySelector(".volume > img").src = "mute.svg";
//         }
//     });

//     // Loading the playlist when the card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             console.log("Fetching Songs");
//             await getsongs(`songs/${item.currentTarget.dataset.folder}`);
//             playMusic(songs[0]);
//         });
//     });


//     // add event listerner to ute the track
//     document.querySelector(".volume>img").addEventListener("click", e=>{ 
//         if(e.target.src.includes("volume.svg")){
//             e.target.src = e.target.src.replace("volume.svg", "mute.svg")
//             currentsong.volume = 0;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
//         }
//         else{
//             e.target.src = e.target.src.replace("mute.svg", "volume.svg")
//             currentsong.volume = .10;
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
//         }

//     })
// }

// main();

console.log("Let's write JS");

let currentSong = new Audio();
let play = document.querySelector("#play");
let songs = [];
let currentFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currentFolder = folder;
    let response = await fetch(`http://127.0.0.1:5500/spotify/${folder}/`);
    let html = await response.text();

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let anchors = tempDiv.querySelectorAll("a[href$='.mp3']");
    songs = Array.from(anchors).map(a => decodeURIComponent(a.getAttribute("href").split(`/${folder}/`)[1]));
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/spotify/${currentFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    } else {
        play.src = "play.svg"; // Ensure the play button is set correctly
    }
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track.replace(/%20/g, " "));
    document.querySelector(".time").innerHTML = "00:00 / 00:00";

    let songList = document.querySelector(".sname ul");
    songList.innerHTML = songs.map(song => `
        <li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${decodeURIComponent(song.replace(/%20/g, " "))}</div>
                <div>song vansh</div>
            </div>
            <div class="playnow">
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>
    `).join("");

    Array.from(songList.querySelectorAll("li")).forEach(li => {
        li.addEventListener("click", () => {
            playMusic(li.querySelector(".info > div:first-child").textContent.trim());
        });
    });
}

async function displayAlbums() {
    console.log("Displaying albums");
    let response = await fetch(`/songs/`);
    let html = await response.text();

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let anchors = tempDiv.querySelectorAll("a[href^='/songs/'][href$='/info.json']");
    let albumContainer = document.querySelector(".cc");
    
    for (let anchor of anchors) {
        let folder = anchor.href.split("/")[2];
        let infoResponse = await fetch(`/songs/${folder}/info.json`);
        let info = await infoResponse.json();

        albumContainer.innerHTML += `
            <div data-folder="${folder}" class="card">
                <div class="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                        <circle cx="14" cy="14" r="12" fill="green" />
                        <path d="M20.8906 14.846C20.5371 16.189 18.8667 17.138 15.5257 19.0361C12.296 20.8709 10.6812 21.7884 9.37983 21.4196C8.8418 21.2671 8.35159 20.9776 7.95624 20.5787C7 19.6139 7 17.7426 7 14C7 10.2574 7 8.3861 7.95624 7.42132C8.35159 7.02245 8.8418 6.73288 9.37983 6.58042C10.6812 6.21165 12.296 7.12907 15.5257 8.96393C18.8667 10.86197 20.5371 11.811 20.8906 13.154C21.0365 13.7084 21.0365 14.2916 20.8906 14.846Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" fill="none" />
                    </svg>
                </div>
                <img src="/songs/${folder}/cover.jpeg" alt="">
                <h2>${info.title}</h2>
                <p>${info.description}</p>
            </div>`;
    }

    Array.from(albumContainer.querySelectorAll(".card")).forEach(card => {
        card.addEventListener("click", async () => {
            console.log("Fetching Songs");
            await getSongs(`songs/${card.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

async function main() {
    await getSongs("songs/cs"); // Corrected folder path

    playMusic(songs[0], true);

    await displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".time").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-1%";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.querySelector("#previous").addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index > 0) {
            playMusic(songs[index - 1]);
        } else {
            playMusic(songs[songs.length - 1]);
        }
    });

    document.querySelector("#forward").addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/").pop());
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        } else {
            playMusic(songs[0]);
        }
    });

    document.querySelector(".range input").addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume > img").src = "volume.svg";
        } else {
            document.querySelector(".volume > img").src = "mute.svg";
        }
    });

    document.querySelector(".volume > img").addEventListener("click", () => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
            document.querySelector(".volume > img").src = "mute.svg";
        } else {
            currentSong.volume = 0.1; // Set default volume
            document.querySelector(".range input").value = 10;
            document.querySelector(".volume > img").src = "volume.svg";
        }
    });
}

main();
