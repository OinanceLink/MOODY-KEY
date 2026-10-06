/* =========================================
   MOODY KEY
   Keyboard Engine
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const emojiButton =
    document.getElementById("emojiButton");

const smallEmojiButton =
    document.getElementById("smallEmojiButton");

const numberEmojiButton =
    document.getElementById("numberEmojiButton");

const emojiPanel =
    document.getElementById("emojiPanel");

const closeEmoji =
    document.getElementById("closeEmoji");

const emojiGrid =
    document.getElementById("emojiGrid");

const numbersButton =
    document.getElementById("numbersButton");

const lettersButton =
    document.getElementById("lettersButton");

const lettersButtonBottom =
    document.getElementById(
        "lettersButtonBottom"
    );

const lettersKeyboard =
    document.getElementById(
        "lettersKeyboard"
    );

const numbersKeyboard =
    document.getElementById(
        "numbersKeyboard"
    );

const shiftButton =
    document.getElementById(
        "shiftButton"
    );

const backspaceButton =
    document.getElementById(
        "backspaceButton"
    );

const numberBackspaceButton =
    document.getElementById(
        "numberBackspaceButton"
    );

const spaceButton =
    document.getElementById(
        "spaceButton"
    );

const numberSpaceButton =
    document.getElementById(
        "numberSpaceButton"
    );

const enterButton =
    document.getElementById(
        "enterButton"
    );

const numberEnterButton =
    document.getElementById(
        "numberEnterButton"
    );

const commaButton =
    document.getElementById(
        "commaButton"
    );

const periodButton =
    document.getElementById(
        "periodButton"
    );


/* =========================================
   KEYBOARD STATE
========================================= */

let isShiftOn = true;


/* =========================================
   FOCUS MESSAGE BOX
========================================= */

function focusMessage() {

    messageInput.focus();

}


/* =========================================
   INSERT TEXT
========================================= */

function insertText(text) {

    focusMessage();

    document.execCommand(
        "insertText",
        false,
        text
    );

}


/* =========================================
   LETTER KEYS
========================================= */

const letterKeys =
    document.querySelectorAll(
        ".letter-key"
    );


letterKeys.forEach(key => {

    key.addEventListener(
        "click",
        () => {

            let letter =
                key.textContent.trim();

            if (isShiftOn) {

                letter =
                    letter.toUpperCase();

            } else {

                letter =
                    letter.toLowerCase();

            }

            insertText(letter);

        }
    );

});


/* =========================================
   NUMBER / SYMBOL KEYS
========================================= */

const numberKeys =
    document.querySelectorAll(
        ".number-key, .symbol-key"
    );


numberKeys.forEach(key => {

    key.addEventListener(
        "click",
        () => {

            const value =
                key.textContent.trim();

            insertText(value);

        }
    );

});


/* =========================================
   SHIFT
========================================= */

shiftButton.addEventListener(
    "click",
    () => {

        isShiftOn = !isShiftOn;

        letterKeys.forEach(key => {

            const original =
                key.textContent
                    .trim()
                    .toLowerCase();

            key.textContent =
                isShiftOn
                    ? original.toUpperCase()
                    : original.toLowerCase();

        });

        shiftButton.classList.toggle(
            "shift-active",
            isShiftOn
        );

    }
);


/* =========================================
   BACKSPACE
========================================= */

function deleteLastCharacter() {

    focusMessage();

    document.execCommand(
        "delete",
        false,
        null
    );

}


backspaceButton.addEventListener(
    "click",
    deleteLastCharacter
);


numberBackspaceButton.addEventListener(
    "click",
    deleteLastCharacter
);


/* =========================================
   SPACE
========================================= */

function addSpace() {

    insertText(" ");

}


spaceButton.addEventListener(
    "click",
    addSpace
);


numberSpaceButton.addEventListener(
    "click",
    addSpace
);


/* =========================================
   ENTER
========================================= */

function addEnter() {

    focusMessage();

    document.execCommand(
        "insertHTML",
        false,
        "<br>"
    );

}


enterButton.addEventListener(
    "click",
    addEnter
);


numberEnterButton.addEventListener(
    "click",
    addEnter
);


/* =========================================
   COMMA
========================================= */

commaButton.addEventListener(
    "click",
    () => {

        insertText(",");

    }
);


/* =========================================
   PERIOD
========================================= */

periodButton.addEventListener(
    "click",
    () => {

        insertText(".");

    }
);


/* =========================================
   NUMBER MODE
========================================= */

