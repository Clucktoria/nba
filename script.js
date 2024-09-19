document.addEventListener("DOMContentLoaded", () => {
    const url = "https://nba-prod-us-east-1-mediaops-stats.s3.amazonaws.com/NBA/liveData/scoreboard/todaysScoreboard_00.json";
    const scoresContainer = document.getElementById("scores");
    const loadingIndicator = document.getElementById("loading");
    const refreshButton = document.getElementById("refreshButton");

    const fetchNBAScores = async () => {
        loadingIndicator.style.display = "block";
        scoresContainer.innerHTML = "";

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.scoreboard.games.length > 0) {
                data.scoreboard.games.forEach(game => {
                    const gameInfo = document.createElement("div");
                    gameInfo.className = "game";
                    gameInfo.innerHTML = `
                        <strong>Game:</strong> ${game.homeTeam.teamName} vs ${game.visitorTeam.teamName}<br>
                        <strong>Score:</strong> ${game.homeTeam.score} - ${game.visitorTeam.score}<br>
                        <strong>Status:</strong> ${game.status}<br>
                    `;
                    scoresContainer.appendChild(gameInfo);
                });
            } else {
                scoresContainer.innerHTML = "No games scheduled for today.";
            }
            
        } catch (error) {
            console.error("Error fetching NBA scores:", error);
            scoresContainer.innerHTML = "Error fetching scores. Please try again later.";
        } finally {
            loadingIndicator.style.display = "none";
        }
    };

    fetchNBAScores();
    refreshButton.addEventListener("click", fetchNBAScores);
    setInterval(fetchNBAScores, 60000);
});
