const video = document.getElementById("video");
const seriesList = document.getElementById("seriesList");
const episodeList = document.getElementById("episodeList");
const seriesTitle = document.getElementById("seriesTitle");
const resumeBtn = document.getElementById("resumeBtn");

let currentEpisode = null;

// Hier deine Serien definieren
const data = {
    "Dress Up Darling": [
        { id: "dress_ep1", name: "Episode 1", file: "media/DressUp/ep1.mp4" },
        { id: "dress_ep2", name: "Episode 2", file: "media/DressUp/ep2.mp4" }
    ],
    "Another Series": [
        { id: "another_ep1", name: "Episode 1", file: "media/AnotherSeries/ep1.mp4" },
        { id: "another_ep2", name: "Episode 2", file: "media/AnotherSeries/ep2.mp4" }
    ]
};

// Serien anzeigen
Object.keys(data).forEach(seriesName => {
    const div = document.createElement("div");
    div.innerText = seriesName;
    div.onclick = () => loadSeries(seriesName);
    seriesList.appendChild(div);
});

function loadSeries(seriesName) {
    episodeList.innerHTML = "";
    seriesTitle.innerText = seriesName;

    const episodes = data[seriesName];

    episodes.forEach(ep => {
        const div = document.createElement("div");
        div.innerText = ep.name;

        div.onclick = () => loadEpisode(ep);

        episodeList.appendChild(div);
    });
}

function loadEpisode(ep) {
    currentEpisode = ep;
    video.src = ep.file;

    const savedTime = localStorage.getItem("progress_" + ep.id);
    if (savedTime) {
        video.currentTime = parseFloat(savedTime);
    }

    video.play();
}

// Fortschritt speichern
setInterval(() => {
    if (currentEpisode && video.currentTime > 0) {
        localStorage.setItem(
            "progress_" + currentEpisode.id,
            video.currentTime
        );
    }
}, 5000);

// Weiterschauen Button
resumeBtn.onclick = () => {
    if (!currentEpisode) return;

    const savedTime = localStorage.getItem("progress_" + currentEpisode.id);
    if (savedTime) {
        video.currentTime = parseFloat(savedTime);
        video.play();
    }
};
