export function toUniqBy<TData>(items: TData[], ops: Partial<Ops> = {}) {
  const { overwrite = false, key = "id" } = ops;

  const map = new Map<unknown, TData>();

  items.forEach((item) => {
    if (typeof item !== "object") {
      console.error("Excepted an object");
      return;
    }

    if (!item) {
      console.error("Excepted an object, got a null!");
      return;
    }

    const mapKey = Reflect.get(item, key);
    if (!mapKey) {
      console.error("mapKey must be a truth, got a falsy!");
      return;
    }

    if (overwrite) {
      map.set(mapKey, item);
      return;
    }

    map.get(mapKey) ?? map.set(mapKey, item);
  });

  return [...map.values()];
}

interface Ops {
  key: string | symbol;
  overwrite: boolean;
}
