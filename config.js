/* ------------------------------------------------------------------
   St. Luke KofC public site: settings in ONE place.
   Edit this file to change contact details, links and news.
   Anything in [brackets] is a placeholder that still needs a real value.
   ------------------------------------------------------------------ */
window.SITE = {
  // Set to false at launch: hides the draft banner and "to confirm" tags.
  // (Also remove the noindex <meta> tag from each page and edit robots.txt. See README.)
  draft: true,

  councilName: "St. Luke Knights of Columbus",
  councilNumber: "14895",
  parishName: "St. Luke Catholic Church",
  address1: "7575 Holliday Drive East",
  city: "Indianapolis, IN 46260",

  // Members-only details. Not shown on the public site (meetings are for members).
  meeting: "[Meeting day and time]",
  meetingPlace: "[Room], St. Luke Catholic Church",
  rosary: "[Rosary time]",
  membershipDirector: "[Membership Director name]",
  grandKnightName: "[Grand Knight name]",

  // Role-based addresses (create these as Google Groups/aliases on kofc14895.org)
  emailGrandKnight: "grandknight@kofc14895.org",
  emailMembership: "membership@kofc14895.org",
  emailFinancialSecretary: "financialsec@kofc14895.org",

  // Links
  memberCenterUrl: "https://members.kofc14895.org/",
  squareShopUrl: "https://knights-of-columbus-14895.square.site/", // placeholder: points at the council's Square store
  kofcJoinUrl: "https://www.kofc.org/join",
  referralCode: "[referral code]",
  parishUrl: "https://www.stluke.org/",
  stateUrl: "https://indianakofc.org/",
  supremeUrl: "https://www.kofc.org/",

  // Paste the Google Calendar "embed" address here to show the live calendar on the Events page.
  calendarEmbedUrl: "",

  duesAmount: "[dues amount]",

  // "Coming up next" strip on the home page
  upcomingTitle: "Stay for Breakfast!",
  upcomingWhen: "Sunday, January 10, 2027",
  upcomingDetail: "After the 7:30 and 9:30 Masses · School cafeteria",
  upcomingNote: "Bring the family. Everyone is welcome; freewill offering.",

  // Announcements: read live from the SAME Google Sheet the Member Center uses.
  // Only rows whose "Show on Public Site" cell says Yes are shown here.
  // Leave sheetId blank and the section stays a placeholder (draft) or hidden (live).
  announcements: {
    sheetId: "",                    // the Member Center sheet's ID (long code in its address)
    tab: "Announcements",           // the tab name that holds announcements
    limit: 3,                       // how many to show on the home page
    columns: {                      // header names in the sheet (not case sensitive)
      date: "Date",
      title: "Title",
      message: "Message",
      link: "Link",                 // optional
      show: "Show on Public Site"   // the new column: Yes / No
    }
  },

  // Rotating photos and posters on the home page (TEMPORARY test list; later fed from the Member Center picker).
  // type: "photo" fills the frame; "poster" shows the whole image. link is optional.
  photos: [
    { src: "poster-sample.jpg", type: "poster", caption: "Stay for Breakfast: Sunday, January 10", link: "events.html" },
    { src: "breakfast.jpg", type: "photo", caption: "Pancake breakfast" },
    { src: "serving.jpg", type: "photo", caption: "Serving at a parish event" },
    { src: "fishfry.jpg", type: "photo", caption: "Lenten fish fry" },
    { src: "coats.jpg", type: "photo", caption: "Coats for Kids" },
    { src: "faith.jpg", type: "photo", caption: "Faith at St. Luke" }
  ],

  // Latest news (newest first). Add a url to link a headline somewhere.
  news: [
    { date: "2025-12-03", title: "November Quarterly Grand Knight Report", summary: "The Grand Knight's quarterly update to the council.", url: "" },
    { date: "2025-08-21", title: "Grillin' Knights", summary: "The St. Luke Fall Festival and how Knights can help.", url: "" }
  ]
};
