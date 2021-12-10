// File: ./popup.js
const pusher = new Pusher("96cefc51031c5c295181", {
    cluster: "us2",
    encrypted: true
});

document.getElementById("scores").addEventListener("click", () => {
    fetch("http://localhost:8000/start").catch(err => {console.error(err);});
});

// const channel = pusher.subscribe("realtime-updates");
const channel = pusher.subscribe("privateChannelName");

channel.bind("scores", data => {
    const [teamOne, teamTwo] = data

    document.getElementById("results").innerHTML = `
        <span>${teamOne.name}</span> - ${teamOne.score}<br/>
        <span>${teamTwo.name}</span> - ${teamTwo.score}<br />
      `;

    notify(teamOne, teamTwo);
});

const notify = (first_team, second_team) => {

    if (first_team.score !== 0 && second_team.score !== 0) {
        const notificationId = "notify"

        const options = {
            type:    'list',
            iconUrl: 'img/icon32.png',
            title:   `${first_team.name} vs ${second_team.name}`,
            message: `There's been a score update on the game between ${first_team.score} and ${second_team.score}.`
        };

        chrome.notifications.create(notificationId, options);
        chrome.notifications.clear(notificationId);
    }
};