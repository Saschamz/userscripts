// ==UserScript==
// @name         Bitbucker PR Template
// @namespace    Sascha
// @version      0.3.0
// @description  Bitbucker PR Template
// @author       Sascha Ringström
// @match        https://bitbucket.org/*/pull-requests/*
// @grant        GM_setClipboard
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/bitbucket-pr-template.user.js
// ==/UserScript==

;(function() {
  'use strict'
  if (window.location.href.includes('new')) {
    const lookForComponentLoad = setInterval(() => {
      if (
        document.querySelector('.ProseMirror') &&
        document.querySelector('.select2-choice')
      ) {
        clearInterval(lookForComponentLoad)
        setupTemplate()
      }
    }, 1000)
  } else {
    Array.from(document.querySelectorAll('code')).forEach(code => {
      if (code.innerText.includes('git fetch')) {
        GM_setClipboard(code.innerText)
      }
    })
  }

  function setupTemplate() {
    const [branchName, , targetBranch] = document.querySelectorAll(
      '.select2-choice'
    )
    const [, , targetBranchText] = document.querySelectorAll('.select2-chosen')
    const descriptionBox = document.querySelector('.ProseMirror')
    const title = document.querySelector('#id_title')
    const gitCommand = `git fetch --all && git checkout ${branchName.innerText}`

    const pullRequestTemplate =
      localStorage.getItem('BITBUCKET_PR_TEMPLATE') ||
      `<h1>PR - ${
        branchName.innerText
      }</h1><p><span shortname=":link:" id="1f517" text="🔗" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f517" data-emoji-short-name=":link:" data-emoji-text="🔗"><span class="f1yhv2qy emoji-common-node" aria-label=":link:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/objects.png&quot;); background-position: 35.7143% 92.3077%; background-size: 1500% 1400%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span>  <span style="white-space: pre-wrap;" class="code">${gitCommand}</span>  </p><hr contenteditable="false" class="" draggable="false"><h2>Description</h2><p>&lt;description of your change/pr&gt;</p><hr contenteditable="false" class="" draggable="false"><h2>Environment &amp; Setup</h2><p><span shortname=":computer:" id="1f4bb" text="💻" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f4bb" data-emoji-short-name=":computer:" data-emoji-text="💻"><span class="f1yhv2qy emoji-common-node" aria-label=":computer:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/objects.png&quot;); background-position: 21.4286% 0%; background-size: 1500% 1400%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span>  Node.js <span style="white-space: pre-wrap;" class="code">v.8.10.0</span> →  <span style="white-space: pre-wrap;" class="code">nvm use</span></p><p><span shortname=":books:" id="1f4da" text="📚" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f4da" data-emoji-short-name=":books:" data-emoji-text="📚"><span class="f1yhv2qy emoji-common-node" aria-label=":books:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/objects.png&quot;); background-position: 14.2857% 92.3077%; background-size: 1500% 1400%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span>  New libraries →  <span style="white-space: pre-wrap;" class="code">npm ci</span></p><p><span shortname=":iphone:" id="1f4f1" text="📱" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f4f1" data-emoji-short-name=":iphone:" data-emoji-text="📱"><span class="f1yhv2qy emoji-common-node" aria-label=":iphone:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/objects.png&quot;); background-position: 7.14286% 0%; background-size: 1500% 1400%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span>  Native Changes →  <span style="white-space: pre-wrap;" class="code">pod install</span></p><p><span shortname=":scroll:" id="1f4dc" text="📜" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f4dc" data-emoji-short-name=":scroll:" data-emoji-text="📜"><span class="f1yhv2qy emoji-common-node" aria-label=":scroll:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/objects.png&quot;); background-position: 21.4286% 76.9231%; background-size: 1500% 1400%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span>  New .env variables → </p><div class="code-block"><div class="line-number-gutter" contenteditable="false"><span></span></div><div class="code-content"><pre><code data-language="" spellcheck="false"><br></code></pre></div></div><hr contenteditable="false" class="" draggable="false"><h2>How to test/verify this feature</h2><ul><li><p>&lt;step 1&gt;</p></li></ul><hr contenteditable="false" class="" draggable="false"><p><span shortname=":flower_playing_cards:" id="1f3b4" text="🎴" class="emojiView-content-wrap" contenteditable="false"><span class="sc-jbWsrJ dzIUzE"><span data-emoji-id="1f3b4" data-emoji-short-name=":flower_playing_cards:" data-emoji-text="🎴"><span class="f1yhv2qy emoji-common-node" aria-label=":flower_playing_cards:"><span><span class="emoji-common-emoji-sprite" style="background-image: url(&quot;https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/standard/a51a7674-8d5d-4495-a2d2-a67c090f5c3b/64x64/spritesheets/symbols.png&quot;); background-position: 11.1111% 81.25%; background-size: 1900% 1700%; width: 20px; height: 20px;">&nbsp;</span></span></span></span></span></span> <strong>TRELLO:</strong>  &lt;trello link&gt;  </p>`

    title.value = branchName.innerText
    descriptionBox.innerHTML = pullRequestTemplate
    targetBranch.style.background = '#ff4754'
    targetBranchText.style.color = 'white'

    const lookForBranchSwitch = setInterval(() => {
      if (!targetBranchText.innerHTML.includes('master')) {
        clearInterval(lookForBranchSwitch)
        targetBranch.style.background = '#47ff47'
      }
    }, 1000)
  }
})()
