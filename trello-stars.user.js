// ==UserScript==
// @name         Console++
// @namespace    Sascha
// @version      0.1
// @description  CSS functions for the console object.
// @author       Sascha Ringström
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/Console%2B%2B.user.js
// ==/UserScript==

(function() {
  const starredCards = JSON.parse(localStorage.getItem('trello-stars')) || {}
  const allVisibleCards = Array.from(document.querySelectorAll('.list-card'))
  
  allVisibleCards
    .filter(card => starredCards[card.href])
    .forEach(card => card.style.background = 'gold')

  document.addEventListener('keydown', ({ key }) => {
    if (/s/i.test(key)) {
      console.log('add star')
    }
  })

})();


