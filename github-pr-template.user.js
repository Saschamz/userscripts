// ==UserScript==
// @name         Github PR Template
// @namespace    Sascha
// @version      0.1
// @description  Github PR Template
// @author       Sascha Ringström
// @match        https://github.com/*/**/compare/*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/github-pr-template.user.js
// ==/UserScript==

function retryIfNoElement(
  querySelector,
  callback,
  interval = 50,
  maxAttempts = 100,
  attempt = 0
) {
  const element = document.querySelector(querySelector)

  if (element) return callback(element)
  if (attempt === maxAttempts) return

  setTimeout(() => {
    retryIfNoElement(querySelector, callback, interval, maxAttempts, ++attempt)
  }, interval)
}

const PR_TEMPLATE_TEXT = `## Description

Description of your changes

## Checklist
- [ ] At the top of this comment add the clubhouse story number e.g. \`[ch123]\`
- [ ] Does the branch adhere to our branch naming conventions [Document](document.com)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] My change requires a change to the documentation.
- [ ] I have updated the documentation accordingly.
- [ ] I have added tests to cover my changes.
- [ ] Have you successfully ran tests with your changes locally?
- [ ] All new and existing tests passed.
- [ ] Have you added an explanation of what your changes do?
- [ ] If you have added new environment variables, have you updated the .env.example

## Environment & Setup
- [ ] :computer: node version => \`nvm use 10.13.0\`
- [ ] :books: new libraries => \`npm ci\`
- [ ] :iphone: native changes => \`pod install\`
- [ ] :scroll: env file changes

## How to test/verify this feature

Explain how in an ordered list of whats required to test this feature.

1.
2.
3.
4.
`

;(function() {
  retryIfNoElement(
    'textarea[id^=pull_request]',
    el => (el.value = PR_TEMPLATE_TEXT),
    200,
    Infinity
  )
})()
