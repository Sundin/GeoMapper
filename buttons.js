$(function () {
  $("body").on("click", ".selectCategory", function (e) {
    const selectedCategory = e.target.value;

    Object.keys(categories).forEach((category) => {
      map.removeLayer(categories[category]);
    });
    map.addLayer(categories[selectedCategory]);
  });
});

$("body").on("click", ".showAllCategories", function () {
  Object.keys(categories).forEach((category) => {
    map.removeLayer(categories[category]);
  });
  Object.keys(categories).forEach((category) => {
    map.addLayer(categories[category]);
  });
});
