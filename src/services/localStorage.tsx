
export function storeLocal(key: string, obj: object)  // Create item:
{
  storeLocalRaw(key, JSON.stringify(obj));
}
export function storeLocalRaw(key: string, data:string){
  localStorage.setItem(key, data)
}
export function readLocalRaw(key : string) : string | undefined{
  return localStorage.getItem(key) || undefined
}
export function readLocal<ReturnType>(key:string): ReturnType | undefined // Read item:
{
  const item = readLocalRaw(key)
  if (item !== undefined)
  {
    const itemParse = JSON.parse(item);
    return itemParse as ReturnType;
  }
  return
}

export function removeLocal(key: string) {
  localStorage.removeItem(key);
}

export function removeLocalAll() {
  localStorage.clear()
}

