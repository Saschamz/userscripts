# Setup

You'll need a plugin like [Tampmonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) before installing any scripts.

> DISCLAIMER: You might want to go into settings and disable automatic script updates for Tampermonkey.

## 👩‍💻→👨‍💻 Untrusted State Helper

Helper UI to export/import state for [untrusted](https://alexnisnevich.github.io/untrusted/) between users.

Created as a remote mob programming exercise tool to avoid the tedious setup of desktop remote control applications.

#### [INSTALL UNTRUSTED STATE HELPER](https://github.com/Saschamz/userscripts/raw/master/untrusted-state-helper.user.js)

### How to use

1. Press the export state button (it will copy your localStorage as JSON to your clipboard).
2. Send the JSON to another person.
3. (other person) Press the import state button and paste the JSON into the prompt.

## 🌈 Console++

Adds styling related methods to console object.

- `console.commands()` for brief showcase of most commands.
- `console.help()` for more detailed information of the available commands.
- `console.{COLOR_NAME}()` to log in different colors. Run `console.available()` too see all available colors.

#### [INSTALL CONSOLE++](https://github.com/Saschamz/userscripts/raw/master/Console%2B%2B.user.js)

## :octocat: Github PR Template

Automatically fills the WYSIWYG editor in Github when creating a new PR template.

#### [INSTALL GITHUB PR TEMPLATE](https://github.com/Saschamz/userscripts/raw/master/github-pr-template.user.js)

## 📄 Bitbucket PR Template

Automatically fills the WYSIWYG editor in BitBucket when creating a new PR template.

To customize the template make your changes in the editor and run the following inside your browser terminal:

```javascript
localStorage.setItem('BITBUCKET_PR_TEMPLATE', document.querySelector('.ProseMirror').innerHTML)
```

#### [INSTALL BITBUCKET PR TEMPLATE](https://github.com/Saschamz/userscripts/raw/master/bitbucket-pr-template.user.js)

## 🎴️ Trello Ongoing Cards

Keep track of cards that are labelled with a tag containing the text "ongoing".
They are put inside a fixed horizontal container with the option to minimize.

#### [INSTALL TRELLO ONGOING CARDS](https://github.com/Saschamz/userscripts/raw/master/trello-ongoing.user.js)

## ⭐️ Trello Stars

Locally star trello cards you need to keep track of by hovering them and pressing `§`.

> Uses localstorage to keep track of your stored cards across browser sessions.

#### [INSTALL TRELLO STARS](https://github.com/Saschamz/userscripts/raw/master/trello-stars.user.js)

## ✨ Clubhouse Stars

Locally star clubhouse cards you need to keep track of by hovering them and pressing `§`.

Customize your own styles via the `window.starredCards.css` property.

**EXAMPLE**:

```javascript
window.starredCards.css = `
  ${window.starredCards.starredClass} {
    background: black !important;
  }

  ${window.starredCards.starredClass} * {
    color: white !important;
  }
`
```

> Uses localstorage to keep track of your stored cards and custom styles across browser sessions.

#### [INSTALL CLUBHOUSE STARS](https://github.com/Saschamz/userscripts/raw/master/clubhouse-stars.user.js)

## 🖌 \_css

Adds the `_css` object to all websites that you can use to inject styles to the website. Useful for debugging. Also comes with a prebuilt `addRedBorder` method.

**EXAMPLE**:

```javascript
// Adds the styles to the website
_css.injectCss(`
  * {
    display: none;
  }
`)

// Removes your injected css
_css.ejectCss()

// The selector argument is optional, default is *
_css.addRedBorder('div')
```

> Uses localstorage to keep track of your stored cards and custom styles across browser sessions.

#### [INSTALL \_CSS](https://github.com/Saschamz/userscripts/raw/master/_css_.user.js)
