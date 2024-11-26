/**
 * @param {ListingGalleryImage[]} images - An array of listing gallery images.
 */
function displayImages(images) {
  images.forEach((image) => {
    console.log(`ID: ${image.id}, URL: ${image.url}`);
  });
}
