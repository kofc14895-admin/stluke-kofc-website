/* Shared header, footer and small helpers. Reads settings from config.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  var NAV = [
    ["Home", "index.html"],
    ["About", "about.html"],
    ["What We Do", "what-we-do.html"],
    ["Events", "events.html"],
    ["Join Us", "join.html"]
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function shield(size) {
    return '<svg width="' + size + '" height="' + Math.round(size * 1.17) + '" viewBox="0 0 36 42" aria-hidden="true" focusable="false">' +
      '<path d="M18 2 L33 8 V21 C33 31 26 37 18 40 C10 37 3 31 3 21 V8 Z" fill="#0E2456"/>' +
      '<path d="M18 11 V31 M10 18 H26" stroke="#D4A94B" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
  }

  function header() {
    var links = NAV.map(function (n) {
      var current = n[1].toLowerCase() === here || (here === "" && n[1] === "index.html");
      return '<li><a href="' + n[1] + '"' + (current ? ' aria-current="page"' : "") + ">" + esc(n[0]) + "</a></li>";
    }).join("");

    var banner = S.draft
      ? '<div class="draft-banner" role="note">Draft for review. Items in [brackets] or marked &ldquo;to confirm&rdquo; are not final.</div>'
      : "";

    return banner +
      '<div class="topbar"><div class="container topbar-inner">' +
        "<span>Council #" + esc(S.councilNumber) + " &middot; " + esc(S.parishName) + ", Indianapolis</span>" +
        '<a class="btn btn-gold btn-sm" href="members.html">Member sign-in</a>' +
      "</div></div>" +
      '<header class="site-header"><div class="container header-inner">' +
        '<a class="brand" href="index.html">' + shield(34) +
          '<span class="brand-text"><span class="brand-name">' + esc(S.councilName) + "</span>" +
          '<span class="brand-sub">COUNCIL #' + esc(S.councilNumber) + "</span></span></a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
        '<nav id="site-nav" class="site-nav" aria-label="Main"><ul>' + links + "</ul></nav>" +
      "</div></header>";
  }

  function footer() {
    return '<footer class="site-footer"><div class="container footer-grid">' +
      '<div><h2 class="footer-h">Find us</h2>' +
        "<p>" + esc(S.parishName) + "<br>" + esc(S.address1) + "<br>" + esc(S.city) + "</p></div>" +
      '<div><h2 class="footer-h">Contact</h2><p>' +
        '<a href="mailto:' + esc(S.emailGrandKnight) + '">' + esc(S.emailGrandKnight) + "</a><br>" +
        '<a href="mailto:' + esc(S.emailMembership) + '">' + esc(S.emailMembership) + "</a><br>" +
        '<a href="mailto:' + esc(S.emailFinancialSecretary) + '">' + esc(S.emailFinancialSecretary) + "</a></p></div>" +
      '<div><h2 class="footer-h">Links</h2><p>' +
        '<a href="' + esc(S.parishUrl) + '" rel="noopener">St. Luke Catholic Church</a><br>' +
        '<a href="' + esc(S.stateUrl) + '" rel="noopener">Indiana State Council</a><br>' +
        '<a href="' + esc(S.supremeUrl) + '" rel="noopener">Supreme Council</a><br>' +
        '<a href="news.html">News</a></p></div>' +
      "</div>" +
      '<div class="container footer-legal">&copy; ' + new Date().getFullYear() + " " + esc(S.councilName) + ", Council #" + esc(S.councilNumber) + "</div></footer>";
  }

  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  function newsHtml(limit) {
    var items = (S.news || []).slice(0, limit || 99);
    if (!items.length) return "<p>No news yet.</p>";
    return items.map(function (n) {
      var title = n.url
        ? '<a href="' + esc(n.url) + '">' + esc(n.title) + "</a>"
        : esc(n.title);
      return '<article class="news-item"><p class="news-date">' + esc(fmtDate(n.date)) + "</p>" +
        '<h3 class="news-title">' + title + "</h3><p>" + esc(n.summary || "") + "</p></article>";
    }).join("");
  }


  // ---- Announcements: live from the Member Center's Google Sheet (gviz JSONP) ----
  function truthy(v) {
    if (v === true) return true;
    return /^(y|yes|true|x|1)$/i.test(String(v == null ? "" : v).trim());
  }
  function cellDate(cell) {
    if (!cell || cell.v == null || cell.v === "") return null;
    var v = cell.v, m = /^Date\((\d+),(\d+),(\d+)/.exec(String(v));
    var d = m ? new Date(+m[1], +m[2], +m[3]) : new Date(v);
    return isNaN(d) ? null : d;
  }
  function nextEventHtml() {
    if (!S.upcomingTitle) return "";
    if (S.upcomingDate) {
      var d = new Date(S.upcomingDate + "T23:59:59");
      if (!isNaN(d) && d < new Date()) return "";
    }
    return '<article class="announce-item announce-next"><p class="announce-type">Next event</p>' +
      '<h3 class="news-title">' + esc(S.upcomingTitle) + "</h3>" +
      "<p><strong>" + esc(S.upcomingWhen || "") + "</strong>" + (S.upcomingDetail ? " &middot; " + esc(S.upcomingDetail) : "") + "</p>" +
      (S.upcomingNote ? "<p>" + esc(S.upcomingNote) + "</p>" : "") +
      '<p><a class="text-link" href="events.html">All events &rarr;</a></p></article>';
  }
  function annHtml(items, limit) {
    return items.slice(0, limit).map(function (a) {
      var link = /^https?:/i.test(a.link || "") ? ' <a class="text-link" href="' + esc(a.link) + '" target="_blank" rel="noopener">More &rarr;</a>' : "";
      return '<article class="announce-item">' + (a.type ? '<p class="announce-type">' + esc(a.type) + "</p>" : "") +
        "<p>" + esc(a.message).replace(/\n/g, "<br>") + link + "</p></article>";
    }).join("");
  }
  function loadAnnouncements(box) {
    var A = S.announcements || {}, cols = A.columns || {};
    var limit = parseInt(box.getAttribute("data-limit"), 10) || A.limit || 3;
    var pinned = box.hasAttribute("data-next-event") ? nextEventHtml() : "";
    var section = box.closest("section");
    var done = false;
    function show(items, failed) {
      if (done) return; done = true;
      var html = pinned + annHtml(items, limit);
      if (!html && S.draft) {
        html = '<div class="placeholder-box"><p style="margin:0"><strong>No announcements to show right now.</strong> ' +
          (A.sheetId ? "Mark a row Yes in the &ldquo;Public Site?&rdquo; column of the Announcements tab." : "Set <code>announcements.sheetId</code> in <code>config.js</code>.") + "</p></div>";
      }
      if (failed && S.draft) html += '<p class="figure-note draft-only">Draft note: the Announcements tab could not be read. Check that the sheet can be viewed without signing in.</p>';
      if (html) box.innerHTML = html;
      else if (section) section.style.display = "none";
    }
    if (!A.sheetId) { show([]); return; }
    var cb = "__annCb" + Date.now();
    var timer = setTimeout(function () { show([], true); }, 20000);
    window[cb] = function (r) {
      clearTimeout(timer);
      var items = [], failed = false;
      try {
        if (r.status && r.status !== "ok") throw new Error("gviz");
        var labels = (r.table.cols || []).map(function (c) { return String(c.label || "").trim().toLowerCase(); });
        var idx = function (name) { return labels.indexOf(String(name || "").trim().toLowerCase()); };
        var iT = idx(cols.type), iM = idx(cols.message), iL = idx(cols.link), iS = idx(cols.show), iF = idx(cols.from), iX = idx(cols.through);
        var now = new Date();
        (r.table.rows || []).forEach(function (row) {
          var c = row.c || [];
          var val = function (i) { return i >= 0 && c[i] && c[i].v != null ? c[i].v : ""; };
          if (iS < 0 || !truthy(val(iS))) return;
          if (!String(val(iM)).trim()) return;
          var from = iF >= 0 ? cellDate(c[iF]) : null, thru = iX >= 0 ? cellDate(c[iX]) : null;
          if (from && from > now) return;
          if (thru) { thru = new Date(thru.getFullYear(), thru.getMonth(), thru.getDate(), 23, 59, 59); if (thru < now) return; }
          items.push({ type: String(val(iT)), message: String(val(iM)), link: String(val(iL)), from: from });
        });
        items.sort(function (a, b) { return (b.from ? b.from.getTime() : 0) - (a.from ? a.from.getTime() : 0); });
      } catch (e) { items = []; failed = true; }
      show(items, failed);
    };
    var s = document.createElement("script");
    s.onerror = function () { clearTimeout(timer); show([], true); };
    s.src = "https://docs.google.com/spreadsheets/d/" + encodeURIComponent(A.sheetId) +
      "/gviz/tq?tqx=out:json;responseHandler:" + cb + "&headers=1&" +
      (A.gid ? "gid=" + encodeURIComponent(A.gid) : "sheet=" + encodeURIComponent(A.tab || "Announcements"));
    document.head.appendChild(s);
  }

  // ---- Photo carousel: <div data-gallery> reads SITE.photos ----
  function buildGallery(box) {
    var items = (S.photos || []).slice(0, 10);
    var section = box.closest("section");
    if (!items.length) { if (section && !S.draft) section.style.display = "none"; return; }
    var i = 0, timer = null;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.innerHTML =
      '<div class="gal" role="region" aria-roledescription="carousel" aria-label="Photos and posters">' +
        '<div class="gal-stage">' + items.map(function (p, n) {
          var img = '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "") + '"' + (n ? ' loading="lazy"' : "") + ">";
          var inner = p.link ? '<a href="' + esc(p.link) + '">' + img + "</a>" : img;
          return '<figure class="gal-slide ' + (p.type === "poster" ? "is-poster" : "is-photo") + '" aria-hidden="' + (n ? "true" : "false") + '">' + inner + "</figure>";
        }).join("") + "</div>" +
        '<button class="gal-btn gal-prev" type="button" aria-label="Previous">&lsaquo;</button>' +
        '<button class="gal-btn gal-next" type="button" aria-label="Next">&rsaquo;</button>' +
      "</div>" +
      '<div class="gal-bar"><p class="gal-cap" aria-live="polite"></p><div class="gal-dots">' +
        items.map(function (p, n) { return '<button type="button" aria-label="Go to item ' + (n + 1) + '"></button>'; }).join("") +
      "</div></div>";
    var slides = box.querySelectorAll(".gal-slide"), dots = box.querySelectorAll(".gal-dots button"), cap = box.querySelector(".gal-cap");
    function go(n) {
      i = (n + items.length) % items.length;
      Array.prototype.forEach.call(slides, function (s, k) { s.classList.toggle("on", k === i); s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
      Array.prototype.forEach.call(dots, function (d, k) { d.classList.toggle("on", k === i); d.setAttribute("aria-current", k === i ? "true" : "false"); });
      cap.textContent = items[i].caption || "";
    }
    function start() { if (!reduce && !timer) timer = setInterval(function () { go(i + 1); }, 6000); }
    function stop() { clearInterval(timer); timer = null; }
    box.querySelector(".gal-prev").addEventListener("click", function () { go(i - 1); });
    box.querySelector(".gal-next").addEventListener("click", function () { go(i + 1); });
    Array.prototype.forEach.call(dots, function (d, k) { d.addEventListener("click", function () { go(k); }); });
    box.addEventListener("mouseenter", stop); box.addEventListener("mouseleave", start);
    box.addEventListener("focusin", stop); box.addEventListener("focusout", start);
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    box.addEventListener("touchend", function (e) { if (x0 != null) { var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); } x0 = null; }, { passive: true });
    go(0); start();
  }

  function boot() {
    if (S.draft) document.body.classList.add("draft");

    var top = document.getElementById("site-top");
    if (top) top.innerHTML = header();
    var bottom = document.getElementById("site-bottom");
    if (bottom) bottom.innerHTML = footer();

    // Mobile menu
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Text from config: <span data-bind="meeting"></span>
    Array.prototype.forEach.call(document.querySelectorAll("[data-bind]"), function (el) {
      var v = S[el.getAttribute("data-bind")];
      if (v != null) el.textContent = v;
    });
    // Links from config: <a data-href="squareShopUrl">
    Array.prototype.forEach.call(document.querySelectorAll("[data-href]"), function (el) {
      var v = S[el.getAttribute("data-href")];
      if (v) {
        el.setAttribute("href", v);
        if (/^https?:/i.test(v) && v.indexOf(location.host) === -1) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
        }
      }
    });
    // Email links from config: <a data-mail="emailMembership">
    Array.prototype.forEach.call(document.querySelectorAll("[data-mail]"), function (el) {
      var v = S[el.getAttribute("data-mail")];
      if (v) { el.setAttribute("href", "mailto:" + v); el.textContent = v; }
    });
    // News lists: <div data-news="3">
    Array.prototype.forEach.call(document.querySelectorAll("[data-news]"), function (el) {
      el.innerHTML = newsHtml(parseInt(el.getAttribute("data-news"), 10) || 99);
    });
    // Announcements: <div data-announcements data-limit="3">
    Array.prototype.forEach.call(document.querySelectorAll("[data-announcements]"), loadAnnouncements);
    Array.prototype.forEach.call(document.querySelectorAll("[data-gallery]"), buildGallery);
    // Calendar embed: <div data-calendar> keeps its placeholder until calendarEmbedUrl is set
    var cal = document.querySelector("[data-calendar]");
    if (cal && S.calendarEmbedUrl) {
      cal.innerHTML = '<iframe title="Council calendar" class="calendar-frame" loading="lazy" src="' + esc(S.calendarEmbedUrl) + '"></iframe>';
    }

    // Interest form: opens the visitor's email app, addressed to the Membership Director
    var form = document.getElementById("interest-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var f = new FormData(form);
        var body = "Name: " + (f.get("name") || "") + "\nEmail: " + (f.get("email") || "") +
          "\nPhone: " + (f.get("phone") || "") + "\n\n" + (f.get("message") || "");
        location.href = "mailto:" + S.emailMembership + "?subject=" +
          encodeURIComponent("Interested in joining Council #" + S.councilNumber) +
          "&body=" + encodeURIComponent(body);
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
