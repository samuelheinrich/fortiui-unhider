(async function fortiUiUnhider() {
  const ids = {
    menu: "fortiui-unhider-menu",
    submenu: "fortiui-unhider-submenu",
    app: "fortiui-unhider-app",
    style: "fortiui-unhider-style",
    policyPanel: "fortiui-unhider-policy-panel",
  };
  const version = "1.1.0";

  window.__fortiuiUnhider?.cleanup?.();

  const previousApp = document.getElementById(ids.app);
  if (previousApp?.parentElement) {
    for (const child of Array.from(previousApp.parentElement.children)) {
      if (child.id === ids.app) continue;
      child.style.display = child.dataset.fortiuiToolsOldDisplay || "";
      delete child.dataset.fortiuiToolsOldDisplay;
    }
  }
  document.getElementById(ids.menu)?.remove();
  previousApp?.remove();
  document.getElementById(ids.style)?.remove();

  const style = document.createElement("style");
  style.id = ids.style;
  style.textContent = `
    #fortiui-unhider-menu {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #111;
      font: 13px Arial, Helvetica, sans-serif;
    }
    #fortiui-unhider-menu .fui-main {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 7px 8px 7px 26px;
      background: #ffd700;
      border-left: 3px solid #d6a600;
      cursor: pointer;
      user-select: none;
    }
    #fortiui-unhider-menu .fui-main:hover,
    #fortiui-unhider-menu .fui-tool:hover { background: #ffe86d; }
    #fortiui-unhider-menu .fui-caret {
      margin-left: auto;
      transition: transform .12s ease;
    }
    #fortiui-unhider-menu[data-open="true"] .fui-caret { transform: rotate(90deg); }
    #fortiui-unhider-submenu {
      display: none;
      margin: 0;
      padding: 0;
    }
    #fortiui-unhider-menu[data-open="true"] #fortiui-unhider-submenu { display: block; }
    #fortiui-unhider-menu .fui-tool {
      list-style: none;
      padding: 7px 8px 7px 42px;
      background: #ffd700;
      cursor: pointer;
      user-select: none;
    }
    #fortiui-unhider-menu .fui-tool[data-active="true"] {
      background: #499258;
      color: #fff;
      font-weight: 700;
    }
    #fortiui-unhider-app {
      height: calc(100vh - 41px);
      overflow: auto;
      background: #f6f6f6;
      color: #222;
      font: 12px/1.4 Arial, Helvetica, sans-serif;
    }
    #fortiui-unhider-app * { box-sizing: border-box; }
    #fortiui-unhider-app .fui-page {
      padding: 18px 22px 28px;
      min-width: 920px;
    }
    #fortiui-unhider-app .fui-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d4d4d4;
    }
    #fortiui-unhider-app h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    #fortiui-unhider-app h2 {
      margin: 22px 0 8px;
      font-size: 15px;
      font-weight: 700;
    }
    #fortiui-unhider-app .fui-meta { color: #666; }
    #fortiui-unhider-app .fui-actions { display: flex; gap: 8px; }
    #fortiui-unhider-app button {
      padding: 5px 10px;
      border: 1px solid #999;
      background: #fff;
      cursor: pointer;
    }
    #fortiui-unhider-app button:hover { background: #eee; }
    #fortiui-unhider-app .fui-loading,
    #fortiui-unhider-app .fui-empty {
      padding: 18px;
      color: #777;
      background: #fff;
      border: 1px solid #ddd;
    }
    #fortiui-unhider-app .fui-error {
      padding: 14px;
      color: #b00020;
      white-space: pre-wrap;
      background: #fff2f2;
      border: 1px solid #e2a4a4;
    }
    #fortiui-unhider-app table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      background: #fff;
    }
    #fortiui-unhider-app th,
    #fortiui-unhider-app td {
      border: 1px solid #d8d8d8;
      padding: 6px 8px;
      vertical-align: top;
      text-align: left;
      white-space: pre-line;
    }
    #fortiui-unhider-app th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: #5a5a5a;
      color: #fff;
      font-weight: 700;
    }
    #fortiui-unhider-app tbody tr:nth-child(even) { background: #fafafa; }
    #fortiui-unhider-app .fui-badge {
      display: inline-block;
      min-width: 54px;
      padding: 2px 7px;
      border-radius: 10px;
      color: #fff;
      background: #777;
      text-align: center;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 700;
    }
    #fortiui-unhider-app .fui-up,
    #fortiui-unhider-app .fui-enable,
    #fortiui-unhider-app .fui-enabled,
    #fortiui-unhider-app .fui-available,
    #fortiui-unhider-app .fui-success { color: #102914; background: #83d18f; }
    #fortiui-unhider-app .fui-down,
    #fortiui-unhider-app .fui-disable,
    #fortiui-unhider-app .fui-disabled,
    #fortiui-unhider-app .fui-fail { color: #fff; background: #bd5753; }
    #fortiui-unhider-app .fui-partial { color: #3a2b00; background: #f0c04f; }
    #fortiui-unhider-app .fui-unknown { color: #fff; background: #777; }
    #fortiui-unhider-app details { min-width: 260px; }
    #fortiui-unhider-app summary { cursor: pointer; color: #2766a5; }
    #fortiui-unhider-app pre {
      max-height: 320px;
      overflow: auto;
      margin: 8px 0 0;
      padding: 8px;
      color: #222;
      background: #f2f2f2;
      border: 1px solid #ddd;
      font: 11px/1.35 Menlo, Consolas, monospace;
      white-space: pre-wrap;
    }
    #fortiui-unhider-app .fui-cli summary { color: #005b9f; }
    #fortiui-unhider-app .fui-cli pre {
      color: #f5f5f5;
      background: #050505;
      border-color: #333;
      font-family: Consolas, Menlo, Monaco, "Courier New", monospace;
    }
    #fortiui-unhider-app .fui-cli .fui-cli-note {
      margin-top: 6px;
      color: #666;
      font-size: 11px;
    }
    #fortiui-unhider-app .fui-policy-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px 14px;
      margin: 0 0 8px;
      padding: 8px 10px;
      background: #fff;
      border: 1px solid #ddd;
    }
    #fortiui-unhider-app .fui-policy-toolbar input[type="search"] {
      flex: 1 1 360px;
      padding: 6px 8px;
      border: 1px solid #999;
      font-size: 13px;
    }
    #fortiui-unhider-app .fui-policy-toolbar select { max-width: 220px; padding: 4px; }
    #fortiui-unhider-app .fui-policy-toolbar + .fui-meta { margin-bottom: 8px; }
    #fortiui-unhider-app .fui-segmented { display: inline-flex; }
    #fortiui-unhider-app .fui-segmented button + button { border-left: 0; }
    #fortiui-unhider-app .fui-segmented button[data-active="true"] {
      color: #fff;
      background: #499258;
      border-color: #3d7a4a;
    }
    #fortiui-unhider-app tr.fui-policy-hidden-changes > td:first-child { box-shadow: inset 4px 0 0 #c62828; }
    #fortiui-unhider-app .fui-hidden-changes {
      margin-bottom: 4px;
      padding: 3px 6px;
      color: #8b0000;
      background: #ffd3cf;
      border: 1px solid #e58f88;
      border-radius: 2px;
      font: 700 11px/1.35 Menlo, Consolas, monospace;
      white-space: pre-wrap;
    }
    #fortiui-unhider-app .fui-nondefault-toggle {
      padding: 4px 8px;
      color: #8b0000;
      background: #fff0ee;
      border: 1px solid #e58f88;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    #fortiui-unhider-app .fui-nondefault-toggle:has(input:checked) { color: #fff; background: #c62828; border-color: #a01f1f; }
    #fortiui-unhider-app .fui-pair-hidden-count {
      display: inline-block;
      margin-left: 6px;
      padding: 0 7px;
      color: #fff;
      background: #c62828;
      border-radius: 9px;
      font-size: 11px;
    }
    #fortiui-unhider-app tr.fui-pair-header td {
      color: #1d3550;
      background: #e3ebf3;
      border-top: 2px solid #9db3c8;
      font-weight: 700;
      cursor: pointer;
      user-select: none;
    }
    #fortiui-unhider-app tr.fui-pair-header:hover td { background: #d5e1ec; }
    #fortiui-unhider-app .fui-pair-caret {
      display: inline-block;
      width: 16px;
      transform: rotate(90deg);
      transition: transform .12s ease;
    }
    #fortiui-unhider-app tr.fui-pair-header[data-collapsed="true"] .fui-pair-caret { transform: none; }
    #fortiui-unhider-app .fui-pair-count {
      display: inline-block;
      margin-left: 10px;
      padding: 0 7px;
      color: #fff;
      background: #6b85a0;
      border-radius: 9px;
      font-size: 11px;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) mark.fui-hit {
      padding: 0 1px;
      color: inherit;
      background: #ffe14d;
      border-radius: 2px;
      box-shadow: 0 0 0 1px #e0b800;
    }
    #fortiui-unhider-policy-panel {
      clear: both;
      margin: 16px 0;
      padding: 10px 12px;
      color: #222;
      background: #fffbe0;
      border: 1px solid #e3c34a;
      border-left: 4px solid #d6a600;
      font: 12px/1.4 Arial, Helvetica, sans-serif;
      text-align: left;
    }
    #fortiui-unhider-policy-panel.fui-floating {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 10000;
      width: 680px;
      max-height: 70vh;
      overflow: auto;
      margin: 0;
      box-shadow: 0 4px 18px rgba(0, 0, 0, .25);
    }
    #fortiui-unhider-policy-panel > details > summary {
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
    }
    #fortiui-unhider-policy-panel button {
      padding: 3px 9px;
      border: 1px solid #999;
      background: #fff;
      cursor: pointer;
    }
    #fortiui-unhider-policy-panel .fui-policy-panel-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 6px 0;
      color: #666;
    }
    #fortiui-unhider-policy-panel .fui-error {
      padding: 10px;
      color: #b00020;
      white-space: pre-wrap;
      background: #fff2f2;
      border: 1px solid #e2a4a4;
    }
    #fortiui-unhider-policy-panel .fui-cli summary { cursor: pointer; color: #005b9f; }
    #fortiui-unhider-policy-panel .fui-cli pre {
      max-height: 320px;
      overflow: auto;
      margin: 8px 0 0;
      padding: 8px;
      color: #f5f5f5;
      background: #050505;
      border: 1px solid #333;
      font: 11px/1.35 Consolas, Menlo, Monaco, "Courier New", monospace;
      white-space: pre-wrap;
    }
    #fortiui-unhider-policy-panel .fui-cli .fui-cli-note { margin-top: 6px; color: #666; font-size: 11px; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin: 6px 0;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-toolbar input[type="search"] {
      min-width: 220px;
      padding: 4px 6px;
      border: 1px solid #bbb;
      background: #fff;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-count,
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-note { color: #666; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-scroll {
      max-height: 560px;
      overflow: auto;
      border: 1px solid #ddd;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) table.fui-options-table {
      width: auto;
      border-collapse: collapse;
      background: #fff;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table th,
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table td {
      padding: 2px 8px;
      border: 1px solid #e4e4e4;
      font: 11px/1.35 Menlo, Consolas, monospace;
      white-space: pre-wrap;
      vertical-align: top;
      text-align: left;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table th {
      position: sticky;
      top: 0;
      color: #fff;
      background: #5a5a5a;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table tr.fui-opt-changed td {
      background: #fff1a8;
      font-weight: 700;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table tr.fui-opt-hidden-changed td {
      color: #8b0000;
      background: #ffd3cf;
      font-weight: 700;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table td.fui-opt-gui { color: #888; font-weight: 400; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-legend { margin: 0 0 6px; color: #666; white-space: pre; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-legend span {
      padding: 0 6px;
      border-radius: 2px;
      font-weight: 700;
    }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-legend-hidden { color: #8b0000; background: #ffd3cf; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-legend-changed { color: #222; background: #fff1a8; }
    :is(#fortiui-unhider-app, #fortiui-unhider-policy-panel) .fui-options-table td.fui-opt-default {
      color: #888;
      font-weight: 400;
    }
  `;
  document.head.appendChild(style);

  const getVdom = () => new URLSearchParams(location.search).get("vdom") || "root";
  const value = (input) => {
    if (input === undefined || input === null || input === "") return "-";
    if (Array.isArray(input)) return input.map(value).join("\n");
    if (typeof input === "object") {
      if ("name" in input) return input.name;
      return JSON.stringify(input);
    }
    return String(input);
  };
  const normalizeClass = (input) => String(input || "unknown").toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  const badge = (status) => {
    const span = document.createElement("span");
    span.className = `fui-badge fui-${normalizeClass(status)}`;
    span.textContent = value(status);
    return span;
  };
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [key, val] of Object.entries(props)) {
      if (key === "className") node.className = val;
      else if (key === "textContent") node.textContent = val;
      else if (key === "dataset") Object.assign(node.dataset, val);
      else if (key.startsWith("on") && typeof val === "function") node.addEventListener(key.slice(2), val);
      else node.setAttribute(key, val);
    }
    for (const child of Array.isArray(children) ? children : [children]) {
      if (child === undefined || child === null) continue;
      node.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  };
  const fetchJson = async (path) => {
    const response = await fetch(path, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
    return response.json();
  };
  const fetchJsonOptional = async (path) => {
    const response = await fetch(path, { credentials: "same-origin" });
    if (!response.ok) return { unavailable: true, httpStatus: response.status, path };
    return response.json();
  };
  const vdomUrl = (path) => `${path}${path.includes("?") ? "&" : "?"}vdom=${encodeURIComponent(getVdom())}`;
  const names = (input) => {
    if (!input) return "-";
    if (Array.isArray(input)) return input.map(names).filter((item) => item && item !== "-").join("\n") || "-";
    if (typeof input === "object") return input.name || input.q_origin_key || JSON.stringify(input);
    return String(input);
  };
  const enabled = (input) => badge(input || "unknown");
  const firstValue = (...inputs) => inputs.find((input) => input !== undefined && input !== null && input !== "") ?? "-";
  const listRows = (rows, formatter) => (rows || []).map(formatter).filter(Boolean).join("\n") || "-";
  const epoch = (input) => {
    const value = Number(input || 0);
    if (!value || value <= 978307200) return "-";
    return new Date(value * 1000).toLocaleString();
  };
  const objectLines = (input, skip = []) => Object.entries(input || {})
    .filter(([key, val]) => !skip.includes(key) && val !== undefined && val !== null && val !== "")
    .map(([key, val]) => `${key}: ${value(val)}`)
    .join("\n") || "-";
  const dhcpRanges = (row) => listRows(row["ip-range"], (range) => `${range["start-ip"] || "-"} - ${range["end-ip"] || "-"}${range["lease-time"] ? ` (${range["lease-time"]}s)` : ""}`);
  const dhcpExcluded = (row) => listRows(row["exclude-range"], (range) => `${range["start-ip"] || "-"} - ${range["end-ip"] || "-"}`);
  const dhcpReserved = (row) => listRows(row["reserved-address"], (entry) => `${entry.ip || entry["ip-address"] || "-"} ${entry.mac || entry["mac-address"] || ""} ${entry.description || entry.name || ""}`.trim());
  const dhcpOptions = (row) => listRows(row.options, (option) => `${option.code || option.id || "?"}: ${option.value || option["option-value"] || option.type || "-"}`);
  const dnsEntries = (zone) => listRows(zone["dns-entry"], (entry) => `${entry.hostname || entry.name || "@"} ${entry.type || "A"} ${entry.ip || entry.ip6 || entry.canonical_name || entry["canonical-name"] || entry.preference || "-"}`);
  const bytes = (input) => {
    const number = Number(input || 0);
    if (!number) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = number;
    let index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }
    return `${value.toFixed(index ? 1 : 0)} ${units[index]}`;
  };
  const maskSecrets = (input) => {
    if (Array.isArray(input)) return input.map(maskSecrets);
    if (!input || typeof input !== "object") return input;
    return Object.fromEntries(
      Object.entries(input).map(([key, val]) => [
        key,
        /secret|passwd|password|psk|ddns-key/i.test(key) ? "[hidden]" : maskSecrets(val),
      ]),
    );
  };
  const rawDetails = (input) => el("details", {}, [
    el("summary", { textContent: "Show JSON" }),
    el("pre", { textContent: JSON.stringify(maskSecrets(input), null, 2) }),
  ]);
  const cliQuote = (input) => {
    const text = value(input);
    if (text === "-") return "";
    if (/^[A-Za-z0-9_.:/@+-]+$/.test(text)) return text;
    return `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  };
  const cliValue = (input) => {
    if (input === undefined || input === null || input === "") return "";
    if (Array.isArray(input)) return input.map((item) => cliValue(item)).filter(Boolean).join(" ");
    if (typeof input === "object") return cliQuote(input.name || input.q_origin_key || JSON.stringify(input));
    return cliQuote(input);
  };
  const cliConfig = (path, editKey, row, options = {}) => {
    const skip = new Set(["q_origin_key", "uuid", "uuid-idx", "datasource", "css-class", ...(options.skip || [])]);
    const lines = [`config ${path.replace(/\./g, " ")}`];

    if (editKey !== undefined && editKey !== null && editKey !== "") lines.push(`    edit ${cliQuote(editKey)}`);

    for (const [key, raw] of Object.entries(row || {})) {
      if (skip.has(key) || /secret|passwd|password|psk|ddns-key/i.test(key)) continue;
      if (raw === undefined || raw === null || raw === "" || raw === false) continue;
      if (Array.isArray(raw) && raw.length === 0) continue;

      if (Array.isArray(raw) && raw.every((item) => item && typeof item === "object" && ("name" in item || "q_origin_key" in item))) {
        lines.push(`        set ${key} ${cliValue(raw)}`);
      } else if (Array.isArray(raw) || typeof raw === "object") {
        lines.push(`        # ${key}: ${JSON.stringify(maskSecrets(raw))}`);
      } else {
        lines.push(`        set ${key} ${cliValue(raw)}`);
      }
    }

    if (editKey !== undefined && editKey !== null && editKey !== "") lines.push("    next");
    lines.push("end");
    return lines.join("\n");
  };
  const cliNestedConfig = (parentPath, childPath, editKey, row, options = {}) => {
    const inner = cliConfig(childPath, editKey, row, options).split("\n").map((line) => `    ${line}`).join("\n");
    return [`config ${parentPath.replace(/\./g, " ")}`, inner, "end"].join("\n");
  };
  const cliDetails = (content, note = "Best-effort CLI view generated from API data.") => el("details", { className: "fui-cli" }, [
    el("summary", { textContent: "Show CLI" }),
    el("pre", { textContent: Array.isArray(content) ? content.filter(Boolean).join("\n") : value(content) }),
    note ? el("div", { className: "fui-cli-note", textContent: note }) : null,
  ]);
  const cliCommands = (...commands) => cliDetails(commands.filter(Boolean).join("\n"), "CLI command reference; run manually if live output is needed.");
  const lazyDetails = (label, build) => {
    const details = el("details", {}, el("summary", { textContent: label }));
    details.addEventListener("toggle", () => {
      if (details.open && details.childElementCount === 1) details.appendChild(build());
    });
    return details;
  };
  const optionSkip = new Set(["q_origin_key", "uuid-idx", "datasource", "css-class"]);
  const optionText = (input) => {
    if (input === undefined || input === null) return "";
    if (Array.isArray(input)) {
      return input.map((item) => `"${item && typeof item === "object" ? firstValue(item.name, item.q_origin_key, JSON.stringify(item)) : item}"`).join(" ");
    }
    if (typeof input === "object") return JSON.stringify(maskSecrets(input));
    return String(input);
  };
  const parseQuery = (input) => Array.from(String(input || "").toLowerCase().matchAll(/"([^"]*)"|(\S+)/g))
    .map((match) => {
      if (match[1] !== undefined) return { value: match[1] };
      const index = match[2].indexOf("=");
      return index > 0 ? { key: match[2].slice(0, index), value: match[2].slice(index + 1) } : { value: match[2] };
    })
    .filter((term) => term.key || term.value);
  const termMatches = (term, key, text, matchKeys = true) => {
    if (term.key) return key === term.key && text.includes(term.value);
    return text.includes(term.value) || (matchKeys && key.includes(term.value));
  };
  const queryWords = (terms) => terms.map((term) => term.value).filter(Boolean);
  const escapeRegExp = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (root, words, skip = "") => {
    const allowed = (node) => {
      const blocked = skip ? node.parentElement.closest(skip) : null;
      return !blocked || blocked === root || !root.contains(blocked);
    };
    root.querySelectorAll("mark.fui-hit").forEach((mark) => {
      if (allowed(mark)) mark.replaceWith(document.createTextNode(mark.textContent));
    });
    root.normalize();
    if (!words.length) return;

    const pattern = new RegExp([...new Set(words)].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|"), "gi");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (allowed(walker.currentNode)) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text = node.nodeValue;
      const matches = Array.from(text.matchAll(pattern));
      if (!matches.length) continue;

      const fragment = document.createDocumentFragment();
      let last = 0;
      for (const match of matches) {
        if (match.index > last) fragment.append(text.slice(last, match.index));
        fragment.append(el("mark", { className: "fui-hit", textContent: match[0] }));
        last = match.index + match[0].length;
      }
      fragment.append(text.slice(last));
      node.replaceWith(fragment);
    }
  };
  const policyMetaCache = new Map();
  const policyMeta = (vdom) => {
    if (!policyMetaCache.has(vdom)) {
      const query = `vdom=${encodeURIComponent(vdom)}`;
      policyMetaCache.set(vdom, Promise.all([
        fetchJsonOptional(`/api/v2/cmdb/firewall/policy?action=default&${query}`),
        fetchJsonOptional(`/api/v2/cmdb/firewall/policy?action=schema&${query}`),
      ]).then(([defaultData, schemaData]) => {
        const schemaResults = Array.isArray(schemaData.results) ? schemaData.results[0] : schemaData.results;
        const children = schemaResults?.children || {};
        const defaultResults = Array.isArray(defaultData.results) ? defaultData.results[0] : defaultData.results;
        const defaults = {};
        const help = {};
        for (const [key, child] of Object.entries(children)) {
          if (child && "default" in child) defaults[key] = child.default;
          if (child?.help) help[key] = child.help;
        }
        Object.assign(defaults, defaultResults && typeof defaultResults === "object" ? defaultResults : {});
        return { defaults, help };
      }).catch(() => ({ defaults: {}, help: {} })));
    }
    return policyMetaCache.get(vdom);
  };
  const policyGuiFields = new Set([
    "policyid", "uuid", "name", "status", "comments", "action", "schedule",
    "srcintf", "dstintf", "srcaddr", "dstaddr", "srcaddr6", "dstaddr6",
    "srcaddr-negate", "dstaddr-negate", "srcaddr6-negate", "dstaddr6-negate", "service", "service-negate",
    "internet-service", "internet-service-name", "internet-service-group", "internet-service-custom", "internet-service-custom-group", "internet-service-negate",
    "internet-service-src", "internet-service-src-name", "internet-service-src-group", "internet-service-src-custom", "internet-service-src-custom-group", "internet-service-src-negate",
    "internet-service6", "internet-service6-name", "internet-service6-group", "internet-service6-custom", "internet-service6-custom-group", "internet-service6-negate",
    "internet-service6-src", "internet-service6-src-name", "internet-service6-src-group", "internet-service6-src-custom", "internet-service6-src-custom-group", "internet-service6-src-negate",
    "users", "groups", "fsso-groups", "ztna-status", "ztna-ems-tag", "ztna-geo-tag", "ztna-tags-match-logic",
    "nat", "nat46", "nat64", "ippool", "poolname", "poolname6", "fixedport", "vpntunnel", "inbound", "outbound",
    "inspection-mode", "utm-status", "profile-type", "profile-group", "profile-protocol-options", "ssl-ssh-profile",
    "av-profile", "webfilter-profile", "dnsfilter-profile", "emailfilter-profile", "dlp-profile", "dlp-sensor", "file-filter-profile",
    "ips-sensor", "application-list", "voip-profile", "icap-profile", "waf-profile", "videofilter-profile", "ssh-filter-profile",
    "cifs-profile", "casb-profile", "virtual-patch-profile",
    "logtraffic", "logtraffic-start", "capture-packet",
  ]);
  const policyOptionRows = (policy, meta) => Object.entries(policy || {})
    .filter(([key]) => !optionSkip.has(key))
    .map(([key, raw]) => {
      const secret = /secret|passwd|password|psk|ddns-key/i.test(key);
      const text = secret ? "[hidden]" : optionText(raw);
      const known = Object.prototype.hasOwnProperty.call(meta.defaults, key);
      const defaultText = known ? optionText(meta.defaults[key]) : null;
      const changed = known && !secret && text !== defaultText;
      const gui = policyGuiFields.has(key);
      return { key, raw, text, defaultText, changed, gui, hiddenChanged: changed && !gui };
    });
  const policyOptionsView = (policy, meta, initialFilter = "") => {
    const hasDefaults = Object.keys(meta.defaults).length > 0;
    const rows = policyOptionRows(policy, meta);
    const changedCount = rows.filter((row) => row.changed).length;
    const hiddenChangedCount = rows.filter((row) => row.hiddenChanged).length;
    const filter = el("input", {
      type: "search",
      placeholder: "Filter options or values (key=value supported)...",
      value: initialFilter,
      oninput: () => apply(),
      onkeydown: (event) => {
        event.stopPropagation();
        if (event.key === "Enter") event.preventDefault();
      },
    });
    const onlyChanged = el("input", { type: "checkbox", onchange: () => apply() });
    const count = el("span", { className: "fui-options-count" });
    const tbody = el("tbody", {}, rows.map((row) => {
      row.tr = el("tr", { className: row.hiddenChanged ? "fui-opt-hidden-changed" : row.changed ? "fui-opt-changed" : "" }, [
        el("td", { title: meta.help[row.key] || "", textContent: row.key }),
        el("td", { textContent: row.text }),
        el("td", { className: "fui-opt-default", textContent: row.defaultText ?? "?" }),
        el("td", { className: "fui-opt-gui", textContent: row.gui ? "GUI" : "CLI only" }),
      ]);
      return row.tr;
    }));
    function apply() {
      const terms = parseQuery(filter.value);
      const words = queryWords(terms);
      let shown = 0;
      for (const row of rows) {
        const visible = (!onlyChanged.checked || row.changed) && (!terms.length || terms.some((term) => termMatches(term, row.key, row.text.toLowerCase())));
        row.tr.style.display = visible ? "" : "none";
        if (visible) {
          shown += 1;
          highlight(row.tr, words);
        }
      }
      count.textContent = `${shown} of ${rows.length} options shown${hasDefaults ? `, ${changedCount} differ from default, ${hiddenChangedCount} of them CLI only` : ""}`;
    }
    apply();

    const getText = rows.map((row) => `${row.key.padEnd(20)}: ${row.text}`).join("\n");
    const showRow = Object.fromEntries(rows.filter((row) => row.changed).map((row) => [row.key, row.raw]));

    return el("div", { className: "fui-options" }, [
      el("div", { className: "fui-options-toolbar" }, [
        filter,
        el("label", {}, [onlyChanged, " Only non-default"]),
        count,
      ]),
      hasDefaults ? el("div", { className: "fui-options-legend" }, [
        el("span", { className: "fui-legend-hidden", textContent: "red" }), " non-default, not visible in the FortiGate GUI (CLI only)   ",
        el("span", { className: "fui-legend-changed", textContent: "yellow" }), " non-default, visible in the GUI",
      ]) : null,
      hasDefaults ? null : el("div", { className: "fui-options-note", textContent: "Default values are unavailable on this FortiOS build; non-default highlighting is disabled." }),
      el("div", { className: "fui-options-scroll" }, el("table", { className: "fui-options-table" }, [
        el("thead", {}, el("tr", {}, [el("th", { textContent: "Option" }), el("th", { textContent: "Value" }), el("th", { textContent: "Default" }), el("th", { textContent: "GUI" })])),
        tbody,
      ])),
      cliDetails([
        "# get (all options)",
        getText,
        ...(hasDefaults ? ["\n# show (non-default options)", cliConfig("firewall policy", policy.policyid, showRow, { skip: ["policyid"] })] : []),
      ], "Generated from saved API data; unsaved changes in the edit dialog are not included."),
    ]);
  };
  const tableRow = (row, columns) => el("tr", {}, columns.map((column) => {
    const content = column.render ? column.render(row) : row[column.key];
    return el("td", {}, content instanceof Node ? content : document.createTextNode(value(content)));
  }));
  const table = (rows, columns, emptyText = "No entries found.") => {
    if (!rows.length) return el("div", { className: "fui-empty", textContent: emptyText });

    const thead = el("thead", {}, el("tr", {}, columns.map((column) => el("th", { textContent: column.label }))));
    const tbody = el("tbody");

    for (const row of rows) tbody.appendChild(tableRow(row, columns));

    return el("table", {}, [thead, tbody]);
  };
  const pageShell = (title, refresh) => {
    const page = el("div", { className: "fui-page" });
    const header = el("div", { className: "fui-header" }, [
      el("div", {}, [
        el("h1", { textContent: title }),
        el("div", { className: "fui-meta", textContent: `VDOM ${getVdom()} | FortiUI Unhider ${version}` }),
      ]),
      el("div", { className: "fui-actions" }, [
        el("button", { type: "button", onclick: refresh }, "Refresh"),
        el("button", { type: "button", onclick: restoreOriginalUi }, "Close Tools"),
      ]),
    ]);
    page.appendChild(header);
    return page;
  };

  let currentTool = null;
  const policyViewState = { query: "", view: "list", srcintf: "", dstintf: "", nonDefault: false, collapsed: new Set() };

  function restoreOriginalUi() {
    const app = document.getElementById(ids.app);
    if (app?.parentElement) {
      for (const child of Array.from(app.parentElement.children)) {
        if (child.id === ids.app) continue;
        if (child.dataset.fortiuiToolsOldDisplay !== undefined) {
          child.style.display = child.dataset.fortiuiToolsOldDisplay;
          delete child.dataset.fortiuiToolsOldDisplay;
        } else {
          child.style.display = "";
        }
      }
    }
    app?.remove();
    document.querySelectorAll(`#${ids.menu} .fui-tool`).forEach((item) => delete item.dataset.active);
    document.querySelector("nu-nav-entry.active")?.classList.remove("active");
  }

  async function showTool(tool) {
    currentTool = tool;
    const ngApp = document.getElementById("ng1-app");
    if (!ngApp?.parentElement) {
      alert("FortiGate app container #ng1-app was not found.");
      return;
    }

    document.querySelector("nu-nav-entry.active")?.classList.remove("active");
    document.querySelectorAll(`#${ids.menu} .fui-tool`).forEach((item) => {
      item.dataset.active = item.dataset.tool === tool.id ? "true" : "false";
    });

    let app = document.getElementById(ids.app);
    if (!app) {
      app = el("div", { id: ids.app });
      ngApp.parentElement.insertBefore(app, ngApp);
    }

    for (const child of Array.from(ngApp.parentElement.children)) {
      if (child.id === ids.app) continue;
      if (child.dataset.fortiuiToolsOldDisplay === undefined) child.dataset.fortiuiToolsOldDisplay = child.style.display || "";
      child.style.display = "none";
    }

    app.replaceChildren(el("div", { className: "fui-page" }, el("div", { className: "fui-loading", textContent: `Loading ${tool.label}...` })));

    try {
      const page = pageShell(tool.label, () => showTool(tool));
      await tool.render(page);
      app.replaceChildren(page);
    } catch (error) {
      const page = pageShell(tool.label, () => showTool(tool));
      page.appendChild(el("div", {
        className: "fui-error",
        textContent: `Failed to load ${tool.label}.\n\n${error.message}\n\nCheck that you are logged in and that your admin profile has read permissions for this feature.`,
      }));
      app.replaceChildren(page);
    }
  }

  const ipsecStatus = (phase1, phase2List, monitorByName, proxyStatusByPhase2) => {
    const statuses = [];
    const monitor = monitorByName.get(phase1.name);
    if (monitor?.proxyid) statuses.push(...monitor.proxyid.map((proxy) => proxy.status).filter(Boolean));
    for (const phase2 of phase2List) {
      const status = proxyStatusByPhase2.get(phase2.name);
      if (status) statuses.push(status);
    }
    if (!statuses.length) return "unknown";
    if (statuses.every((status) => status === "up")) return "up";
    if (statuses.some((status) => status === "up")) return "partial";
    return "down";
  };
  const phase2Selector = (phase2) => {
    const src = phase2["src-subnet"] || phase2["src-name"] || phase2["src-name6"] || "-";
    const dst = phase2["dst-subnet"] || phase2["dst-name"] || phase2["dst-name6"] || "-";
    return `${src} -> ${dst}${phase2.protocol ? ` proto ${phase2.protocol}` : ""}`;
  };

  const tools = [
    {
      id: "system-info",
      label: "System Info",
      render: async (page) => {
        const [statusData, timeData] = await Promise.all([
          fetchJson("/api/v2/monitor/system/status"),
          fetchJson("/api/v2/monitor/system/time"),
        ]);
        const status = statusData.results || {};
        const systemTime = timeData.results?.time ? new Date(timeData.results.time * 1000).toLocaleString() : "-";

        page.appendChild(el("div", { className: "fui-meta", textContent: `Hostname ${status.hostname || "-"}` }));
        page.appendChild(table([
          { key: "Hostname", value: status.hostname },
          { key: "Model", value: [status.model_name, status.model_number, status.model].filter(Boolean).join(" ") },
          { key: "Serial", value: status.serial || status.serial_no },
          { key: "Firmware", value: status.version || status.firmware_version },
          { key: "Build", value: status.build },
          { key: "Current Time", value: systemTime },
          { key: "Log Disk", value: status.log_disk_status },
        ], [
          { label: "Key", key: "key" },
          { label: "Value", key: "value" },
        ]));
        page.appendChild(el("h2", { textContent: "Raw Status" }));
        page.appendChild(rawDetails({ status: statusData, time: timeData }));
        page.appendChild(el("h2", { textContent: "CLI" }));
        page.appendChild(cliCommands(
          "get system status",
          "get system performance status",
          "show system global",
          "show system settings",
        ));
      },
    },
    {
      id: "fortiguard-faz",
      label: "FortiGuard / FortiAnalyzer",
      render: async (page) => {
        const [fortiguardData, serviceData, licenseData, centralData] = await Promise.all([
          fetchJson("/api/v2/cmdb/system/fortiguard"),
          fetchJson(vdomUrl("/api/v2/cmdb/system/fortiguard-service")),
          fetchJson("/api/v2/monitor/license/status"),
          fetchJson("/api/v2/cmdb/system/central-management"),
        ]);
        const fortiguard = fortiguardData.results || {};
        const service = serviceData.results || [];
        const licenses = licenseData.results || {};
        const central = centralData.results || {};
        const fazSlots = [
          { name: "fortianalyzer", label: "FortiAnalyzer 1", cli: "log.fortianalyzer" },
          { name: "fortianalyzer2", label: "FortiAnalyzer 2", cli: "log.fortianalyzer2" },
          { name: "fortianalyzer3", label: "FortiAnalyzer 3", cli: "log.fortianalyzer3" },
          { name: "fortianalyzer4", label: "FortiAnalyzer 4", cli: "log.fortianalyzer4" },
          { name: "fortianalyzer5", label: "FortiAnalyzer 5", cli: "log.fortianalyzer5" },
          { name: "fortianalyzer-cloud", label: "FortiAnalyzer Cloud", cli: "log.fortianalyzer-cloud" },
        ];
        const fazRows = await Promise.all(fazSlots.map(async (slot) => {
          const [settingData, filterData] = await Promise.all([
            fetchJsonOptional(vdomUrl(`/api/v2/cmdb/log.${slot.name}/setting`)),
            fetchJsonOptional(vdomUrl(`/api/v2/cmdb/log.${slot.name}/filter`)),
          ]);
          const setting = settingData.results || {};
          const filter = filterData.results || {};

          return {
            slot: slot.label,
            available: !(settingData.unavailable || filterData.unavailable),
            settingStatus: settingData.httpStatus,
            filterStatus: filterData.httpStatus,
            cli: slot.cli,
            setting,
            filter,
            filterItems: objectLines(filter, ["q_origin_key"]),
          };
        }));
        const licenseRows = Object.entries(licenses).map(([name, data]) => ({ name, ...(data || {}) }));
        const serviceRows = Array.isArray(service)
          ? service
          : Object.entries(service).map(([name, data]) => (data && typeof data === "object" ? { name, ...data } : { name, value: data }));

        page.appendChild(el("div", { className: "fui-meta", textContent: `FortiGuard ${licenses.fortiguard?.connected ? "connected" : "not connected"}, ${fazRows.filter((row) => row.available).length} FortiAnalyzer endpoints available` }));
        page.appendChild(el("h2", { textContent: "FortiGuard Settings" }));
        page.appendChild(table([
          { key: "Anycast", value: fortiguard["fortiguard-anycast"] },
          { key: "Anycast Source", value: fortiguard["fortiguard-anycast-source"] },
          { key: "Protocol", value: fortiguard.protocol },
          { key: "Port", value: fortiguard.port },
          { key: "Service Account", value: fortiguard["service-account-id"] },
          { key: "Update Server Location", value: fortiguard["update-server-location"] },
          { key: "Auto FortiCloud Join", value: fortiguard["auto-join-forticloud"] },
          { key: "Persistent Connection", value: fortiguard["persistent-connection"] },
          { key: "Auto Firmware Upgrade", value: fortiguard["auto-firmware-upgrade"] },
          { key: "Source IP", value: fortiguard["source-ip"] },
          { key: "Interface Select", value: firstValue(fortiguard.interface, fortiguard["interface-select-method"]) },
          { key: "Proxy", value: fortiguard["proxy-server-ip"] ? `${fortiguard["proxy-server-ip"]}:${fortiguard["proxy-server-port"] || ""}` : "-" },
        ], [
          { label: "Setting", key: "key" },
          { label: "Value", key: "value" },
        ]));
        page.appendChild(cliDetails(cliConfig("system fortiguard", null, fortiguard)));
        page.appendChild(el("h2", { textContent: "FortiGuard / License Status" }));
        page.appendChild(table(licenseRows, [
          { label: "Service", key: "name" },
          { label: "Status", render: (row) => badge(firstValue(row.status, row.registration_status, row.connected === true ? "connected" : row.connected === false ? "disconnected" : row.supported === false ? "unsupported" : "unknown")) },
          { label: "Supported", render: (row) => row.supported === undefined ? "-" : badge(row.supported ? "yes" : "no") },
          { label: "Connected", render: (row) => row.connected === undefined ? "-" : badge(row.connected ? "yes" : "no") },
          { label: "Version", key: "version" },
          { label: "Expires", render: (row) => epoch(row.expires) },
          { label: "Last Update", render: (row) => epoch(row.last_update) },
          { label: "Last Result", key: "last_update_result_status" },
          { label: "Server", key: "server_address" },
          { label: "Account", key: "account" },
          { label: "CLI", render: () => cliCommands("diagnose autoupdate versions", "diagnose autoupdate status", "diagnose test application update 2") },
          { label: "Raw", render: rawDetails },
        ], "No license status data found."));
        page.appendChild(el("h2", { textContent: "FortiGuard Service Overrides" }));
        page.appendChild(table(serviceRows, [
          { label: "Service", render: (row) => firstValue(row.name, row.service, row.id) },
          { label: "Status", render: (row) => row.status ? enabled(row.status) : "-" },
          { label: "Protocol", key: "protocol" },
          { label: "Port", key: "port" },
          { label: "CLI", render: (row) => cliDetails(cliConfig("system fortiguard-service", firstValue(row.name, row.service, row.id), row)) },
          { label: "Raw", render: rawDetails },
        ], "No FortiGuard service override entries found."));
        page.appendChild(el("h2", { textContent: "Central Management" }));
        page.appendChild(rawDetails(central));
        page.appendChild(cliDetails(cliConfig("system central-management", null, central)));
        page.appendChild(el("h2", { textContent: "FortiAnalyzer Targets and Filters" }));
        page.appendChild(table(fazRows, [
          { label: "Target", key: "slot" },
          { label: "API", render: (row) => row.available ? badge("available") : badge(`HTTP ${row.settingStatus || row.filterStatus}`) },
          { label: "Status", render: (row) => row.available ? enabled(row.setting.status) : "-" },
          { label: "Server", render: (row) => firstValue(row.setting.server, row.setting["server-fqdn"]) },
          { label: "Alt Server", render: (row) => row.setting["alt-server"] },
          { label: "Serial", render: (row) => names(row.setting.serial) },
          { label: "Upload", render: (row) => firstValue(row.setting["upload-option"], row.setting["upload-interval"]) },
          { label: "Reliable", render: (row) => row.setting.reliable },
          { label: "Encryption", render: (row) => firstValue(row.setting["enc-algorithm"], row.setting["ssl-min-proto-version"]) },
          { label: "Source IP", render: (row) => row.setting["source-ip"] },
          { label: "Interface", render: (row) => firstValue(row.setting.interface, row.setting["interface-select-method"]) },
          { label: "Filters", key: "filterItems" },
          { label: "CLI", render: (row) => row.available ? cliDetails([
            cliConfig(`${row.cli} setting`, null, row.setting),
            "",
            cliConfig(`${row.cli} filter`, null, row.filter),
          ]) : cliCommands(`# ${row.slot} is not available on this FortiOS build`) },
          { label: "Raw", render: (row) => rawDetails({ setting: row.setting, filter: row.filter }) },
        ], "No FortiAnalyzer targets found."));
      },
    },
    {
      id: "arp-info",
      label: "ARP Info",
      render: async (page) => {
        const arpData = await fetchJson(vdomUrl("/api/v2/monitor/network/arp"));
        const rows = arpData.results || [];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${rows.length} ARP entries` }));
        page.appendChild(table(rows, [
          { label: "IP Address", key: "ip" },
          { label: "MAC Address", key: "mac" },
          { label: "Interface", key: "interface" },
          { label: "Age", key: "age" },
          { label: "CLI", render: (row) => cliCommands(`get system arp | grep ${row.ip}`, `diagnose ip arp list | grep ${row.ip}`) },
          { label: "Raw", render: rawDetails },
        ], "No ARP entries found."));
      },
    },
    {
      id: "local-in-policy",
      label: "Local-in Policy",
      render: async (page) => {
        const [ipv4Data, ipv6Data, autoData] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/firewall/local-in-policy")),
          fetchJson(vdomUrl("/api/v2/cmdb/firewall/local-in-policy6")),
          fetchJson(vdomUrl("/api/v2/monitor/firewall/local-in")),
        ]);
        const ipv4 = ipv4Data.results || [];
        const ipv6 = ipv6Data.results || [];
        const autoRows = Object.entries(autoData.results || {}).flatMap(([group, rows]) => (
          (rows || []).map((row, index) => ({ group, index: index + 1, ...row }))
        ));
        const customColumns = (path) => [
          { label: "Policy ID", key: "policyid" },
          { label: "Status", render: (row) => enabled(row.status) },
          { label: "Interface", key: "intf" },
          { label: "Source", render: (row) => `${row["srcaddr-negate"] === "enable" ? "NOT " : ""}${names(row.srcaddr)}` },
          { label: "Destination", render: (row) => `${row["dstaddr-negate"] === "enable" ? "NOT " : ""}${names(row.dstaddr)}` },
          { label: "Service", render: (row) => `${row["service-negate"] === "enable" ? "NOT " : ""}${names(row.service)}` },
          { label: "Action", render: (row) => badge(row.action) },
          { label: "Schedule", key: "schedule" },
          { label: "Comments", key: "comments" },
          { label: "CLI", render: (row) => cliDetails(cliConfig(path, row.policyid, row)) },
          { label: "Raw", render: rawDetails },
        ];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${ipv4.length} IPv4 custom, ${ipv6.length} IPv6 custom, ${autoRows.length} automatic local-in entries` }));
        page.appendChild(el("h2", { textContent: "Custom IPv4 Local-in Policy" }));
        page.appendChild(table(ipv4, customColumns("firewall local-in-policy"), "No custom IPv4 local-in policy configured."));
        page.appendChild(el("h2", { textContent: "Custom IPv6 Local-in Policy" }));
        page.appendChild(table(ipv6, customColumns("firewall local-in-policy6"), "No custom IPv6 local-in policy configured."));
        page.appendChild(el("h2", { textContent: "Automatic Local-in Policy" }));
        page.appendChild(table(autoRows, [
          { label: "Group", key: "group" },
          { label: "#", key: "index" },
          { label: "Source Interface/Zone", render: (row) => names(row.from_zone || row.interface || row.intf) },
          { label: "Source", render: (row) => names(row.source || row.srcaddr) },
          { label: "Destination", render: (row) => names(row.destination || row.dstaddr) },
          { label: "Services", render: (row) => names(row.services || row.service) },
          { label: "Action", render: (row) => badge(row.action) },
          { label: "CLI", render: () => cliCommands("diagnose firewall local-in-policy list", "show firewall local-in-policy", "show firewall local-in-policy6") },
          { label: "Raw", render: rawDetails },
        ], "No automatic local-in monitor entries found."));
      },
    },
    {
      id: "ntp-info",
      label: "NTP Info",
      render: async (page) => {
        const [timeData, ntpStatusData, ntpConfigData] = await Promise.all([
          fetchJson("/api/v2/monitor/system/time"),
          fetchJson("/api/v2/monitor/system/ntp/status"),
          fetchJson(vdomUrl("/api/v2/cmdb/system/ntp")),
        ]);
        const rows = ntpStatusData.results || [];
        const systemTime = timeData.results?.time ? new Date(timeData.results.time * 1000).toLocaleString() : "-";

        page.appendChild(el("div", { className: "fui-meta", textContent: `System time ${systemTime}, ${rows.length} NTP status entries` }));
        page.appendChild(table(rows, [
          { label: "NTP Server", key: "server" },
          { label: "IP Address", key: "ip" },
          { label: "Version", key: "version" },
          { label: "Reachable", render: (row) => badge(row.reachable ? "up" : "down") },
          { label: "CLI", render: (row) => cliCommands("show system ntp", "diagnose sys ntp status", row.server ? `diagnose sys ntp status | grep ${row.server}` : null) },
          { label: "Raw", render: rawDetails },
        ], "No NTP monitor entries found."));
        page.appendChild(el("h2", { textContent: "NTP Config" }));
        page.appendChild(rawDetails(ntpConfigData.results || ntpConfigData));
        page.appendChild(cliDetails(cliConfig("system ntp", null, ntpConfigData.results || {})));
      },
    },
    {
      id: "dhcp-pools",
      label: "DHCP Pools",
      render: async (page) => {
        const [ipv4Data, ipv6Data] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/system.dhcp/server")),
          fetchJson(vdomUrl("/api/v2/cmdb/system.dhcp6/server")),
        ]);
        const ipv4 = ipv4Data.results || [];
        const ipv6 = ipv6Data.results || [];
        const columns = (path) => [
          { label: "ID", render: (row) => firstValue(row.id, row["seq-num"], row.name) },
          { label: "Status", render: (row) => enabled(row.status) },
          { label: "Interface", key: "interface" },
          { label: "Type", render: (row) => firstValue(row["server-type"], row.mode, row["ip-mode"]) },
          { label: "Gateway", render: (row) => firstValue(row["default-gateway"], row.gateway, row["default-router"]) },
          { label: "Netmask/Prefix", render: (row) => firstValue(row.netmask, row.prefix, row["subnet-mask"]) },
          { label: "Lease", render: (row) => row["lease-time"] === 0 ? "unlimited" : firstValue(row["lease-time"], row.valid_lifetime, row["valid-lifetime"]) },
          { label: "DNS Service", key: "dns-service" },
          { label: "DNS Servers", render: (row) => [row["dns-server1"], row["dns-server2"], row["dns-server3"], row["dns-server4"], row["dns-server6-1"], row["dns-server6-2"], row["dns-server6-3"]].filter((item) => item && item !== "0.0.0.0" && item !== "::").join("\n") || "-" },
          { label: "Domain", key: "domain" },
          { label: "Ranges", render: dhcpRanges },
          { label: "Excluded", render: dhcpExcluded },
          { label: "Reserved", render: dhcpReserved },
          { label: "Options", render: dhcpOptions },
          { label: "CLI", render: (row) => cliDetails(cliConfig(path, firstValue(row.id, row["seq-num"], row.name), row)) },
          { label: "Raw", render: rawDetails },
        ];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${ipv4.length} IPv4 DHCP pools, ${ipv6.length} IPv6 DHCP pools` }));
        page.appendChild(el("h2", { textContent: "IPv4 DHCP Pools" }));
        page.appendChild(table(ipv4, columns("system.dhcp server"), "No IPv4 DHCP pools configured."));
        page.appendChild(el("h2", { textContent: "IPv6 DHCP Pools" }));
        page.appendChild(table(ipv6, columns("system.dhcp6 server"), "No IPv6 DHCP pools configured."));
      },
    },
    {
      id: "dns-database",
      label: "DNS Database",
      render: async (page) => {
        const [databaseData, serverData] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/system/dns-database")),
          fetchJson(vdomUrl("/api/v2/cmdb/system/dns-server")),
        ]);
        const zones = databaseData.results || [];
        const serverResults = serverData.results || [];
        const servers = Array.isArray(serverResults)
          ? serverResults
          : Object.entries(serverResults).map(([key, val]) => (val && typeof val === "object" ? { name: key, ...val } : { name: key, value: val }));

        page.appendChild(el("div", { className: "fui-meta", textContent: `${zones.length} DNS database zones, ${servers.length} DNS server entries` }));
        page.appendChild(el("h2", { textContent: "DNS Database Zones" }));
        page.appendChild(table(zones, [
          { label: "Name", key: "name" },
          { label: "Domain", key: "domain" },
          { label: "Status", render: (row) => enabled(row.status) },
          { label: "Type", key: "type" },
          { label: "View", key: "view" },
          { label: "Authoritative", key: "authoritative" },
          { label: "TTL", key: "ttl" },
          { label: "Primary IP", key: "ip-primary" },
          { label: "Forwarder", key: "forwarder" },
          { label: "DNS Entries", render: dnsEntries },
          { label: "CLI", render: (row) => cliDetails(cliConfig("system dns-database", row.name, row)) },
          { label: "Raw", render: rawDetails },
        ], "No DNS database zones configured."));
        page.appendChild(el("h2", { textContent: "DNS Server" }));
        page.appendChild(table(servers, [
          { label: "Name", key: "name" },
          { label: "Mode", key: "mode" },
          { label: "Interface", key: "interface" },
          { label: "DNS Filter", key: "dnsfilter-profile" },
          { label: "Value", key: "value" },
          { label: "CLI", render: (row) => cliDetails(cliConfig("system dns-server", firstValue(row.name, row.interface), row)) },
          { label: "Raw", render: rawDetails },
        ], "No DNS server entries found."));
      },
    },
    {
      id: "syslog-settings",
      label: "Syslog Settings",
      render: async (page) => {
        const slots = [
          { slot: 1, path: "log.syslogd" },
          { slot: 2, path: "log.syslogd2" },
          { slot: 3, path: "log.syslogd3" },
          { slot: 4, path: "log.syslogd4" },
          { slot: 5, path: "log.syslogd5" },
        ];
        const rows = await Promise.all(slots.map(async (slot) => {
          const [settingData, filterData] = await Promise.all([
            fetchJsonOptional(vdomUrl(`/api/v2/cmdb/${slot.path}/setting`)),
            fetchJsonOptional(vdomUrl(`/api/v2/cmdb/${slot.path}/filter`)),
          ]);
          const setting = settingData.results || {};
          const filter = filterData.results || {};
          const filterItems = Object.entries(filter)
            .filter(([key, val]) => !["q_origin_key"].includes(key) && val !== undefined && val !== null && val !== "")
            .map(([key, val]) => `${key}: ${value(val)}`)
            .join("\n") || "-";

          return {
            slot: `syslogd${slot.slot === 1 ? "" : slot.slot}`,
            available: !(settingData.unavailable || filterData.unavailable),
            settingStatus: settingData.httpStatus,
            filterStatus: filterData.httpStatus,
            setting,
            filter,
            filterItems,
          };
        }));

        page.appendChild(el("div", { className: "fui-meta", textContent: `${rows.filter((row) => row.available).length} available syslog slots, ${rows.length} checked` }));
        page.appendChild(table(rows, [
          { label: "Slot", key: "slot" },
          { label: "API", render: (row) => row.available ? badge("available") : badge(`HTTP ${row.settingStatus || row.filterStatus}`) },
          { label: "Status", render: (row) => row.available ? enabled(row.setting.status) : "-" },
          { label: "Server", render: (row) => row.setting.server },
          { label: "Port", render: (row) => row.setting.port },
          { label: "Mode", render: (row) => row.setting.mode },
          { label: "Facility", render: (row) => row.setting.facility },
          { label: "Format", render: (row) => row.setting.format },
          { label: "Priority", render: (row) => row.setting.priority },
          { label: "Source IP", render: (row) => row.setting["source-ip"] },
          { label: "Interface", render: (row) => firstValue(row.setting.interface, row.setting["interface-select-method"]) },
          { label: "Reliable/Encrypt", render: (row) => firstValue(row.setting["enc-algorithm"], row.setting.reliable) },
          { label: "Filters", key: "filterItems" },
          { label: "CLI", render: (row) => row.available ? cliDetails([
            cliConfig(`log.${row.slot} setting`, null, row.setting),
            "",
            cliConfig(`log.${row.slot} filter`, null, row.filter),
          ]) : cliCommands(`# ${row.slot} is not available on this FortiOS build`) },
          { label: "Raw", render: (row) => rawDetails({ setting: row.setting, filter: row.filter }) },
        ], "No syslog slots found."));
      },
    },
    {
      id: "session-helper",
      label: "Session Helper",
      render: async (page) => {
        const helperData = await fetchJson(vdomUrl("/api/v2/cmdb/system/session-helper"));
        const rows = helperData.results || [];
        const protocols = { 1: "icmp", 6: "tcp", 17: "udp", 47: "gre", 50: "esp", 51: "ah" };

        page.appendChild(el("div", { className: "fui-meta", textContent: `${rows.length} session helpers` }));
        page.appendChild(table(rows, [
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Protocol", render: (row) => `${firstValue(row.protocol)}${protocols[row.protocol] ? ` (${protocols[row.protocol]})` : ""}` },
          { label: "Port", key: "port" },
          { label: "Status", render: (row) => row.status ? enabled(row.status) : "-" },
          { label: "Comments", key: "comments" },
          { label: "CLI", render: (row) => cliDetails(cliConfig("system session-helper", row.id, row)) },
          { label: "Raw", render: rawDetails },
        ], "No session helpers found."));
      },
    },
    {
      id: "firewall-policy",
      label: "Firewall Policy",
      render: async (page) => {
        const [policyData, meta] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/firewall/policy?datasource=1")),
          policyMeta(getVdom()),
        ]);
        const rows = policyData.results || [];
        const state = policyViewState;
        const optionSummaries = new Map();
        const visibleKeys = new Set(["policyid", "status", "name", "srcintf", "dstintf", "srcaddr", "dstaddr", "service", "schedule", "action", "nat", "logtraffic", "comments"]);
        const intfNames = (input) => names(input).split("\n").filter((name) => name !== "-");
        const hiddenChangesByRow = new Map(rows.map((row) => [row, policyOptionRows(row, meta).filter((option) => option.hiddenChanged)]));
        const hasDefaults = Object.keys(meta.defaults).length > 0;
        const columns = [
          { label: "ID", key: "policyid" },
          { label: "Status", render: (row) => enabled(row.status) },
          { label: "Name", key: "name" },
          { label: "Source Interface", render: (row) => names(row.srcintf) },
          { label: "Destination Interface", render: (row) => names(row.dstintf) },
          { label: "Source", render: (row) => names(row.srcaddr) },
          { label: "Destination", render: (row) => names(row.dstaddr) },
          { label: "Service", render: (row) => names(row.service) },
          { label: "Schedule", render: (row) => names(row.schedule) },
          { label: "Action", render: (row) => badge(row.action) },
          { label: "NAT", key: "nat" },
          { label: "Log", key: "logtraffic" },
          { label: "Comments", key: "comments" },
          { label: "All Options", render: (row) => {
            const details = lazyDetails("Show all options", () => policyOptionsView(row, meta, state.query));
            optionSummaries.set(row, details.firstChild);
            const hiddenChanges = hiddenChangesByRow.get(row);
            if (!hiddenChanges.length) return details;
            return el("div", {}, [
              el("div", {
                className: "fui-hidden-changes",
                title: "Non-default values of options that are not visible in the FortiGate GUI",
              }, hiddenChanges.map((option) => el("div", { textContent: `${option.key}: ${option.text}` }))),
              details,
            ]);
          } },
          { label: "CLI", render: (row) => cliDetails(cliConfig("firewall policy", row.policyid, row)) },
          { label: "Raw", render: rawDetails },
        ];

        if (!rows.length) {
          page.appendChild(table(rows, columns, "No firewall policies found."));
          return;
        }

        const entries = rows.map((row) => {
          const src = intfNames(row.srcintf);
          const dst = intfNames(row.dstintf);
          return {
            row,
            src,
            dst,
            pair: `${src.join(", ") || "-"} \u2192 ${dst.join(", ") || "-"}`,
            tr: tableRow(row, columns),
            hiddenChanges: hiddenChangesByRow.get(row),
            options: Object.entries(row)
              .filter(([key]) => !optionSkip.has(key))
              .map(([key, raw]) => ({ key, text: (/secret|passwd|password|psk|ddns-key/i.test(key) ? "[hidden]" : optionText(raw)).toLowerCase() })),
          };
        });
        const groups = [];
        const groupByPair = new Map();
        for (const entry of entries) {
          if (!groupByPair.has(entry.pair)) {
            const group = { pair: entry.pair, entries: [], count: el("span", { className: "fui-pair-count" }), hiddenCount: el("span", { className: "fui-pair-hidden-count" }), tbody: el("tbody") };
            group.header = el("tr", {
              className: "fui-pair-header",
              onclick: () => {
                if (state.collapsed.has(group.pair)) state.collapsed.delete(group.pair);
                else state.collapsed.add(group.pair);
                apply();
              },
            }, el("td", { colspan: String(columns.length) }, [
              el("span", { className: "fui-pair-caret", textContent: "\u25B8" }),
              group.pair,
              group.count,
              group.hiddenCount,
            ]));
            groupByPair.set(entry.pair, group);
            groups.push(group);
          }
          groupByPair.get(entry.pair).entries.push(entry);
        }

        let searchTimer = null;
        const search = el("input", {
          type: "search",
          value: state.query,
          placeholder: "Search all policy options... e.g. ac-monitor  nat=enable  \"vpn zugriff\"",
          oninput: () => {
            state.query = search.value;
            clearTimeout(searchTimer);
            searchTimer = setTimeout(apply, 60);
          },
          onkeydown: (event) => {
            event.stopPropagation();
            if (event.key !== "Escape") return;
            search.value = "";
            state.query = "";
            apply();
          },
        });
        const interfaceSelect = (label, list, stateKey) => {
          const options = [...new Set(list)].sort((a, b) => a.localeCompare(b));
          if (!options.includes(state[stateKey])) state[stateKey] = "";
          return el("label", {}, [`${label} `, el("select", {
            onchange: (event) => {
              state[stateKey] = event.target.value;
              apply();
            },
          }, [
            el("option", { value: "", textContent: "All" }),
            ...options.map((name) => el("option", { value: name, textContent: name, ...(state[stateKey] === name ? { selected: "" } : {}) })),
          ])]);
        };
        const viewButtons = [["list", "List"], ["pair", "Interface Pair View"]].map(([view, label]) => el("button", {
          type: "button",
          dataset: { view },
          onclick: () => {
            state.view = view;
            layout();
          },
        }, label));
        const pairButtons = el("span", { className: "fui-segmented" }, [
          el("button", { type: "button", onclick: () => { state.collapsed.clear(); apply(); } }, "Expand all"),
          el("button", { type: "button", onclick: () => { groups.forEach((group) => state.collapsed.add(group.pair)); apply(); } }, "Collapse all"),
        ]);
        const policiesWithHiddenChanges = entries.filter((entry) => entry.hiddenChanges.length).length;
        const nonDefaultToggle = el("label", {
          className: "fui-nondefault-toggle",
          title: hasDefaults ? "Show only policies with non-default values in options that are not visible in the FortiGate GUI" : "Default values are unavailable on this FortiOS build",
        }, [
          el("input", {
            type: "checkbox",
            ...(state.nonDefault ? { checked: "" } : {}),
            ...(hasDefaults ? {} : { disabled: "" }),
            onchange: (event) => {
              state.nonDefault = event.target.checked;
              apply();
            },
          }),
          ` Find non-default values (${policiesWithHiddenChanges})`,
        ]);
        const counter = el("div", { className: "fui-meta" });
        const empty = el("div", { className: "fui-empty", textContent: "No policies match the current search/filter." });
        const policyTable = el("table", {}, el("thead", {}, el("tr", {}, columns.map((column) => el("th", { textContent: column.label })))));

        function apply() {
          const terms = parseQuery(state.query);
          const words = queryWords(terms);
          let shown = 0;
          for (const entry of entries) {
            const hits = new Set();
            entry.tr.classList.toggle("fui-policy-hidden-changes", entry.hiddenChanges.length > 0);
            entry.visible = (!state.nonDefault || entry.hiddenChanges.length > 0)
              && (!state.srcintf || entry.src.includes(state.srcintf))
              && (!state.dstintf || entry.dst.includes(state.dstintf))
              && terms.every((term) => {
                const matched = entry.options.filter((option) => termMatches(term, option.key, option.text, false));
                matched.forEach((option) => hits.add(option.key));
                return matched.length > 0;
              });
            if (!entry.visible) continue;
            shown += 1;
            const hiddenHits = [...hits].filter((key) => !visibleKeys.has(key));
            optionSummaries.get(entry.row).textContent = hiddenHits.length ? `Show all options (match: ${hiddenHits.join(", ")})` : "Show all options";
            highlight(entry.tr, words, "details");
          }
          for (const group of groups) {
            const collapsed = state.view === "pair" && state.collapsed.has(group.pair);
            const visible = group.entries.filter((entry) => entry.visible).length;
            group.header.dataset.collapsed = String(collapsed);
            group.header.style.display = visible ? "" : "none";
            group.count.textContent = visible === group.entries.length ? `${visible}` : `${visible} of ${group.entries.length}`;
            const hiddenPolicies = group.entries.filter((entry) => entry.visible && entry.hiddenChanges.length).length;
            group.hiddenCount.textContent = hiddenPolicies ? `${hiddenPolicies} non-default` : "";
            group.hiddenCount.style.display = hiddenPolicies ? "" : "none";
            for (const entry of group.entries) entry.tr.style.display = entry.visible && !collapsed ? "" : "none";
          }
          viewButtons.forEach((button) => { button.dataset.active = String(button.dataset.view === state.view); });
          pairButtons.style.display = state.view === "pair" ? "" : "none";
          const pairCount = groups.filter((group) => group.entries.some((entry) => entry.visible)).length;
          counter.textContent = `${shown} of ${rows.length} firewall policies shown, ${pairCount} of ${groups.length} interface pairs, ${policiesWithHiddenChanges} with non-default CLI-only options`;
          empty.style.display = shown ? "none" : "";
        }
        function layout() {
          policyTable.querySelectorAll("tbody").forEach((tbody) => tbody.remove());
          if (state.view === "pair") {
            for (const group of groups) {
              group.tbody.replaceChildren(group.header, ...group.entries.map((entry) => entry.tr));
              policyTable.appendChild(group.tbody);
            }
          } else {
            policyTable.appendChild(el("tbody", {}, entries.map((entry) => entry.tr)));
          }
          apply();
        }

        page.appendChild(el("div", { className: "fui-policy-toolbar" }, [
          search,
          nonDefaultToggle,
          el("span", { className: "fui-segmented" }, viewButtons),
          interfaceSelect("Source", entries.flatMap((entry) => entry.src), "srcintf"),
          interfaceSelect("Destination", entries.flatMap((entry) => entry.dst), "dstintf"),
          pairButtons,
        ]));
        page.appendChild(counter);
        page.appendChild(policyTable);
        page.appendChild(empty);
        layout();
        setTimeout(() => search.focus(), 0);
      },
    },
    {
      id: "ipsec-details",
      label: "IPsec Details",
      render: async (page) => {
        const [phase1Data, phase2Data, monitorData] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/vpn.ipsec/phase1-interface")),
          fetchJson(vdomUrl("/api/v2/cmdb/vpn.ipsec/phase2-interface")),
          fetchJson(vdomUrl("/api/v2/monitor/vpn/ipsec")),
        ]);
        const phase1List = phase1Data.results || [];
        const phase2List = phase2Data.results || [];
        const monitorList = monitorData.results || [];
        const phase2ByPhase1 = new Map();
        const monitorByName = new Map();
        const proxyStatusByPhase2 = new Map();

        for (const phase2 of phase2List) {
          const key = phase2.phase1name || phase2.name;
          if (!phase2ByPhase1.has(key)) phase2ByPhase1.set(key, []);
          phase2ByPhase1.get(key).push(phase2);
        }
        for (const monitor of monitorList) {
          monitorByName.set(monitor.name, monitor);
          for (const proxy of monitor.proxyid || []) if (proxy.p2name) proxyStatusByPhase2.set(proxy.p2name, proxy.status);
        }

        page.appendChild(el("div", { className: "fui-meta", textContent: `${phase1List.length} Phase1, ${phase2List.length} Phase2, ${monitorList.length} monitor entries` }));
        page.appendChild(table(phase1List, [
          { label: "Status", render: (row) => badge(ipsecStatus(row, phase2ByPhase1.get(row.name) || [], monitorByName, proxyStatusByPhase2)) },
          { label: "Tunnel", key: "name" },
          { label: "Interface", key: "interface" },
          { label: "Remote GW", render: (row) => row["remote-gw"] || row["remotegw-ddns"] },
          { label: "IKE", render: (row) => row["ike-version"] ? `v${row["ike-version"]}` : "-" },
          { label: "Phase1 Proposal", key: "proposal" },
          { label: "P1 DH", key: "dhgrp" },
          { label: "NAT-T", key: "nattraversal" },
          { label: "DPD", render: (row) => `${value(row.dpd)} / ${value(row["dpd-retryinterval"])}s x ${value(row["dpd-retrycount"])}` },
          { label: "Phase2", render: (row) => (phase2ByPhase1.get(row.name) || []).map((phase2) => phase2.name).join("\n") },
          { label: "P2 Proposal", render: (row) => (phase2ByPhase1.get(row.name) || []).map((phase2) => phase2.proposal).join("\n") },
          { label: "Selectors", render: (row) => (phase2ByPhase1.get(row.name) || []).map(phase2Selector).join("\n") },
          { label: "CLI", render: (row) => {
            const phase2List = phase2ByPhase1.get(row.name) || [];
            return cliDetails([
              `show vpn ipsec phase1-interface ${cliQuote(row.name)}`,
              `show vpn ipsec phase2-interface ${cliQuote(row.name)}`,
              `get vpn ike gateway ${cliQuote(row.name)}`,
              `get vpn ipsec tunnel name ${cliQuote(row.name)}`,
              "",
              cliConfig("vpn.ipsec phase1-interface", row.name, row),
              ...phase2List.flatMap((phase2) => ["", cliConfig("vpn.ipsec phase2-interface", phase2.name, phase2)]),
            ]);
          } },
          { label: "Raw", render: (row) => rawDetails({ phase1: row, phase2: phase2ByPhase1.get(row.name) || [], monitor: monitorByName.get(row.name) || null }) },
        ]));
      },
    },
    {
      id: "routing-table",
      label: "Routing Table",
      render: async (page) => {
        const [ipv4Data, ipv6Data] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/monitor/router/ipv4")),
          fetchJson(vdomUrl("/api/v2/monitor/router/ipv6")),
        ]);
        const routeColumns = [
          { label: "Type", key: "type" },
          { label: "Destination", render: (row) => row.ip_mask || row.dst || row.network || row.prefix },
          { label: "Gateway", key: "gateway" },
          { label: "Interface", key: "interface" },
          { label: "Distance", key: "distance" },
          { label: "Metric", key: "metric" },
          { label: "Priority", key: "priority" },
          { label: "VRF", key: "vrf" },
          { label: "CLI", render: (row) => cliCommands(
            "get router info routing-table all",
            row.ip_mask ? `get router info routing-table details ${row.ip_mask.split("/")[0]}` : null,
            row.interface ? `get router info routing-table all | grep ${row.interface}` : null,
          ) },
          { label: "Raw", render: rawDetails },
        ];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${(ipv4Data.results || []).length} IPv4 routes, ${(ipv6Data.results || []).length} IPv6 routes` }));
        page.appendChild(el("h2", { textContent: "IPv4 Routing Table" }));
        page.appendChild(table(ipv4Data.results || [], routeColumns, "No IPv4 routes found."));
        page.appendChild(el("h2", { textContent: "IPv6 Routing Table" }));
        page.appendChild(table(ipv6Data.results || [], routeColumns, "No IPv6 routes found."));
      },
    },
    {
      id: "static-routes",
      label: "Static Routes",
      render: async (page) => {
        const routeData = await fetchJson(vdomUrl("/api/v2/cmdb/router/static"));
        const rows = routeData.results || [];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${rows.length} configured static routes` }));
        page.appendChild(table(rows, [
          { label: "Seq", key: "seq-num" },
          { label: "Status", render: (row) => enabled(row.status) },
          { label: "Destination", key: "dst" },
          { label: "Source", key: "src" },
          { label: "Gateway", key: "gateway" },
          { label: "Device", key: "device" },
          { label: "SD-WAN Zone", render: (row) => names(row["sdwan-zone"]) },
          { label: "Distance", key: "distance" },
          { label: "Priority", key: "priority" },
          { label: "Weight", key: "weight" },
          { label: "Blackhole", key: "blackhole" },
          { label: "Dynamic GW", key: "dynamic-gateway" },
          { label: "VRF", key: "vrf" },
          { label: "Comment", key: "comment" },
          { label: "CLI", render: (row) => cliDetails(cliConfig("router static", row["seq-num"], row)) },
          { label: "Raw", render: rawDetails },
        ], "No static routes configured."));
      },
    },
    {
      id: "policy-routes",
      label: "Policy Routes",
      render: async (page) => {
        const [configData, monitorData] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/router/policy")),
          fetchJson(vdomUrl("/api/v2/monitor/router/policy")),
        ]);
        const config = configData.results || [];
        const monitor = monitorData.results || [];

        page.appendChild(el("div", { className: "fui-meta", textContent: `${config.length} configured policy routes, ${monitor.length} monitor entries` }));
        page.appendChild(el("h2", { textContent: "Configured Policy Routes" }));
        page.appendChild(table(config, [
          { label: "Seq", key: "seq-num" },
          { label: "Status", render: (row) => badge(row.status) },
          { label: "Input Device", key: "input-device" },
          { label: "Source", render: (row) => row.src || row.srcaddr || row["srcaddr-negate"] },
          { label: "Destination", render: (row) => row.dst || row.dstaddr || row["dstaddr-negate"] },
          { label: "Protocol", key: "protocol" },
          { label: "Gateway", key: "gateway" },
          { label: "Output Device", key: "output-device" },
          { label: "Action", key: "action" },
          { label: "Comments", key: "comments" },
          { label: "CLI", render: (row) => cliDetails(cliConfig("router policy", row["seq-num"], row)) },
          { label: "Raw", render: rawDetails },
        ], "No configured policy routes found."));
        page.appendChild(el("h2", { textContent: "Effective Policy Routes" }));
        page.appendChild(table(monitor, [
          { label: "ID", render: (row) => row.id || row.policyid || row["seq-num"] },
          { label: "Input", render: (row) => row.input || row.input_device || row["input-device"] },
          { label: "Output", render: (row) => row.output || row.output_device || row["output-device"] },
          { label: "Gateway", key: "gateway" },
          { label: "Destination", render: (row) => row.dst || row.destination || row.network },
          { label: "CLI", render: () => cliCommands("diagnose firewall proute list", "show router policy") },
          { label: "Raw", render: rawDetails },
        ], "No effective policy routes found."));
      },
    },
    {
      id: "sdwan-status",
      label: "SD-WAN Status",
      render: async (page) => {
        const [configData, memberData, healthData] = await Promise.all([
          fetchJson(vdomUrl("/api/v2/cmdb/system/sdwan")),
          fetchJson(vdomUrl("/api/v2/monitor/virtual-wan/members")),
          fetchJson(vdomUrl("/api/v2/monitor/virtual-wan/health-check")),
        ]);
        const config = configData.results || {};
        const runtimeMembers = Array.isArray(memberData.results) ? Object.assign({}, ...memberData.results) : memberData.results || {};
        const memberRows = (config.members || []).map((member) => ({ ...member, runtime: runtimeMembers[member.interface] || {} }));
        const healthRows = Object.entries(healthData.results || {}).flatMap(([check, members]) => (
          Object.entries(members || {}).map(([member, data]) => ({ check, member, ...data }))
        ));

        page.appendChild(el("div", { className: "fui-meta", textContent: `SD-WAN ${config.status || "unknown"}: ${memberRows.length} members, ${(config["health-check"] || []).length} health checks, ${(config.service || []).length} services` }));
        page.appendChild(el("h2", { textContent: "Members" }));
        page.appendChild(table(memberRows, [
          { label: "Seq", key: "seq-num" },
          { label: "Interface", key: "interface" },
          { label: "Zone", key: "zone" },
          { label: "Status", render: (row) => badge(row.status) },
          { label: "Link", render: (row) => badge(row.runtime.link) },
          { label: "Gateway", key: "gateway" },
          { label: "Priority", key: "priority" },
          { label: "Weight", key: "weight" },
          { label: "Sessions", render: (row) => row.runtime.session },
          { label: "TX", render: (row) => bytes(row.runtime.tx_bytes) },
          { label: "RX", render: (row) => bytes(row.runtime.rx_bytes) },
          { label: "Bandwidth", render: (row) => `${value(row.runtime.tx_bandwidth)} tx / ${value(row.runtime.rx_bandwidth)} rx` },
          { label: "CLI", render: (row) => cliDetails([
            "show system sdwan",
            `diagnose sys sdwan member | grep ${cliQuote(row.interface)}`,
            "",
            cliNestedConfig("system sdwan", "members", row["seq-num"], row, { skip: ["runtime"] }),
          ]) },
          { label: "Raw", render: rawDetails },
        ], "No SD-WAN members found."));
        page.appendChild(el("h2", { textContent: "Health Checks" }));
        page.appendChild(table(healthRows, [
          { label: "Check", key: "check" },
          { label: "Member", key: "member" },
          { label: "Status", render: (row) => badge(row.status || row.state || row.alive) },
          { label: "Latency", render: (row) => row.latency || row.latency_ms || row.delay },
          { label: "Jitter", key: "jitter" },
          { label: "Packet Loss", render: (row) => row.packet_loss || row.packetloss || row.loss },
          { label: "CLI", render: (row) => cliCommands(
            "diagnose sys sdwan health-check",
            row.check ? `diagnose sys sdwan health-check | grep ${cliQuote(row.check)}` : null,
            "show system sdwan",
          ) },
          { label: "Raw", render: rawDetails },
        ], "No SD-WAN health-check monitor data found."));
        page.appendChild(el("h2", { textContent: "Services" }));
        page.appendChild(table(config.service || [], [
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Status", render: (row) => badge(row.status) },
          { label: "Mode", key: "mode" },
          { label: "Priority Members", key: "priority-members" },
          { label: "Dst", render: (row) => row.dst || row.dstaddr || row["internet-service"] },
          { label: "CLI", render: (row) => cliDetails(cliNestedConfig("system sdwan", "service", firstValue(row.id, row.name), row)) },
          { label: "Raw", render: rawDetails },
        ], "No SD-WAN services configured."));
      },
    },
  ];

  function installMenu() {
    const anchor = document.querySelector("nu-nav-entry");
    if (!anchor?.parentElement) {
      alert("FortiGate navigation anchor nu-nav-entry was not found.");
      return;
    }

    const menu = el("li", { id: ids.menu, dataset: { open: "true" } }, [
      el("div", { className: "fui-main" }, [
        el("span", { textContent: "Unhider" }),
        el("span", { className: "fui-caret", textContent: ">" }),
      ]),
      el("ul", { id: ids.submenu }, tools.map((tool) => el("li", {
        className: "fui-tool",
        dataset: { tool: tool.id },
        textContent: tool.label,
        onclick: () => showTool(tool),
      }))),
    ]);

    menu.querySelector(".fui-main").addEventListener("click", () => {
      menu.dataset.open = menu.dataset.open === "true" ? "false" : "true";
    });

    anchor.before(menu);
  }

  const policyEditId = () => {
    const match = `${location.pathname}${location.hash}`.match(/firewall\/policy\/policy\/[^?#]*?edit\/(\d+)(?:[/?#]|$)/);
    return match ? match[1] : null;
  };
  const policyFormHost = () => {
    const root = document.getElementById("ng1-app") || document.body;
    return Array.from(root.querySelectorAll("form"))
      .filter((form) => form.offsetParent !== null)
      .sort((a, b) => b.offsetHeight - a.offsetHeight)[0] || null;
  };
  const policyPanel = (policyId) => {
    const body = el("div");
    const status = el("span");
    const load = async () => {
      status.textContent = "Loading...";
      try {
        const [policyData, meta] = await Promise.all([
          fetchJson(vdomUrl(`/api/v2/cmdb/firewall/policy/${encodeURIComponent(policyId)}`)),
          policyMeta(getVdom()),
        ]);
        const policy = Array.isArray(policyData.results) ? policyData.results[0] : policyData.results;
        if (!policy) throw new Error(`Policy ${policyId} was not found.`);
        body.replaceChildren(policyOptionsView(policy, meta));
        status.textContent = `Loaded ${new Date().toLocaleTimeString()} (saved config)`;
      } catch (error) {
        body.replaceChildren(el("div", { className: "fui-error", textContent: `Failed to load policy options.\n\n${error.message}` }));
        status.textContent = "";
      }
    };
    load();
    return el("div", { id: ids.policyPanel }, el("details", { open: "" }, [
      el("summary", { textContent: `Unhider: all options of policy ${policyId}` }),
      el("div", { className: "fui-policy-panel-meta" }, [
        el("button", { type: "button", onclick: load }, "Refresh"),
        status,
      ]),
      body,
    ]));
  };
  let policyPanelWait = 0;
  const syncPolicyPanel = () => {
    const policyId = document.getElementById(ids.app) ? null : policyEditId();
    const existing = document.getElementById(ids.policyPanel);
    if (!policyId) {
      existing?.remove();
      policyPanelWait = 0;
      return;
    }

    const key = `${getVdom()}:${policyId}`;
    if (existing?.dataset.key === key) return;

    const host = policyFormHost();
    if (!host && policyPanelWait < 3) {
      policyPanelWait += 1;
      return;
    }

    existing?.remove();
    policyPanelWait = 0;
    const panel = policyPanel(policyId);
    panel.dataset.key = key;
    if (host) {
      host.after(panel);
    } else {
      panel.classList.add("fui-floating");
      document.body.appendChild(panel);
    }
  };
  const onDocumentClick = (event) => {
    if (!currentTool || event.target.closest(`#${ids.menu}`) || event.target.closest(`#${ids.app}`)) return;
    if (event.target.closest("nu-nav-entry,a.menu-label")) restoreOriginalUi();
  };

  document.addEventListener("click", onDocumentClick, true);
  const policyPanelTimer = setInterval(syncPolicyPanel, 1000);
  window.__fortiuiUnhider = {
    cleanup: () => {
      clearInterval(policyPanelTimer);
      document.removeEventListener("click", onDocumentClick, true);
      document.getElementById(ids.policyPanel)?.remove();
    },
  };

  installMenu();
  syncPolicyPanel();
})();