numbersButton.addEventListener(
    "click",
    () => {

        lettersKeyboard.classList.add(
            "hidden"
        );

        numbersKeyboard.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   LETTER MODE
========================================= */

function showLetters() {

    numbersKeyboard.classList.add(
        "hidden"
    );

    lettersKeyboard.classList.remove(
        "hidden"
    );

}


lettersButton.addEventListener(
    "click",
    showLetters
);


lettersButtonBottom.addEventListener(
    "click",
    showLetters
);


/* =========================================
   EMOJI PANEL
========================================= */

function openEmojiPanel() {

    emojiPanel.classList.add(
        "active"
    );

}


function closeEmojiPanel() {

    emojiPanel.classList.remove(
        "active"
    );

}


emojiButton.addEventListener(
    "click",
    openEmojiPanel
);


smallEmojiButton.addEventListener(
    "click",
    openEmojiPanel
);


numberEmojiButton.addEventListener(
    "click",
    openEmojiPanel
);


closeEmoji.addEventListener(
    "click",
    closeEmojiPanel
);


/* =========================================
   MOODY EMOJI LIBRARY
========================================= */

/*
   Each sheet contains:

   5 columns
   6 rows

   = 30 emojis per sheet

   3 sheets
   × 30
   = 90 MOODY EMOJIS
*/


const moodyEmojiSheets = [

    "assets/moody-emojis-1.jpg",

    "assets/moody-emojis-2.jpg",

    "assets/moody-emojis-3.jpg"

];


const EMOJIS_PER_ROW = 5;

const EMOJI_ROWS = 6;

const TOTAL_EMOJIS =
    EMOJIS_PER_ROW *
    EMOJI_ROWS;


/* =========================================
   CREATE EMOJI BUTTONS
========================================= */

function createMoodyEmojis() {

    emojiGrid.innerHTML = "";


    moodyEmojiSheets.forEach(
        (sheet, sheetIndex) => {


            for (
                let row = 0;
                row < EMOJI_ROWS;
                row++
            ) {


                for (
                    let column = 0;
                    column < EMOJIS_PER_ROW;
                    column++
                ) {


                    const emoji =
                        document.createElement(
                            "button"
                        );


                    emoji.type = "button";

                    emoji.className =
                        "emoji-item";


                    /*
                       Create the individual
                       emoji from the sprite sheet.
                    */

                    emoji.style.backgroundImage =
                        `url("${sheet}")`;


                    /*
                       Each image is divided
                       into 5 columns and 6 rows.
                    */

                    emoji.style.backgroundSize =
                        `${EMOJIS_PER_ROW * 100}% ${EMOJI_ROWS * 100}%`;


                    const xPosition =
                        column * 25;


                    const yPosition =
                        row * 20;


                    emoji.style.backgroundPosition =
                        `${xPosition}% ${yPosition}%`;


                    emoji.setAttribute(
                        "aria-label",
                        `Moody Emoji ${sheetIndex + 1}-${row + 1}-${column + 1}`
                    );


                    /*
                       When the user taps an emoji,
                       we insert its image into the
                       message area.
                    */

                    emoji.addEventListener(
                        "click",
                        () => {

                            insertMoodyEmoji(
                                sheet,
                                column,
                                row
                            );

                        }
                    );


                    emojiGrid.appendChild(
                        emoji
                    );

                }

            }

        }
    );

}


/* =========================================
   INSERT MOODY EMOJI
========================================= */

function insertMoodyEmoji(
    sheet,
    column,
    row
) {

    focusMessage();


    /*
       Create an image element.
    */

    const image =
        document.createElement(
            "img"
        );


    image.src = sheet;


    image.alt =
        "MOODY KEY emoji";


    /*
       The image itself is clipped
       so only the selected emoji appears.
    */

    image.style.width = "36px";

    image.style.height = "36px";

    image.style.objectFit = "cover";

    image.style.objectPosition =
        `${column * 25}% ${row * 20}%`;


    image.style.verticalAlign =
        "middle";


    image.style.display =
        "inline-block";


    /*
       Insert into message box.
    */

    messageInput.appendChild(
        image
    );


    /*
       Add a small space after
       the emoji.
    */

    insertText(" ");


    /*
       Keep the panel open so the
       user can continue selecting emojis.
    */

}


/* =========================================
   BUILD EMOJI LIBRARY
========================================= */

createMoodyEmojis();


/* =========================================
   SEND BUTTON
========================================= */

sendButton.addEventListener(
    "click",
    () => {

        const message =
            messageInput.innerText.trim();


        if (!message) {

            return;

        }


        alert(
            "MOODY KEY\n\n" +
            message
        );

    }
);


/* =========================================
   KEYBOARD PHYSICAL KEY SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {


        /*
           Don't interfere when the user
           is typing directly in the box.
        */

        if (
            document.activeElement ===
            messageInput
        ) {

            return;

        }


        const key =
            event.key;


        if (
            /^[a-zA-Z]$/.test(key)
        ) {

            insertText(
                isShiftOn
                    ? key.toUpperCase()
                    : key.toLowerCase()
            );

        }


        else if (
            /^[0-9]$/.test(key)
        ) {

            insertText(key);

        }


        else if (
            key === " "
        ) {

            insertText(" ");

        }


        else if (
            key === "Backspace"
        ) {

            deleteLastCharacter();

        }


        else if (
            key === "Enter"
        ) {

            addEnter();

        }

    }
);
