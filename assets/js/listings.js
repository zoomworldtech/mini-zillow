document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('listings-grid');
  const countLabel = document.getElementById('result-count');
  const searchInput = document.getElementById('search-input');
  const notice = document.getElementById('listings-notice');

  function renderListings(listings) {
    grid.innerHTML = '';
    if (!listings.length) {
      grid.innerHTML = '<p>No listings found. Try a different search.</p>';
      countLabel.textContent = '0 results';
      return;
    }
    const items = listings
      .map((listing) => {
        const { formatPrice, createIcon } = window.ListingsAPI;
        return `
          <article class="card" role="button" tabindex="0" data-id="${listing.id}">
            <img src="${listing.images?.[0] || '/assets/img/sample1.jpg'}" alt="${listing.title}">
            <div class="meta">
              <span class="price">${formatPrice(listing)}</span>
              <span class="badge">${createIcon('📍')}${listing.city}, ${listing.state}</span>
            </div>
            <h3>${listing.title}</h3>
            <div class="meta">
              <span>${createIcon('🛏️')}${listing.beds} beds</span>
              <span>${createIcon('🛁')}${listing.baths} baths</span>
              <span>${createIcon('📐')}${listing.sqft} sqft</span>
            </div>
          </article>
        `;
      })
      .join('');
    grid.innerHTML = items;
    countLabel.textContent = `${listings.length} result${listings.length === 1 ? '' : 's'}`;

    grid.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        window.location.href = `/listing.html?id=${id}`;
      });
      card.addEventListener('keypress', (evt) => {
        if (evt.key === 'Enter') card.click();
      });
    });
  }

  function filterListings(listings, term) {
    const value = term.trim().toLowerCase();
    if (!value) return listings;
    return listings.filter((listing) => {
      const haystack = [listing.title, listing.address, listing.city, listing.state]
        .join(' ')
        .toLowerCase();
      return haystack.includes(value);
    });
  }

  async function loadListings() {
    try {
      const listings = await window.ListingsAPI.fetchListings();
      let initial = listings;
      const searchParam = new URLSearchParams(window.location.search).get('search');
      if (searchParam && searchInput) {
        searchInput.value = searchParam;
        initial = filterListings(listings, searchParam);
      }
      renderListings(initial);

      const handleSearch = window.ListingsAPI.debounce((event) => {
        const filtered = filterListings(listings, event.target.value || '');
        renderListings(filtered);
      }, 200);

      searchInput?.addEventListener('input', handleSearch);
    } catch (error) {
      console.error(error);
      notice.textContent = 'Unable to load listings right now. Please refresh.';
      notice.classList.add('alert', 'info');
    }
  }

  loadListings();
});