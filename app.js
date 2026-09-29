const verses = [
    {
        text: "Though my father and mother forsake me, the Lord will receive me.",
        reference: "Psalm 27:10"
    },
    {
        text: "Hatred stirs up strife, but love covers all offenses.",
        reference: "Proverbs 10:12 ESV"
    },
    {
        text: "For his anger is but for a moment, and his favor is for a lifetime. Weeping may tarry for the night, but joy comes with the morning.",
        reference: "Psalm 30:5 ESV"
    },
    {
        text: "As far as the east is from the west, so far does he remove our transgressions from us.",
        reference: "Psalm 103:12 ESV"
    },
    {
        text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.",
        reference: "Psalm 73:26 ESV"
    },
    {
        text: "Set a guard over my mouth, LORD; keep watch over the door of my lips. Do not let my heart be drawn to what is evil so that I take part in wicked deeds along with those who are evildoers; do not let me eat their delicacies.",
        reference: "Psalm 141:3–4 NIV11"
    },
    {
        text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.",
        reference: "Joshua 1:9 ESV"
    },
    {
        text: "Behold, blessed is the one whom God reproves; therefore despise not the discipline of the Almighty.",
        reference: "Job 5:17 ESV"
    },
    {
        text: "So we can confidently say, “The Lord is my helper; I will not fear; what can man do to me?”",
        reference: "Hebrews 13:6 ESV"
    },
    {
        text: "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace.",
        reference: "Ephesians 1:7 ESV"
    },
    {
        text: "And I heard the voice of the Lord saying, “Whom shall I send, and who will go for us?” Then I said, “Here I am! Send me.”",
        reference: "Isaiah 6:8 ESV"
    },
    {
        text: "So if the Son sets you free, you will be free indeed.",
        reference: "John 8:36 NIV11"
    },
    {
        text: "For we live by faith, not by sight.",
        reference: "2 Corinthians 5:7 NIV11"
    },
    {
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        reference: "Matthew 11:28 NIV11"
    },
    {
        text: "But I tell you, love your enemies and pray for those who persecute you.",
        reference: "Matthew 5:44 NIV11"
    }
];
const verseText = document.querySelector("#verse-text");
const verseReference = document.querySelector("#verse-reference");
const verseButton = document.querySelector("#new-verse");

let currentVerseIndex;

// Choose the same starting verse for everyone on the same calendar day.
function getDailyVerseIndex() {
    const today = new Date();

    const dateString =
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    let number = 0;

    for (let i = 0; i < dateString.length; i++) {
        number += dateString.charCodeAt(i);
    }

    return number % verses.length;
}

function displayVerse(index) {
    currentVerseIndex = index;

    const verse = verses[index];

    verseText.textContent = `“${verse.text}”`;
    verseReference.textContent = verse.reference;
}

function showAnotherVerse() {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * verses.length);
    } while (newIndex === currentVerseIndex);

    displayVerse(newIndex);
}

// Show today's verse when the app opens.
displayVerse(getDailyVerseIndex());

// Allow Nikki to browse another verse.
verseButton.addEventListener("click", showAnotherVerse);
// =========================================
// BLESSINGS & MEMORIES SLIDESHOW
// =========================================

const memoryPhotos = [
    "images/slideshow/photo-01.jpg",
    "images/slideshow/photo-02.jpg",
    "images/slideshow/photo-03.jpg",
    "images/slideshow/photo-04.jpg",
    "images/slideshow/photo-05.jpg",
    "images/slideshow/photo-06.jpg",
    "images/slideshow/photo-07.jpg",
    "images/slideshow/photo-08.jpg",
    "images/slideshow/photo-09.jpg",
    "images/slideshow/photo-10.jpg",
    "images/slideshow/photo-11.jpg",
    "images/slideshow/photo-12.jpg",
    "images/slideshow/photo-13.jpg"
];

