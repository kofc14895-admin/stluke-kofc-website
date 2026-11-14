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
  brandLine1: "St. Luke the Evangelist",     // header lockup, line 1
  brandLine2: "Knights of Columbus",          // header lockup, line 2
  brandSub: "Indianapolis, Indiana \u00b7 Council 14895",
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
  referralCode: "2113492",
  parishUrl: "https://www.stluke.org/",
  stateUrl: "https://indianakofc.org/",
  supremeUrl: "https://www.kofc.org/",

  // Paste the Google Calendar "embed" address here to show the live calendar on the Events page.
  calendarEmbedUrl: "",

  duesAmount: "[dues amount]",

  // "Next event": always the first announcement on the home page (until the Events feed replaces this)
  upcomingTitle: "Stay for Breakfast!",
  upcomingDate: "2027-01-10",      // ISO date; the next-event card hides itself after this day
  upcomingWhen: "Sunday, January 10, 2027",
  upcomingDetail: "After the 7:30 and 9:30 Masses · School cafeteria",
  upcomingNote: "Bring the family. Everyone is welcome; freewill offering.",

  // Announcements: read live from the SAME Google Sheet the Member Center uses.
  // Only rows whose "Show on Public Site" cell says Yes are shown here.
  // Leave sheetId blank and the section stays a placeholder (draft) or hidden (live).
  announcements: {
    sheetId: "1TPuMPjpACtOOeW2uJd8t2ZN3AkMVoKPnKV8gEOKLjLQ", // the Member Center sheet
    gid: "1133674898",              // the Announcements tab (from the address bar: gid=...)
    tab: "Announcements",           // used only if gid is blank
    limit: 3,                       // how many sheet announcements to show on the home page
    columns: {                      // header names in the sheet (not case sensitive)
      type: "Type",                 // shown as a small label, e.g. Event, Reminder
      message: "Message",
      link: "Link",                 // optional
      show: "Public Site?",         // Yes = may appear on this site
      from: "Show From",            // optional: hidden before this date
      through: "Show Through"       // optional: hidden after this date
    }
  },

  // Events: read live from the Activity List sheet. Only rows marked Yes in "Public Site?" appear.
  // Leaders, ways to help and sign-up links are never shown here (those stay in the Member Center).
  events: {
    sheetId: "1MC0MdbocMsO7Sd6wbzlkCggbLOOaek8V4CEmM3woeAM",
    gid: "2034915391",
    tab: "Activity List",           // used only if gid is blank
    pastDays: 60,                   // how long past events stay under "Recently"
    columns: { date: "Date", title: "Activity", type: "Type", description: "Description", show: "Public Site?" }
  },

  // Photos and posters picked in the Member Center ("Website photos" page) are read from the
  // "Website Photos" tab of the same workbook as the Announcements.
  sitePhotos: {
    sheetId: "1TPuMPjpACtOOeW2uJd8t2ZN3AkMVoKPnKV8gEOKLjLQ",
    tab: "Website Photos"
  },

  // Rotating photos and posters on the home page: TEMPORARY test list, used only while the tab above is empty
  // (draft mode) or cannot be read. Delete this list before launch.
  // type: "photo" fills the frame; "poster" shows the whole image. link is optional.
  photos: [
    { src: "poster-sample.jpg", type: "poster", caption: "Stay for Breakfast: Sunday, January 10", link: "events.html" },
    { src: "breakfast.jpg", type: "photo", caption: "Pancake breakfast" },
    { src: "serving.jpg", type: "photo", caption: "Serving at a parish event" },
    { src: "fishfry.jpg", type: "photo", caption: "Lenten fish fry", second: "Fridays in Lent, 5 to 7 pm" },
    { src: "coats.jpg", type: "photo", caption: "Coats for Kids" },
    { src: "faith.jpg", type: "photo", caption: "Faith at St. Luke" }
  ],

  // Reports shown on the News page: PDFs added in the Member Center ("Website reports" page),
  // listed on the "Website Reports" tab of the same workbook as the Announcements.
  reports: {
    sheetId: "1TPuMPjpACtOOeW2uJd8t2ZN3AkMVoKPnKV8gEOKLjLQ",
    tab: "Website Reports",
    limit: 30
  }
};
