// c1.js — D3LTAHUB app/game cards | global server-side custom apps
const g = window.location.pathname === "/a";
const a = window.location.pathname === "/b";
const c = window.location.pathname === "/gt";

let t;
try { t = window.top.location.pathname === "/d"; }
catch { try { t = window.parent.location.pathname === "/d"; } catch { t = false; } }

// ─── helpers ──────────────────────────────────────────────────────────────────
function Span(name) {
  return name.split("").map(ch => { const s = document.createElement("span"); s.textContent = ch; return s; });
}
function saveToLocal(p) { sessionStorage.setItem("GoUrl", p); }
function pinKey() { return g ? "Gpinned" : (c ? "Tpinned" : "Apinned"); }

// ─── navigation ───────────────────────────────────────────────────────────────
function handleClick(app) {
  if (app.say) alert(app.say);
  if (app.html) { openHtmlApp(app.html); return; }

  let url = app.link;
  if (app.links && app.links.length > 1) { url = getSelected(app.links); if (!url) return; }

  if (app.local) { saveToLocal(url); window.location.href = "rx"; if (t) window.location.href = url; }
  else if (app.local2) { saveToLocal(url); window.location.href = url; }
  else if (app.blank) { blank(url); }
  else if (app.now) { now(url); if (t) window.location.href = url; }
  else if (app.custom) { openAddModal(); }
  else if (app.dy) { dy(url); }
  else { go(url); if (t) blank(url); }
}

function getSelected(links) {
  const opts = links.map((l, i) => `${i + 1}: ${l.name}`).join("\n");
  const choice = parseInt(prompt(`Select a link:\n${opts}`), 10) - 1;
  if (isNaN(choice) || choice < 0 || choice >= links.length) { alert("Invalid selection."); return null; }
  return links[choice].url;
}

function openHtmlApp(html) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// ─── pin ──────────────────────────────────────────────────────────────────────
function setPin(index) {
  let pins = (localStorage.getItem(pinKey()) || "").split(",").filter(Boolean).map(Number);
  const i = pins.indexOf(index);
  i === -1 ? pins.push(index) : pins.splice(i, 1);
  localStorage.setItem(pinKey(), pins.join(","));
  location.reload();
}
function pinHas(i, p) { return p.includes(i); }

// ─── server custom apps API ───────────────────────────────────────────────────
async function fetchCustomApps() {
  try { const r = await fetch("/hub-admin/apps"); return r.ok ? r.json() : []; }
  catch { return []; }
}