const memoryPhoto = document.querySelector("#memory-photo");
const previousSlideButton = document.querySelector("#prev-slide");
const nextSlideButton = document.querySelector("#next-slide");
const currentSlideDisplay = document.querySelector("#current-slide");
const totalSlidesDisplay = document.querySelector("#total-slides");
const slideshowToggle = document.querySelector("#slideshow-toggle");
const memorySlideshow = document.querySelector("#memory-slideshow");

let currentMemoryIndex = 0;
let slideshowTimer;
let slideshowPlaying = true;

const SLIDESHOW_DELAY = 7000;

totalSlidesDisplay.textContent = memoryPhotos.length;


// Display a particular photograph
function showMemory(index) {

    // Loop around at either end
    if (index >= memoryPhotos.length) {
        index = 0;
    }

    if (index < 0) {
        index = memoryPhotos.length - 1;
    }

    currentMemoryIndex = index;

    // Fade out
    memoryPhoto.style.opacity = "0";

    setTimeout(() => {
        memoryPhoto.src = memoryPhotos[currentMemoryIndex];

        currentSlideDisplay.textContent =
            currentMemoryIndex + 1;

        // Fade back in after changing image
        memoryPhoto.style.opacity = "1";
    }, 250);
}


// Move forward
function nextMemory() {
    showMemory(currentMemoryIndex + 1);
}


// Move backward
function previousMemory() {
    showMemory(currentMemoryIndex - 1);
}


// Start automatic slideshow
function startSlideshow() {

    clearInterval(slideshowTimer);

    if (!slideshowPlaying) {
        return;
    }

    slideshowTimer = setInterval(() => {
        nextMemory();
    }, SLIDESHOW_DELAY);
}


// Restart timer after manual navigation
function restartSlideshow() {

    if (slideshowPlaying) {
        startSlideshow();
    }
}


// Arrow controls
nextSlideButton.addEventListener("click", () => {
    nextMemory();
    restartSlideshow();
});

previousSlideButton.addEventListener("click", () => {
    previousMemory();
    restartSlideshow();
});


// Pause / Play
slideshowToggle.addEventListener("click", () => {

    slideshowPlaying = !slideshowPlaying;

    if (slideshowPlaying) {

        slideshowToggle.textContent = "❚❚ Pause";
        startSlideshow();

    } else {

        slideshowToggle.textContent = "▶ Play";
        clearInterval(slideshowTimer);
    }
});


// =========================================
// SWIPE CONTROLS
// =========================================

let touchStartX = 0;
let touchEndX = 0;

memorySlideshow.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

memorySlideshow.addEventListener("touchend", event => {

    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    // Ignore tiny movements
    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance < 0) {
        nextMemory();
    } else {
        previousMemory();
    }

    restartSlideshow();
});


// Begin automatic slideshow
startSlideshow();

// =========================================
// FULLSCREEN MEMORY VIEWER
// =========================================

const photoViewer = document.querySelector("#photo-viewer");
const viewerPhoto = document.querySelector("#viewer-photo");
const viewerClose = document.querySelector("#viewer-close");
const viewerPrevious = document.querySelector("#viewer-prev");
const viewerNext = document.querySelector("#viewer-next");

let slideshowWasPlaying = false;


// Open enlarged photograph
function openPhotoViewer() {

    slideshowWasPlaying = slideshowPlaying;

    // Temporarily stop automatic movement
    clearInterval(slideshowTimer);

    viewerPhoto.src = memoryPhotos[currentMemoryIndex];

    photoViewer.classList.add("open");
    photoViewer.setAttribute("aria-hidden", "false");

    // Prevent page scrolling behind viewer
    document.body.style.overflow = "hidden";
}


// Close enlarged photograph
function closePhotoViewer() {

    photoViewer.classList.remove("open");
    photoViewer.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Resume only if slideshow was playing before
    if (slideshowWasPlaying) {
        startSlideshow();
    }
}


