# St. Luke KofC Council #14895: public website (draft)

A plain static site (HTML, CSS, a little JavaScript). No build step, no WordPress, no database.
It works on GitHub Pages the same way the Member Center does.

## What is here

| File | What it is |
|---|---|
| `index.html`, `about.html`, `what-we-do.html`, `events.html`, `news.html`, `join.html`, `support.html`, `members.html`, `404.html` | The pages |
| `config.js` | **Every setting in one place**: meeting time, emails, links, news, Square shop address |
| `site.js` | Builds the shared header and footer on every page and fills in values from `config.js` |
| `site.css` | All styling (navy, gold and cream, to match the recruiting brochure) |
| `` | Photos: church interior (home hero), breakfast, Coats for Kids, serving, crucifix and tabernacle (home page), statue (About) |
| `index-previous.html.bak` | The earlier home page, kept as a backup. Safe to delete |
| `robots.txt`, `<meta name="robots">` | Keep search engines out while this is a draft |

## Preview on your computer

```
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening the files by double-click also works for most pages.)

## Deploy to GitHub Pages

1. In the council GitHub account, create a new repository (suggested name: `stluke-site`).
2. Upload everything in this folder to the repository's main branch, including the hidden `.nojekyll` file.
3. Settings, then Pages: deploy from branch `main`, folder `/ (root)`.
4. The draft appears at `https://<account>.github.io/stluke-site/`.

Keep the Member Center in its own repository. This site only links to it.

## Edit without touching the pages

Open `config.js`. Change the text between the quotes and save.

- **Square shop:** `squareShopUrl`. Both "Pay dues" and "Donate" buttons use it. Replace it with direct links to the dues and donation items later if you like.
- **Member Center:** `memberCenterUrl`.
- **Meeting time and place, rosary time:** `meeting`, `meetingPlace`, `rosary`. Meetings are for members, so the public pages no longer show these.
- **Role emails:** `emailGrandKnight`, `emailMembership`, `emailFinancialSecretary`. Create these as Google Groups on kofc14895.org before launch.
- **Join page referral code:** `referralCode`. Confirm it is council-wide before publishing it.
- **Announcements (home page and News):** read live from the Member Center's Google Sheet. In `config.js` set `announcements.sheetId` (the long code in the sheet's address) and `tab`. In the Member Center's announcements tab add a column named **Show on Public Site** and type Yes on the rows that may appear here. Column names are set under `announcements.columns`. Note: anyone who knows the sheet ID can read the whole tab, so keep anything truly private out of it.
- **Live calendar:** paste the Google Calendar embed address into `calendarEmbedUrl`.
- **News:** add an entry at the top of `news`.
- **"Coming up next" strip on the home page:** `upcomingTitle`, `upcomingWhen`, `upcomingDetail`, `upcomingNote`. Update it after each event.

Text inside the page files that still shows [brackets] (officer names, event dates, dues amount) is edited in the page itself.

## Before launch

1. Fill in or remove every [bracketed] item.
2. Confirm each program on What We Do with the Program Director, then delete the `<span class="confirm">` tags.
3. Set `draft: false` in `config.js`.
4. Remove `<meta name="robots" content="noindex, nofollow">` from each page's `<head>`.
5. Replace `robots.txt` with the allow version shown inside it.
6. Photos of identifiable people, especially the children in the Coats for Kids photo: confirm the council and the school have permission to publish them. Old posts that name people or ask for prayers stay in the private archive.

## Custom domain (later)

When stlukekofc.org is ready to move: add a file named `CNAME` containing `stlukekofc.org`, set the domain in Settings, Pages, and point DNS at GitHub Pages. Keep the WordPress hosting until the new site is tested.

## Notes

- Sign-in never happens on this site. The Members page only links to the Member Center.
- No member data is stored here. Keep it that way: sheet IDs, tokens and member lists do not belong in this repository.
- The Join form opens the visitor's email app with a prepared message to the Membership Director. It does not send or store anything.

- Hidden for now: **Support Us** (`support.html` is still in the folder but not linked; dues are paid through the Member Center). To bring it back, add `["Support Us", "support.html"]` to the menu list in `site.js`.
- Removed: the Volunteer and Contact pages. Volunteering goes through membership, and contact addresses are in the footer.
