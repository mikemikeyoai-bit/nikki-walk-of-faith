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
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => {
                console.error("Service worker registration failed:", error);
            });
    });
}