// Tap photograph to enlarge
memoryPhoto.addEventListener("click", openPhotoViewer);


// X button
viewerClose.addEventListener("click", closePhotoViewer);


// Tap dark background to close
photoViewer.addEventListener("click", event => {

    if (event.target === photoViewer) {
        closePhotoViewer();
    }
});

// =========================================
// FULLSCREEN VIEWER NAVIGATION
// =========================================

function showViewerMemory(index) {

    if (index >= memoryPhotos.length) {
        index = 0;
    }

    if (index < 0) {
        index = memoryPhotos.length - 1;
    }

    currentMemoryIndex = index;

    // Update fullscreen photograph
    viewerPhoto.src = memoryPhotos[currentMemoryIndex];

    // Keep regular slideshow synchronized
    memoryPhoto.src = memoryPhotos[currentMemoryIndex];

    currentSlideDisplay.textContent =
        currentMemoryIndex + 1;
}


// Fullscreen arrow buttons

viewerNext.addEventListener("click", event => {

    event.stopPropagation();

    showViewerMemory(currentMemoryIndex + 1);
});


viewerPrevious.addEventListener("click", event => {

    event.stopPropagation();

    showViewerMemory(currentMemoryIndex - 1);
});


// =========================================
// FULLSCREEN SWIPE CONTROLS
// =========================================

let viewerTouchStartX = 0;
let viewerTouchEndX = 0;


photoViewer.addEventListener("touchstart", event => {

    viewerTouchStartX =
        event.changedTouches[0].screenX;

}, { passive: true });


photoViewer.addEventListener("touchend", event => {

    viewerTouchEndX =
        event.changedTouches[0].screenX;

    const viewerSwipeDistance =
        viewerTouchEndX - viewerTouchStartX;

    // Ignore taps and tiny movements
    if (Math.abs(viewerSwipeDistance) < 50) {
        return;
    }

    if (viewerSwipeDistance < 0) {

        // Swipe left = next photograph
        showViewerMemory(currentMemoryIndex + 1);

    } else {

        // Swipe right = previous photograph
        showViewerMemory(currentMemoryIndex - 1);
    }
});

// Escape key for desktop
document.addEventListener("keydown", event => {

    if (event.key === "Escape" &&
        photoViewer.classList.contains("open")) {

        closePhotoViewer();
    }
});

// =========================================
// APP NAVIGATION
// =========================================

const appScreens = document.querySelectorAll(".app-screen");
const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetScreen =
            button.getAttribute("data-screen");

        // Hide all screens
        appScreens.forEach(screen => {
            screen.classList.remove("active-screen");
        });

        // Remove active state from all nav buttons
        navButtons.forEach(navButton => {
            navButton.classList.remove("active-nav");
        });

        // Show selected screen
        document
            .getElementById(targetScreen)
            .classList.add("active-screen");

        // Highlight selected navigation button
        button.classList.add("active-nav");

        // Start each screen at the top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// =========================================
// DAILY REFLECTION
// =========================================

