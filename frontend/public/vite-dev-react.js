void ((port = 5173) => {
  const reactRefreshTag = document.createElement("script");
  reactRefreshTag.type = "module";
  reactRefreshTag.innerHTML = `
      import RefreshRuntime from "http://localhost:${port}/@react-refresh";
      RefreshRuntime.injectIntoGlobalHook(window);
      window.$RefreshReg$ = () => {};
      window.$RefreshSig$ = () => (type) => type;
      window.__vite_plugin_react_preamble_installed__ = true;`;

  const viteTag = document.createElement("script");
  viteTag.type = "module";
  viteTag.src = `http://localhost:${port}/@vite/client`;

  const settings = (() => {
    try {
      const settingsEl = document.getElementById(
        "warpdriven-recs-json-settings-main"
      );
      return JSON.parse(settingsEl.innerText.trim());
    } catch (error) {
      console.error(error);

      return null;
    }
  })();

  if (!settings) return;

  const mainTag = document.createElement("script");
  mainTag.type = "module";

  switch (settings.page_type) {
    case "admin":
      mainTag.src = `http://localhost:${port}/src/mainAdmin.tsx`;
      break;
    case "product":
      mainTag.src = `http://localhost:${port}/src/mainSite.tsx`;
      break;
    default:
      return;
  }

  document.body.append(reactRefreshTag, viteTag, mainTag);
})(3002);
