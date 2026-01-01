document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get('listing');
  const listingField = document.querySelector('input[name="listingId"]');
  const heading = document.getElementById('application-heading');
  const successBox = document.getElementById('success-box');

  if (listingId && listingField) {
    listingField.value = listingId;
    heading.textContent = `Rental Application ${listingId ? `for ${listingId}` : ''}`;
  }

  if (window.location.search.includes('success=true')) {
    successBox.style.display = 'block';
    successBox.focus();
  }
});