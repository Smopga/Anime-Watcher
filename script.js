const video = document.getElementById("video");
const episodeList = document.getElementById("episodeList");
const resumeBtn = document.getElementById("resumeBtn");

const episodes = [
    { id: "ep1", name: "Episode 1", file: "media/Season1/episode1.mp4" },
    { id: "ep2", name: "Episode 2", file: "media/Season1/episode2.mp4" }
];

let currentEpisode = null;

// Liste anzeigen
episodes.forEach(ep => {
    const div = document.createElement("div");
    div.innerText = ep.name;
    div.onclick = () => loadEpisode(ep);
    episodeList.appendChild(div);
});

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
