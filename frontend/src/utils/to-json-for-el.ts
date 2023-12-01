export function toJsonForEl<TData = unknown>(el: HTMLElement | null) {
  // Empty Element
  if (!el) {
    console.error("Empty HTMLElement");
    return null;
  }

  // Empty JSON
  const json = el.innerText.trim();
  if (!json) {
    console.error("Empty InnerText");
    return null;
  }

  // Deserialization JSON
  try {
    return JSON.parse(json) as TData;
  } catch (err) {
    console.error(err);
    return null;
  }
}