const dailyReflections = [
    `The enemy wants your wounds to become your identity.
God wants them to become your testimony.`,

    `Seeing me today, you would never know that I was once addicted, homeless, and hopeless.

God fixed that.`,

    `The more you fill your mind with God's Word, the less room there is for the enemy to fill it with anxiety, lies, fear, worry, and temptation.`,

    `I've seen Him change my heart, renew my mind, strengthen my faith, and give me a peace I cannot explain.

I don't just believe in Jesus.
I've experienced Him.`,

    `The enemy lost when your wounds became your testimony and not your identity.`,

    `I know Jesus is real because I've seen the difference between me with Him and me without Him.`,

    `May Jesus be seen in me in spite of me.`,

    `One day, you will realize that some of the most beautiful people have had an ugly past, but God has restored them.

And now, they stand as living proof that God restores, heals, and makes all things new.`,

    `Forgive anyone immediately...
the devil won't have a chance to keep a shadow in your heart.

— Corrie ten Boom`,

    `The love of Jesus doesn't wait at the finish line. It meets you in the wreckage and walks you home.`,

    `Little ways I can tell Jesus is changing me...

• I apologize faster.
• I don't need the last word as much.
• I notice my own sin before someone else's.
• I care less about proving myself right.
• I forgive things I once thought I never could.
• I'm more uncomfortable staying the same.
• I want Jesus more than I want to be right.`,

    `God, please lay an extra hand on my goals and plans.

Let them align to Yours.`,

    `God has loved me through versions of myself I'm glad don't exist anymore.`,

    `Every time I don't know how I'm gonna do something...

God shows up.`,

    `Thank you Jesus for loving me enough to not leave me as I was.

Thank you for the heart of flesh that has replaced my heart of stone.

Thank you for the convictions that bring me closer to you.

Thank you for the blood.

Thank you.`,

    `I won't force you to believe what I believe.

I post about God because I'm broken and I need Him to carry me every day. Not because I'm good.

But I'd be a bad friend if I never told you about Jesus.

I want to see you make it home.`
];


// =========================================
// TRUE DAILY REFLECTION
// =========================================

function showDailyReflection() {

    const reflectionElement =
        document.getElementById("dailyReflection");

    const dateElement =
        document.getElementById("reflectionDate");

    if (!reflectionElement || !dateElement) {
        return;
    }

    const today = new Date();

    /*
       Create a number representing today's
       LOCAL calendar date.

       Using Date.UTC here avoids daylight-saving
       time causing an accidental skipped/repeated
       reflection.
    */
    const dayNumber = Math.floor(
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ) / 86400000
    );

    /*
       Pick one reflection based entirely
       on today's date.
    */
    const reflectionIndex =
        dayNumber % dailyReflections.length;

    reflectionElement.textContent =
        dailyReflections[reflectionIndex];


    // Display today's date
    dateElement.textContent =
        today.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
}


// Load today's reflection
showDailyReflection();

// ==========================================
// PRIVATE JOURNAL
// ==========================================

const journalDate = document.getElementById("journalEntryDate");
const journalEntry = document.getElementById("journalEntry");
const saveJournalEntry = document.getElementById("saveJournalEntry");
const journalSaveStatus = document.getElementById("journalSaveStatus");

// Today's local date
const today = new Date();

const journalDateKey =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

// Pretty date shown to Nikki
journalDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
});

// Load today's entry if one already exists
const journalEntries =
    JSON.parse(localStorage.getItem("nikkiJournalEntries")) || {};

if (journalEntries[journalDateKey]) {
    journalEntry.value = journalEntries[journalDateKey];
}

// Save today's entry
saveJournalEntry.addEventListener("click", () => {

    const entries =
        JSON.parse(localStorage.getItem("nikkiJournalEntries")) || {};

    entries[activeJournalDateKey] = journalEntry.value;

    localStorage.setItem(
        "nikkiJournalEntries",
        JSON.stringify(entries)
    );

    saveJournalEntry.textContent = "✓ Saved";

    setTimeout(() => {
        saveJournalEntry.textContent = "Save Entry";
    }, 1500);
});

// =========================================
// JOURNAL CALENDAR
// =========================================

const openJournalCalendar =
    document.getElementById("openJournalCalendar");

const journalCalendarOverlay =
    document.getElementById("journalCalendarOverlay");

const closeJournalCalendar =
    document.getElementById("closeJournalCalendar");

const previousCalendarMonth =
    document.getElementById("previousCalendarMonth");

const nextCalendarMonth =
    document.getElementById("nextCalendarMonth");

const calendarMonthTitle =
    document.getElementById("calendarMonthTitle");

const calendarDays =
    document.getElementById("calendarDays");

const journalEntryTitle =
    document.getElementById("journalEntryTitle");

const returnToToday =
    document.getElementById("returnToToday");


