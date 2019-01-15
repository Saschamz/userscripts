// ==UserScript==
// @name         Bitbucker PR Template
// @namespace    Sascha
// @version      0.1
// @description  Bitbucker PR Template
// @author       Sascha Ringström
// @match        https://bitbucket.org/*/pull-requests/new*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/bitbucket-pr-template.user.js
// ==/UserScript==

(function() {
  'use strict';

const lookForComponentLoad = setInterval(() => {
  if (document.querySelector('.ProseMirror') && document.querySelector('.select2-choice')) {
    clearInterval(lookForComponentLoad);
    setupTemplate();
  }
}, 1000);

function setupTemplate() {
  const pullRequestTemplate = `<h1>PR - &lt;branch-name&gt;</h1><hr contenteditable="false" class=""><h2>Description</h2><p>&lt;description of your change/pr&gt;</p><hr contenteditable="false" class=""><h2>Environment</h2><p>Node.js <span class="code" style="white-space: pre-wrap;">v.8.10.0</span></p><hr contenteditable="false" class=""><h2>How to test/verify this feature</h2><ul><li><p>&lt;step 1&gt;</p></li></ul><hr contenteditable="false" class=""><p><strong>TRELLO:</strong>  &lt;trello link&gt;</p>`
  const [,,targetBranch] = document.querySelectorAll('.select2-choice');
  const [,,targetBranchText] = document.querySelectorAll('.select2-chosen');
  const descriptionBox = document.querySelector('.ProseMirror');

  descriptionBox.innerHTML = pullRequestTemplate;
  targetBranch.style.background = '#ff4754';
  targetBranchText.style.color = 'white';

  const lookForBranchSwitch = setInterval(() => {
    if (!targetBranchText.innerHTML.includes('master')) {
      clearInterval(lookForBranchSwitch);
      targetBranch.style.background = '#47ff47';
    }
  }, 1000);
}
})();