async function serverAddApp(data) {
  const r = await fetch("/hub-admin/apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return r.json();
}

async function serverDeleteApp(id) {
  const r = await fetch(`/hub-admin/apps/${id}`, { method: "DELETE" });
  return r.json();
}

// ─── modal styles (injected once) ────────────────────────────────────────────
function injectModalStyles() {
  if (document.getElementById("d3lta-modal-styles")) return;
  const style = document.createElement("style");
  style.id = "d3lta-modal-styles";
  style.textContent = `
    #d3lta-overlay {
      position: fixed; inset: 0; background: rgba(30,10,60,.55);
      backdrop-filter: blur(4px); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
    }
    #d3lta-modal {
      background: var(--card-bg, #ede8f7); border-radius: 16px;
      padding: 28px 32px; width: min(480px, 92vw);
      box-shadow: 0 8px 40px rgba(80,20,160,.25);
      display: flex; flex-direction: column; gap: 14px;
      color: var(--text, #2d1a5e);
    }
    #d3lta-modal h2 { margin: 0; font-size: 1.25rem; color: var(--primary, #9b72d8); }
    #d3lta-modal label { font-size: .85rem; font-weight: 600; margin-bottom: 3px; display: block; }
    #d3lta-modal input, #d3lta-modal textarea {
      width: 100%; box-sizing: border-box;
      background: var(--background, #f3f0fa); border: 1.5px solid var(--primary, #9b72d8);
      border-radius: 8px; padding: 9px 12px; font-size: .95rem;
      color: var(--text, #2d1a5e); outline: none; font-family: inherit;
    }
    #d3lta-modal textarea { resize: vertical; min-height: 90px; }
    #d3lta-modal .row { display: flex; gap: 10px; }
    #d3lta-modal .row button { flex: 1; }
    #d3lta-modal button {
      padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer;
      font-size: .95rem; font-weight: 600; transition: opacity .15s;
    }
    #d3lta-modal button:hover { opacity: .85; }
    #d3lta-modal .btn-primary { background: var(--primary, #9b72d8); color: #fff; }
    #d3lta-modal .btn-cancel  { background: #c0b0e0; color: #2d1a5e; }
    #d3lta-modal .hint { font-size:.78rem; color:#7a6fa0; margin-top:-8px; }
    #d3lta-modal .icon-preview {
      width:48px; height:48px; border-radius:8px; object-fit:cover;
      border: 1.5px solid var(--primary,#9b72d8); display:none;
    }
    #d3lta-modal .icon-row { display:flex; align-items:center; gap:10px; }
    #d3lta-modal .tabs { display:flex; gap:8px; }
    #d3lta-modal .tab-btn {
      padding:6px 16px; border-radius:20px; border:1.5px solid var(--primary,#9b72d8);
      background:transparent; color:var(--primary,#9b72d8); cursor:pointer; font-size:.88rem;
    }
    #d3lta-modal .tab-btn.active { background:var(--primary,#9b72d8); color:#fff; }
    #d3lta-modal .tab-pane { display:none; }
    #d3lta-modal .tab-pane.active { display:flex; flex-direction:column; gap:14px; }
    #d3lta-error { color:#c0392b; font-size:.85rem; display:none; }
  `;
  document.head.appendChild(style);
}

// ─── add modal ────────────────────────────────────────────────────────────────
function openAddModal() {
  injectModalStyles();
  const overlay = document.createElement("div");
  overlay.id = "d3lta-overlay";
  overlay.innerHTML = `
    <div id="d3lta-modal">
      <h2>➕ Add Custom App</h2>
      <div>
        <label>Admin Password <span style="color:#c0392b">*</span></label>
        <input type="password" id="dm-pass" placeholder="Enter admin password" />
      </div>
      <div>
        <label>App Name <span style="color:#c0392b">*</span></label>
        <input type="text" id="dm-name" placeholder="e.g. My App" />
      </div>
      <div class="tabs">
        <button class="tab-btn active" data-tab="url">URL / Link</button>
        <button class="tab-btn" data-tab="html">Custom HTML</button>
      </div>
      <div class="tab-pane active" id="tab-url">
        <div>
          <label>URL</label>
          <input type="url" id="dm-link" placeholder="https://example.com" />
          <p class="hint">Leave blank if using Custom HTML mode.</p>
        </div>
      </div>
      <div class="tab-pane" id="tab-html">
        <div>
          <label>HTML Content</label>
          <textarea id="dm-html" placeholder="&lt;!DOCTYPE html&gt;&lt;html&gt;...&lt;/html&gt;"></textarea>
          <p class="hint">Paste any HTML. Opens in a new tab when clicked.</p>
        </div>
      </div>
      <div>
        <label>Icon</label>
        <div class="icon-row">
          <input type="url" id="dm-icon" placeholder="https://... icon URL (optional)" />
          <img id="dm-icon-preview" class="icon-preview" alt="preview" />
        </div>
        <p class="hint">Leave blank for the default icon.</p>
      </div>
      <div id="d3lta-error"></div>
      <div class="row">
        <button class="btn-cancel" id="dm-cancel">Cancel</button>
        <button class="btn-primary" id="dm-save">Add App</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // tab switching
  let activeTab = "url";
  overlay.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      overlay.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === activeTab));
      overlay.querySelectorAll(".tab-pane").forEach(p => p.classList.toggle("active", p.id === `tab-${activeTab}`));
    });
  });

  // icon preview
  const iconInput = overlay.querySelector("#dm-icon");
  const iconPreview = overlay.querySelector("#dm-icon-preview");
  iconInput.addEventListener("input", () => {
    const val = iconInput.value.trim();
    if (val) { iconPreview.src = val; iconPreview.style.display = "block"; }
    else { iconPreview.style.display = "none"; }
  });

  // close
  overlay.querySelector("#dm-cancel").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });

  // submit
  overlay.querySelector("#dm-save").addEventListener("click", async () => {
    const errEl = overlay.querySelector("#d3lta-error");
    errEl.style.display = "none";
    const password = overlay.querySelector("#dm-pass").value.trim();
    const name = overlay.querySelector("#dm-name").value.trim();
    const link = overlay.querySelector("#dm-link").value.trim();
    const html = overlay.querySelector("#dm-html").value.trim();
    const image = iconInput.value.trim();

    if (!password) { errEl.textContent = "Admin password is required."; errEl.style.display = "block"; return; }
    if (!name) { errEl.textContent = "App name is required."; errEl.style.display = "block"; return; }
    if (activeTab === "url" && !link) { errEl.textContent = "Please enter a URL, or switch to HTML mode."; errEl.style.display = "block"; return; }
    if (activeTab === "html" && !html) { errEl.textContent = "Please paste some HTML content."; errEl.style.display = "block"; return; }

    const btn = overlay.querySelector("#dm-save");
    btn.textContent = "Saving…"; btn.disabled = true;

    const result = await serverAddApp({
      password,
      name,
      link: activeTab === "url" ? link : "",
      html: activeTab === "html" ? html : "",
      image,
    });

    if (!result.ok) {
      errEl.textContent = result.error || "Failed to add app. Check your password.";
      errEl.style.display = "block";
      btn.textContent = "Add App"; btn.disabled = false;
      return;
    }

    overlay.remove();
    appendCustomCard(result.app, true);
  });
}

// ─── render a custom app card ─────────────────────────────────────────────────
function appendCustomCard(app, prepend = false) {
  const col = document.createElement("div");
  col.classList.add("column");
  col.setAttribute("data-category", "all");
  col.setAttribute("data-custom-id", app.id);

  const link = document.createElement("a");
  link.onclick = (e) => { e.preventDefault(); handleClick(app); };
  link.style.cursor = "pointer";

  const img = document.createElement("img");
  img.width = 145; img.height = 145; img.loading = "lazy";
  img.src = app.image || "/assets/media/icons/custom.webp";
  img.onerror = () => { img.src = "/assets/media/icons/custom.webp"; };

  const p = document.createElement("p");
  for (const s of Span(app.name)) p.appendChild(s);
  if (app.html && !app.link) p.title = "Custom HTML app";

  link.appendChild(img);
  link.appendChild(p);
  col.appendChild(link);

  // delete button
  const delIcon = document.createElement("i");
  delIcon.classList.add("fa", "fa-trash");
  const delBtn = document.createElement("button");
  delBtn.appendChild(delIcon);
  delBtn.title = "Delete this custom app";
  Object.assign(delBtn.style, {
    float: "right", cursor: "pointer",
    background: "rgba(180,40,40,.85)", borderRadius: "50%",
    border: "none", color: "#fff",
    top: "-200px", position: "relative", padding: "7px 9px",
  });
  delBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!confirm(`Delete "${app.name}"?`)) return;
    const res = await serverDeleteApp(app.id);
    if (res.ok) col.remove();
    else alert("Could not delete app — please try again.");
  });
  col.appendChild(delBtn);

  const container = document.querySelector(".apps");
  if (prepend) container.insertBefore(col, container.firstChild);
  else container.appendChild(col);
}

// ─── load global custom apps on page load ─────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  const customApps = await fetchCustomApps();
  for (const app of customApps) appendCustomCard(app, false);
});

// ─── load built-in apps/games from JSON ──────────────────────────────────────
let jsonPath = "/assets/json/a.min.json";
if (g) jsonPath = "/assets/json/g.min.json";
else if (c) jsonPath = "/assets/json/t.min.json";

fetch(jsonPath)
  .then(r => r.json())
  .then(list => {
    list.sort((x, y) => {
      if (x.name.startsWith("[Custom]")) return -1;
      if (y.name.startsWith("[Custom]")) return 1;
      return x.name.localeCompare(y.name);
    });

    const nonPinned = document.querySelector(".apps");
    const pinned = document.querySelector(".pinned");
    const pinList = (localStorage.getItem(pinKey()) || "").split(",").filter(Boolean).map(Number);
    let idx = 0;

    for (const app of list) {
      if (app.categories?.includes("local")) app.local = true;
      else if (app.link?.includes("now.gg") || app.link?.includes("nowgg.me")) {
        if (app.partial == null) { app.partial = true; app.say = "Now.gg is currently not working for some users."; }
      } else if (app.link?.includes("nowgg.nl")) {
        if (app.error == null) { app.error = true; app.say = "NowGG.nl is currently down."; }
      }

      const pinNum = idx;
      const col = document.createElement("div");
      col.classList.add("column");
      col.setAttribute("data-category", (app.categories || ["all"]).join(" "));

      // pin button
      const pinIcon = document.createElement("i");
      pinIcon.classList.add("fa", "fa-map-pin");
      const pinBtn = document.createElement("button");
      pinBtn.appendChild(pinIcon);
      pinBtn.title = "Pin";
      Object.assign(pinBtn.style, {
        float: "right", background: "rgb(45,45,45)", borderRadius: "50%",
        border: "none", color: "#fff", top: "-200px", position: "relative",
      });
      pinBtn.onclick = () => setPin(pinNum);

      const lnk = document.createElement("a");
      lnk.onclick = (e) => { e.preventDefault(); handleClick(app); };
      lnk.style.cursor = "pointer";

      const img = document.createElement("img");
      img.width = 145; img.height = 145; img.loading = "lazy";
      img.src = app.image || "";
      if (!app.image) img.style.display = "none";

      const p = document.createElement("p");
      for (const s of Span(app.name)) p.appendChild(s);

      if (app.error) { p.style.color = "red"; app.say = app.say || "This app is currently not working."; }
      else if (app.load || app.partial) { p.style.color = "yellow"; app.say = app.say || "This app may experience issues."; }

      lnk.appendChild(img);
      lnk.appendChild(p);
      col.appendChild(lnk);
      if (idx !== 0) col.appendChild(pinBtn);

      if (idx !== 0 && pinHas(idx, pinList)) pinned.appendChild(col);
      else nonPinned.appendChild(col);
      idx++;
    }

    const wrap = document.getElementById("apps-container");
    if (wrap) { wrap.appendChild(pinned); wrap.appendChild(nonPinned); }
  })
  .catch(e => console.error("Error loading apps:", e));

// ─── search + category ────────────────────────────────────────────────────────
function category() {
  const sel = Array.from(document.querySelectorAll("#category option:checked")).map(o => o.value);
  for (const col of document.getElementsByClassName("column")) {
    const cats = (col.getAttribute("data-category") || "").split(" ");
    col.style.display = sel.length === 0 || sel.some(s => cats.includes(s)) ? "block" : "none";
  }
}

function bar() {
  const f = document.getElementById("search").value.toLowerCase();
  for (const col of document.getElementsByClassName("column")) {
    const name = (col.querySelector("p")?.textContent || "").toLowerCase();
    col.style.display = name.includes(f) ? "block" : "none";
  }
}