// Calendar starts on the current month
let calendarYear = today.getFullYear();
let calendarMonth = today.getMonth();

// Date currently being viewed in the journal
let activeJournalDateKey = journalDateKey;


// Create YYYY-MM-DD without timezone problems
function createJournalDateKey(year, month, day) {

    return (
        year +
        "-" +
        String(month + 1).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0")
    );
}


// =========================================
// BUILD CALENDAR
// =========================================

function renderJournalCalendar() {

    calendarDays.innerHTML = "";

    const entries =
        JSON.parse(
            localStorage.getItem("nikkiJournalEntries")
        ) || {};


    // Calendar heading
    const monthDate =
        new Date(calendarYear, calendarMonth, 1);

    calendarMonthTitle.textContent =
        monthDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });


    // Which weekday does the month begin on?
    const firstDay =
        new Date(
            calendarYear,
            calendarMonth,
            1
        ).getDay();


    // How many days are in this month?
    const daysInMonth =
        new Date(
            calendarYear,
            calendarMonth + 1,
            0
        ).getDate();


    // Empty spaces before day 1
    for (let i = 0; i < firstDay; i++) {

        const emptySpace =
            document.createElement("span");

        calendarDays.appendChild(emptySpace);
    }


    // Create each calendar day
    for (let day = 1; day <= daysInMonth; day++) {

        const dateKey =
            createJournalDateKey(
                calendarYear,
                calendarMonth,
                day
            );

        const dayButton =
            document.createElement("button");

        dayButton.className = "calendar-day";
        dayButton.textContent = day;


        // Mark today
        if (dateKey === journalDateKey) {
            dayButton.classList.add("today");
        }


        // Only dates with actual text count as entries
        if (
            entries[dateKey] &&
            entries[dateKey].trim() !== ""
        ) {

            dayButton.classList.add("has-entry");

            dayButton.addEventListener(
                "click",
                () => loadJournalEntry(dateKey)
            );
        }


        calendarDays.appendChild(dayButton);
    }
}


// =========================================
// LOAD AN OLD JOURNAL ENTRY
// =========================================

function loadJournalEntry(dateKey) {

    const entries =
        JSON.parse(
            localStorage.getItem("nikkiJournalEntries")
        ) || {};

    if (!entries[dateKey]) {
        return;
    }


    activeJournalDateKey = dateKey;

    journalEntry.value = entries[dateKey];


    // Convert YYYY-MM-DD safely to a local date
    const [year, month, day] =
        dateKey.split("-").map(Number);

    const entryDate =
        new Date(year, month - 1, day);


    journalEntryTitle.textContent =
        "Journal Entry";

    journalDate.textContent =
        entryDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });


    returnToToday.hidden = false;

    journalSaveStatus.textContent = "";

    closeJournalCalendarOverlay();
}


// =========================================
// RETURN TO TODAY
// =========================================

function loadTodayJournalEntry() {

    const entries =
        JSON.parse(
            localStorage.getItem("nikkiJournalEntries")
        ) || {};

    activeJournalDateKey = journalDateKey;

    journalEntryTitle.textContent =
        "Today's Entry";

    journalDate.textContent =
        today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

    journalEntry.value =
        entries[journalDateKey] || "";

    returnToToday.hidden = true;

    journalSaveStatus.textContent = "";
}


returnToToday.addEventListener(
    "click",
    loadTodayJournalEntry
);


// =========================================
// OPEN / CLOSE CALENDAR
// =========================================

