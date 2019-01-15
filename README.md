## Console++

Adds styling related methods to console object.
- `console.commands();` for brief showcase of most commands.
- `console.help();` for more detailed information of the available commands.
- `console.{COLOR_NAME}();` to log in different colors. Run `console.available();` too see all available colors.
#### [INSTALL CONSOLE++](https://github.com/Saschamz/userscripts/raw/master/Console%2B%2B.user.js)

## Bitbucker PR Template 

Automatically fills the WYSIWYG editor in BitBucket when creating a new PR template.

To change the customize the template make your changes in the editor and run the following
inside your browser terminal:
```javascript
localStorage.setItem('BITBUCKET_PR_TEMPLATE', document.querySelector('.ProseMirror').innerHTML)
```
#### [INSTALL BITBUCKET PR TEMPLATE](https://github.com/Saschamz/userscripts/raw/master/bitbucket-pr-template.user.js)
