
export function storeLocal(key: string, obj: object)  // Create item:
{
  localStorage.setItem(key, JSON.stringify(obj));
}

export function readLocal<ReturnType>(key?): ReturnType | undefined // Read item:
{
  const item = localStorage.getItem(key)
  if (item !== null)
  {
    const itemParse = JSON.parse(item);
    return itemParse as ReturnType;
  }
  return
}

