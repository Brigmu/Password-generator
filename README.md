# Password-generator

## Description

This project is a pretty simple password generator that when the user clicks a button will generate a password with specified characteristics.  Those characteristics are specified by checkboxes that the user can check or uncheck as well as enter a length number.  Once generated the password can be copied to the clipboard for use elsewhere. There is also a button that when clicked will show or hide a seperate panel that shows insructions on what the user can/should do on the page.

This project was a good test of using functions, figuring out the logic of what needs to be done with them, and using event listeners to make multiple buttons responsive.  The biggest challenge was figuring out how to get the password generation to guarantee at least 1 of each of the selected characteristics while also making them in a random spot and the rest of the password random.  To do this an array is created that is the length chosen by the user and filled with undefined to start.  It is then filled with 1 of each of the chosen characteristics (checks if undefined, then in fills, if already has something in that spot try a new spot) and then filled the rest of the way randomly and then displayed.

## Installation

Only required installation to use this project is your choice of web browser.

## Usage

![SitePhoto](/Images/pwgen-screenshot.png)

Instructions are on the website if needed.  Open web browser and go to [brigmu.github.io/Password-generator](brigmu.github.io/Password-generator) to begin.  Then un-check or check whatever characters you would like in the password, enter a digit length from 8 to 128, then click generate password to get the password.  Once generated, the copy to clipboard will copy that password to the clipboard for use elsewhere.

## Credits

Git: used for versioning and publishing the site.

VS Code: used to create everything

## Tests/Parameters

Try typing in a password less than 8 characters or more than 128 characters then generating.

Try generating a password with no boxes checked.