function openJournalCalendarOverlay() {

    // Always begin on the month being viewed
    const [year, month] =
        activeJournalDateKey
            .split("-")
            .map(Number);

    calendarYear = year;
    calendarMonth = month - 1;

    renderJournalCalendar();

    journalCalendarOverlay.classList.add("open");

    journalCalendarOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


function closeJournalCalendarOverlay() {

    journalCalendarOverlay.classList.remove("open");

    journalCalendarOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


openJournalCalendar.addEventListener(
    "click",
    openJournalCalendarOverlay
);

closeJournalCalendar.addEventListener(
    "click",
    closeJournalCalendarOverlay
);


// Tap the dark background to close
journalCalendarOverlay.addEventListener(
    "click",
    event => {

        if (event.target === journalCalendarOverlay) {
            closeJournalCalendarOverlay();
        }
    }
);


// =========================================
// CHANGE MONTH
// =========================================

previousCalendarMonth.addEventListener(
    "click",
    () => {

        calendarMonth--;

        if (calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear--;
        }

        renderJournalCalendar();
    }
);


nextCalendarMonth.addEventListener(
    "click",
    () => {

        calendarMonth++;

        if (calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear++;
        }

        renderJournalCalendar();
    }
);

// =========================================
// JOURNAL BACKUP & RESTORE
// =========================================

const backupJournal =
    document.getElementById("backupJournal");

const restoreJournal =
    document.getElementById("restoreJournal");

const journalBackupFile =
    document.getElementById("journalBackupFile");

const journalBackupStatus =
    document.getElementById("journalBackupStatus");


// =========================================
// BACKUP JOURNAL
// =========================================

backupJournal.addEventListener("click", () => {

    const entries =
        JSON.parse(
            localStorage.getItem("nikkiJournalEntries")
        ) || {};

    if (Object.keys(entries).length === 0) {

        journalBackupStatus.textContent =
            "There are no journal entries to back up yet.";

        return;
    }


    const backup = {
        type: "nikki-journal-backup",
        version: 1,
        created: new Date().toISOString(),
        entries: entries
    };


    const file =
        new Blob(
            [JSON.stringify(backup, null, 2)],
            { type: "application/json" }
        );


    const url =
        URL.createObjectURL(file);

    const downloadLink =
        document.createElement("a");

    const date =
        new Date();

    const fileDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");


    downloadLink.href = url;

    downloadLink.download =
        "Nikki-Journal-Backup-" +
        fileDate +
        ".json";


    document.body.appendChild(downloadLink);

    downloadLink.click();

    downloadLink.remove();

    URL.revokeObjectURL(url);


    journalBackupStatus.textContent =
        "✓ Journal backup created.";
});


// =========================================
// CHOOSE BACKUP TO RESTORE
// =========================================

restoreJournal.addEventListener("click", () => {

    journalBackupFile.value = "";

    journalBackupFile.click();
});


// =========================================
// RESTORE JOURNAL
// =========================================

journalBackupFile.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload = () => {

            try {

                const backup =
                    JSON.parse(reader.result);


                // Make sure this is one of our backups
                if (
                    backup.type !==
                    "nikki-journal-backup" ||

                    !backup.entries ||

                    typeof backup.entries !== "object"
                ) {

                    throw new Error(
                        "Invalid journal backup."
                    );
                }


                const currentEntries =
                    JSON.parse(
                        localStorage.getItem(
                            "nikkiJournalEntries"
                        )
                    ) || {};


                // Merge backup with existing journal
                const mergedEntries = {
                    ...backup.entries,
                    ...currentEntries
                };


                localStorage.setItem(
                    "nikkiJournalEntries",
                    JSON.stringify(mergedEntries)
                );


                journalBackupStatus.textContent =
                    "✓ Journal restored successfully.";


                // Refresh whichever entry is currently open
                if (
                    mergedEntries[
                        activeJournalDateKey
                    ]
                ) {

                    journalEntry.value =
                        mergedEntries[
                            activeJournalDateKey
                        ];

                }


                // Refresh calendar data
                renderJournalCalendar();


            } catch (error) {

                journalBackupStatus.textContent =
                    "That file could not be restored.";
            }

        };


        reader.readAsText(file);
    }
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => {
                console.error("Service worker registration failed:", error);
            });
    });
}
