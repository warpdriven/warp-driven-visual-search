void ((port = 5173) => {
  const reactRefreshTag = document.createElement("script");
  reactRefreshTag.type = "module";
  reactRefreshTag.innerHTML = `
      import RefreshRuntime from "http://localhost:${port}/@react-refresh";
      RefreshRuntime.injectIntoGlobalHook(window);
      window.$RefreshReg$ = () => {};
      window.$RefreshSig$ = () => (type) => type;
      window.__vite_plugin_react_preamble_installed__ = true;
      `;
  const viteTag = document.createElement("script");
  viteTag.type = "module";
  viteTag.src = `http://localhost:${port}/@vite/client`;
  const mainTag = document.createElement("script");
  mainTag.type = "module";
  mainTag.src = `http://localhost:${port}/src/main.tsx`;

  document.body.append(reactRefreshTag, viteTag, mainTag);
})(3002);
