
    const gridCards = document.querySelectorAll('.grid-card');
    const startButton = document.getElementById('startButton');
    const cardsButton = document.querySelectorAll('.grid-card');
    const images = document.querySelectorAll('.image');
    
    let currentPlayer = 1;
    let player1Score = 0;
    let player2Score = 0;
    let flippedCards = [];
    let matchesCounter = 0;
    

    
    images.forEach((img) => {
      img.addEventListener('click', makeapick);
      setTimeout(hideImages, 1000);
      img.style.opacity = '1';
    });
    startButton.addEventListener('click', startGame);
    
    function makeapick(event) {
      const clickedImage = event.target;
      // Ensure you're getting the data-id from the clicked image or its parent if needed
      const clickedImageId =
        clickedImage.dataset.id || clickedImage.parentElement.dataset.id;
    
      // Ignore clicks if two cards are already flipped and not yet processed
      if (flippedCards.length >= 2) return;
    
      clickedImage.style.opacity = '1'; // Show clicked image
      flippedCards.push(clickedImageId); // Track clicked image by its identifier
    
      // When two images are clicked (flipped)
      if (flippedCards.length === 2) {
        // Check if the flipped cards match
        if (flippedCards[0] === flippedCards[1]) {
          // Update scores as appropriate
          currentPlayer === 1 ? player1Score++ : player2Score++;
          updateScore(); // Reflect the new score
          matchesCounter++;
          console.log('matchesCounter', matchesCounter);
        } else {
          // If they don't match, hide them after a short delay
          setTimeout(() => {
            document
              .querySelectorAll(
                `[data-id="${flippedCards[0]}"], [data-id="${flippedCards[1]}"]`
              )
              .forEach((img) => (img.style.opacity = '0'));
          }, 1000);
        }
        // Reset flipped cards for the next turn
        flippedCards = [];
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }
      
      if (matchesCounter === 8) {
        if (player1Score > player2Score) {
          alert('Player 1 wins!');
        } else if (player2Score > player1Score) {
          alert('Player 2 wins!');
        }
      }
    }
    function startGame(event) {
      //prevents the default behavior of the anchor element
      event.preventDefault();
    
      startButton.disabled = true;
      setTimeout(hideImages, 1000);
    }
    function hideImages() {
      gridCards.forEach((card) => {
        const image = card.querySelector('img');
        image.style.opacity = '0';
      });
      console.log('hideImages');
    }
   
    function showImage() {
      gridCards.forEach((card) => {
        const image = card.querySelector('img');
        image.style.opacity = '1';
      });
      console.log('showImage');
    }
    
    // Moved outside of showImage
    function resetGame() {
      currentPlayer = 1;
      player1Score = 0;
      player2Score = 0;
      flippedCards = [];
      // clearTimeout(timer); // Ensure 'timer' is defined and used correctly if needed
    }
    
    // Moved outside of showImage
    function updateScore() {
      console.log('score is getting updated');
      document.getElementById('player1Score').textContent = player1Score;
      document.getElementById('player2Score').textContent = player2Score;
    }
    
  