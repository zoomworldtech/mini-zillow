const LISTINGS_MANIFEST_URL = '/data/listings/index.json';

async function fetchManifest() {
  const response = await fetch(LISTINGS_MANIFEST_URL);
  if (!response.ok) {
    throw new Error('Unable to load listings manifest');
  }
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.files)) return data.files.map((item) => item.filename || item);
  throw new Error('Invalid listings manifest format');
}

async function fetchListings() {
  const manifest = await fetchManifest();
  const listingPromises = manifest.map(async (file) => {
    const response = await fetch(`/data/listings/${file}`);
    if (!response.ok) {
      throw new Error(`Unable to load listing ${file}`);
    }
    return response.json();
  });
  const listings = await Promise.all(listingPromises);
  return listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function fetchListingById(id) {
  const manifest = await fetchManifest();
  const match = manifest.find((file) => file.replace('.json', '') === id);
  if (!match) return null;
  const response = await fetch(`/data/listings/${match}`);
  if (!response.ok) return null;
  return response.json();
}

function formatPrice(listing) {
  const formatter = new Intl.NumberFormat('en-US');
  return `${listing.currency || '$'}${formatter.format(listing.price)}`;
}

function createIcon(icon) {
  return `<span aria-hidden="true" style="font-weight:700;color:var(--blue-700)">${icon}</span>`;
}

function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

window.ListingsAPI = {
  fetchListings,
  fetchListingById,
  formatPrice,
  createIcon,
  debounce,
  getQueryParam,
};