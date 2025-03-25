// Your code here
fetch("https://phase-1-end-project-assessment.vercel.app/characters")
  .then((response) => response.json())
  .then((characters) => {
    const characterBar = document.getElementById("character-bar");
    characters.forEach((character) => {
      const span = document.createElement("span");
      span.innerText = character.name;
      span.dataset.id = character.id; 
      characterBar.appendChild(span);
    });
  });

const characterBar = document.getElementById("character-bar");
characterBar.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    const characterId = event.target.dataset.id;
    fetch(`https://phase-1-end-project-assessment.vercel.app/characters/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        const detailedInfo = document.getElementById("detailed-info");
        detailedInfo.innerHTML = `
          <h2>${character.name}</h2>
          <img src="${character.image}" alt="${character.name}" />
          <p>Votes: <span id="vote-count">${character.votes}</span></p>
          <form id="votes-form">
            <input type="number" id="votes" min="1" placeholder="Add votes">
            <button type="submit">Submit Vote</button>
            <button id="reset-btn" type="button">Reset Votes</button>
          </form>
        `;
        
        
        const votesForm = document.getElementById("votes-form");
        votesForm.addEventListener('submit', event => {
          event.preventDefault();
          const votesInput = document.getElementById('votes');
          const voteCount = document.getElementById('vote-count');
          const currentVotes = parseInt(voteCount.textContent);
          const newVotes = currentVotes + parseInt(votesInput.value);
          voteCount.textContent = newVotes;
          votesForm.reset();
        });
        
        const resetVotesButton = document.getElementById("reset-btn");
        resetVotesButton.addEventListener("click", () => {
          const voteCount = document.getElementById("vote-count");
          voteCount.textContent = 0;
        });
      });
  }
});

