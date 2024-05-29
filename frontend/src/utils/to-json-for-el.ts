export function toJsonForEl<TData = unknown>(el: HTMLElement | null) {
  if (!el) {
    console.error("Empty HTMLElement");
    return null;
  }

  const json = el.innerText.trim();

  if (!json) {
    console.error("Empty InnerText");
    return null;
  }

  try {
    return JSON.parse(json) as TData;
  } catch (err) {
    console.error(err);
    return null;
  }
}
