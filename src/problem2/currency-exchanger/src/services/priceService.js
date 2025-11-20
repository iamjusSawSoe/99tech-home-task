export async function fetchTokenPrices() {
  const response = await fetch("https://interview.switcheo.com/prices.json");
  return await response.json();
}
