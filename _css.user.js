// ==UserScript==
// @name         _css
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *
// @icon         https://www.google.com/s2/favicons?domain=shortcut.com
// @grant        none
// ==/UserScript==

;(function () {
  const head = document.querySelector('head')

  let injectedIndex = -1

  function injectCss(css) {
    if (injectedIndex !== -1) {
      ejectCss()
    }

    injectedIndex = head.innerHTML.length
    head.innerHTML += `<style>${css}</style>`
  }

  function ejectCss() {
    if (injectedIndex === -1) {
      return
    }

    head.innerHTML = head.innerHTML.slice(0, injectedIndex)
    injectedIndex = -1
  }

  function addRedBorder(selector = '*') {
    injectCss(`
           ${selector} {
           border: 1px solid red !important;
           }
       `)
  }

  window._css = {
    injectCss,
    ejectCss,
    addRedBorder,
  }
})()
