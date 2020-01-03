// ==UserScript==
// @name         Clubhouse Stars
// @namespace    Sascha
// @version      0.1
// @description  Locally star clubhouse cards you need to keep track of.
// @author       Sascha Ringström
// @match        https://app.clubhouse.io.com/*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/clubhouse-stars.user.js
// ==/UserScript==

;(function() {
  const STORAGE_KEY = 'STARRED_CARDS'
  const CUSTOM_CSS_STORAGE_KEY = 'STARRED_CARDS_CUSTOM_CSS'
  const STARRED_CLASS = 'clubhouse-stars-starred'
  const defaultCss = `
    .${STARRED_CLASS} {
        background: gold !important;
    }
  `
  let hoveredCard = null
  let mouseUpLocation
  let mouseDownLocation

  const starredCards = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)))

  function attachDragListener(callback) {
    document.addEventListener('mouseup', ({ screenX, screenY }) => {
      mouseUpLocation = screenX + screenY
      if (mouseUpLocation !== mouseDownLocation) callback()
    })

    document.addEventListener('mousedown', ({ screenX, screenY }) => {
      mouseDownLocation = screenX + screenY
    })
  }

  function getVisibleCards() {
    return Array.from(document.querySelectorAll('a[id^=story]'))
  }

  function addColorsToCards(cards) {
    cards
      .filter(card => starredCards.has(card.href))
      .forEach(card => card.classList.add(STARRED_CLASS))
  }

  const onMouseEnterCard = ({ target }) => {
    hoveredCard = target
  }

  const onMouseLeaveCard = () => {
    hoveredCard = null
  }

  function attachListenersToCards(cards) {
    cards.forEach(card => {
      card.removeEventListener('mouseenter', onMouseEnterCard)
      card.removeEventListener('mouseleave', onMouseLeaveCard)
      card.addEventListener('mouseenter', onMouseEnterCard)
      card.addEventListener('mouseleave', onMouseLeaveCard)
    })
  }

  function initializeCards() {
    attachListenersToCards(getVisibleCards())
    addColorsToCards(getVisibleCards())
  }

  function initialize() {
    const css = document.createElement('style')
    css.innerHTML = localStorage.getItem(CUSTOM_CSS_STORAGE_KEY) || defaultCss
    document.body.appendChild(css)

    initializeCards()
    attachDragListener(() => setTimeout(() => initializeCards, 1200))

    history.pushState = (f =>
      function pushState() {
        setTimeout(() => initializeCards, 1200)
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
      })(history.pushState)

    history.replaceState = (f =>
      function replaceState() {
        setTimeout(() => initializeCards, 1200)
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
      })(history.replaceState)

    window.addEventListener('popstate', () => {
      setTimeout(() => initializeCards, 1200)
      window.dispatchEvent(new Event('locationchange'))
    })

    document.addEventListener('keydown', ({ key }) => {
      if (key === '§' && hoveredCard) {
        if (starredCards.has(hoveredCard.href)) {
          starredCards.delete(hoveredCard.href)
          hoveredCard.classList.remove(STARRED_CLASS)
        } else {
          starredCards.add(hoveredCard.href)
          hoveredCard.classList.add(STARRED_CLASS)
        }

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(Array.from(starredCards))
        )
      }
    })
  }

  window.clubhouseStars = {
    starredClass = STARRED_CLASS,
    get css() {
      return localStorage.getItem(CUSTOM_CSS_STORAGE_KEY) || defaultCss
    },
    set css(styles) {
      localStorage.setItem(CUSTOM_CSS_STORAGE_KEY, styles)
      const css = document.createElement('style')
      css.innerHTML = style
      document.body.appendChild(css)
    }
  }

  initialize()
})()
