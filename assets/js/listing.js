document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get('id');
  const container = document.getElementById('listing-container');
  const galleryTrack = document.getElementById('gallery-track');
  const gallery = document.querySelector('.gallery');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  let slide = 0;
  let slidesCount = 0;

  if (!listingId) {
    container.innerHTML = '<p class="alert info">Missing listing id.</p>';
    return;
  }

  function updateCarousel(index) {
    if (!galleryTrack) return;
    slide = (index + slidesCount) % slidesCount;
    galleryTrack.style.transform = `translateX(-${slide * 100}%)`;
  }

  function buildImages(images = []) {
    if (!images.length) {
      galleryTrack.innerHTML = '<img src="/assets/img/sample1.jpg" alt="Listing image placeholder">';
      slidesCount = 1;
      return;
    }
    slidesCount = images.length;
    galleryTrack.innerHTML = images
      .map((img, idx) => `<img src="${img}" alt="Listing image ${idx + 1}">`)
      .join('');
  }

  function renderListing(listing) {
    const { formatPrice, createIcon } = window.ListingsAPI;
    buildImages(listing.images);

    if (prevBtn && nextBtn && slidesCount > 1) {
      prevBtn.addEventListener('click', () => updateCarousel(slide - 1));
      nextBtn.addEventListener('click', () => updateCarousel(slide + 1));
    } else {
      prevBtn?.remove();
      nextBtn?.remove();
    }

    container.innerHTML = `
      <div class="listing-header">
        <div>
          <h1>${listing.title}</h1>
          <div class="meta">
            <span class="price">${formatPrice(listing)}</span>
            <span class="badge">${createIcon('📍')}${listing.address}, ${listing.city}, ${listing.state}</span>
            <span class="badge">${listing.status}</span>
          </div>
          <div class="stats">
            <span class="stat">${createIcon('🛏️')}${listing.beds} beds</span>
            <span class="stat">${createIcon('🛁')}${listing.baths} baths</span>
            <span class="stat">${createIcon('📐')}${listing.sqft} sqft</span>
          </div>
          <p style="color:var(--neutral-700);line-height:1.7">${listing.description}</p>
          <div class="inline-field" style="gap:0.75rem; margin-top:1rem; flex-wrap:wrap;">
            <a class="button" href="/application.html?listing=${listing.id}">Book Tour</a>
            <a class="btn-secondary" href="/listings.html">Back to listings</a>
          </div>
        </div>
        <div class="key-facts">
          <h3>Key facts</h3>
          <ul>
            <li>${createIcon('🏷️')}Status: ${listing.status}</li>
            <li>${createIcon('📅')}Added: ${new Date(listing.createdAt).toLocaleDateString()}</li>
            <li>${createIcon('📍')}Location: ${listing.city}, ${listing.state} ${listing.zip}</li>
            <li>${createIcon('💵')}Price: ${formatPrice(listing)}</li>
          </ul>
        </div>
      </div>
    `;
  }

  async function loadListing() {
    try {
      const listing = await window.ListingsAPI.fetchListingById(listingId);
      if (!listing) throw new Error('Not found');
      renderListing(listing);
      updateCarousel(0);
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p class="alert info">Listing not found. Return to <a href="/listings.html">all listings</a>.</p>';
      gallery?.remove();
    }
  }

  loadListing();
});