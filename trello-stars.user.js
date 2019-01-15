// ==UserScript==
// @name         Trello Stars
// @namespace    Sascha
// @version      0.1
// @description  Locally star trello cards you need to keep track of.
// @author       Sascha Ringström
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/trello-stars.user.js
// ==/UserScript==

(function() {
  const starredCards = new Set(JSON.parse(localStorage.getItem('TRELLO_STARS'))) || {}
  const allVisibleCards = Array.from(document.querySelectorAll('.list-card'))
  let hoveredCard = null
  
  allVisibleCards
    .filter(card => starredCards.has(card.href))
    .forEach(card => card.style.background = 'gold')

  document.addEventListener('keydown', ({ key }) => {
    if (key === '§' && hoveredCard) {
      if (starredCards.has(hoveredCard.href)) {
        starredCards.delete(hoveredCard.href)
        hoveredCard.style.background = 'white'
      } else {
        starredCards.add(hoveredCard.href)
        hoveredCard.style.background = 'gold'
      }

      localStorage.setItem('TRELLO_STARS', JSON.stringify(Array.from(starredCards)))
    }
  })

  allVisibleCards.forEach(card => {
    card.addEventListener('mouseenter', ({ target }) => {
      hoveredCard = target
    })
    
    card.addEventListener('mouseleave', () => {
      hoveredCard = null
    })
  })
})();


