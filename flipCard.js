function flipCard(cardClass) {
    const card = document.querySelector(`.${cardClass}`);
    card.classList.toggle("flipped");
}