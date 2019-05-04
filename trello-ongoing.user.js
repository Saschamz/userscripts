// ==UserScript==
// @name         Ongoing Trello Cards
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a fixed horizontal container for cards with a tag that contains ongoing.
// @author       Sascha Ringström - https://github.com/Saschamz
// @match        https://trello.com/b/*
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/trello-ongoing.user.js
// @grant        none
// ==/UserScript==

;(function() {
  const css = {
    container: `
        position: fixed;
        bottom: 40px;
        left: 40px;
      `,
    cardContainer: `
        display: grid;
        grid-auto-flow: column;
        grid-gap: 10px;
        background: #dfe0e6;
        padding: 10px 10px 2px 10px;
        border-radius: 3px;
      `,
    fabContainer: `
        height: 30px;
        width: 30px;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        align-items: center;
        background: #dfdfe6;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translate(-33%, 14%);
        cursor: pointer;
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
      `,
    fabIcon: `
        font-weight: 800;
        background: none;
        color: #222;
        line-height: 1.1;
        margin: 0;
        font-family: monospace;
      `,
    fabIndicatorContainer: `
        height: 18px;
        width: 18px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        background: red;
      `,
    fabIndicator: `
        color: white;
        margin: 0;
        line-height: 1.1;
        font-size: 12px;
      `,
    fabText: `
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(110%, -50%);
        color: white;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
        display: none;
      `
  }

  const isContainerHidden = () =>
    Boolean(
      document.querySelector('#userscript_card-container')
        ? document.querySelector('#userscript_card-container').style.display ===
            'none'
        : localStorage.getItem('@SCRIPT_ONGOING_VISIBILITY') === 'hidden'
    )

  const onClickFab = () => {
    document.querySelector(
      '#userscript_card-container'
    ).style.display = isContainerHidden() ? 'grid' : 'none'
    document.querySelector(
      '#userscript_fab-indicator'
    ).style.display = isContainerHidden() ? 'flex' : 'none'
    document.querySelector(
      '#userscript_fab-text'
    ).style.display = isContainerHidden() ? 'block' : 'none'
    document.querySelector(
      '#userscript_fab-icon'
    ).innerHTML = isContainerHidden() ? '+' : '-'
    localStorage.setItem(
      '@SCRIPT_ONGOING_VISIBILITY',
      isContainerHidden() ? 'hidden' : 'visible'
    )
  }

  const createHorizontalContainer = () => {
    // Create Elements
    const container = document.createElement('span')
    const cardContainer = document.createElement('div')
    const fabContainer = document.createElement('div')
    const fabIcon = document.createElement('h1')
    const fabIndicatorContainer = document.createElement('div')
    const fabIndicator = document.createElement('h6')
    const fabText = document.createElement('h4')

    // Apply Properties
    fabIcon.id = 'userscript_fab-icon'
    fabIndicatorContainer.id = 'userscript_fab-indicator'
    fabText.id = 'userscript_fab-text'
    cardContainer.id = 'userscript_card-container'
    fabIndicator.id = 'userscript_fab-indicator-amount'
    fabText.innerText = 'Ongoing Cards'
    fabIcon.innerText = isContainerHidden() ? '+' : '-'
    fabContainer.onclick = onClickFab

    // Apply Styles
    const elementsToStyle = [
      { fabIcon },
      { fabContainer },
      { fabText },
      { fabIndicator },
      { fabIndicatorContainer },
      { cardContainer },
      { container }
    ]
    elementsToStyle.forEach(
      el => (el[Object.keys(el)[0]].style.cssText = css[Object.keys(el)[0]])
    )
    if (isContainerHidden()) {
      cardContainer.style.display = 'none'
      fabIndicatorContainer.style.display = 'flex'
      fabText.style.display = 'block'
    }

    fabIndicator.innerText = Array.from(
      document.querySelectorAll('[title*=ongoing]')
    ).length

    // Append Elements
    container.appendChild(cardContainer)
    document.querySelector('#surface').appendChild(container)
    fabIndicatorContainer.appendChild(fabIndicator)
    fabContainer.appendChild(fabIcon)
    fabContainer.appendChild(fabIndicatorContainer)
    fabContainer.appendChild(fabText)
    container.appendChild(fabContainer)
  }

  const RETRY_INTERVAL = 50
  const RETRY_DURATION_LIMIT = 500
  const RETRY_LIMIT = RETRY_DURATION_LIMIT / RETRY_INTERVAL
  let attempt
  let moveCardsInterval
  const moveOngoingCards = () => {
    moveCardsInterval = setInterval(() => {
      const ongoingCards = Array.from(
        document.querySelectorAll('[title*=ongoing]')
      ).map(el => el.parentNode.parentNode.parentNode)

      ongoingCards.forEach(card => {
        card.style.background = '#fff'
        card.style.borderRadius = '3px'
        card.style.boxShadow = 'rgba(9, 30, 66, .25)'
        document.querySelector('#userscript_card-container').appendChild(card)
      })

      if (ongoingCards.length > 0) {
        document.querySelector('#userscript_fab-indicator-amount').innerText =
          ongoingCards.length
        return clearInterval(moveCardsInterval)
      }

      if (ongoingCards.length > 0 || attempt === RETRY_DURATION_LIMIT) return

      ++attempt
    }, RETRY_INTERVAL)
  }

  // Script Flow
  createHorizontalContainer()
  moveOngoingCards()
})()
