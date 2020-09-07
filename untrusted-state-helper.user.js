// ==UserScript==
// @name         Untrusted State Helper
// @namespace    https://alexnisnevich.github.io/untrusted/
// @version      0.1
// @description  try to take over the world!
// @author       Sascha Ringström
// @match        https://alexnisnevich.github.io/untrusted/
// @grant        GM_setClipboard
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/untrusted-state-helper.user.js
// ==/UserScript==

;(function () {
  'use strict'

  function resetLocalStorage() {
    localStorage.clear()
  }

  function copyLocalStorageToClipboard() {
    const entries = JSON.stringify(Object.entries(localStorage))
    GM_setClipboard(entries)
    alert('Copied state to clipboard!')
  }

  function importLocalStorage() {
    const jsonState = prompt('Gimme the JSON')
    const state = JSON.parse(jsonState)

    resetLocalStorage()

    state.forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })

    location.reload()
  }

  function renderHelper() {
    const helperWindow = document.createElement('div')
    helperWindow.className = 'helper-window'
    helperWindow.innerHTML = `
       <h4>Untrusted State Helper</h4>
       <button class="helper-window__btn" id="helper-window__btn-export">Export State</button>
       <button class="helper-window__btn" id="helper-window__btn-import">Import State </button>
      `
    const css = document.createElement('style')
    css.innerHTML = `
        .helper-window {
          position: fixed;
          top: 20px;
          right: 20px;
          border: 2px solid #00f300;
          padding: 0 20px 20px 20px;
          background: black;
        }

       .helper-window__btn {
         padding: 10px 20px;
         background: black;
         color: white;
         text-align: center;
         border: 2px solid #00f300;
         cursor: pointer;
         transition: 50ms;
       }

      .helper-window__btn:hover {
         background: #00f300;
         color: black;
       }

       img[alt*=Fork] { display: none !important; }
      `

    document.querySelector('head').appendChild(css)
    document.querySelector('body').appendChild(helperWindow)

    document.querySelector(
      '#helper-window__btn-export'
    ).onclick = copyLocalStorageToClipboard
    document.querySelector(
      '#helper-window__btn-import'
    ).onclick = importLocalStorage
  }

  renderHelper()
})()
