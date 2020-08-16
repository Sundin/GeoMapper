$(function () {
  $("body").on("click", ".selectCategory", function (e) {
    console.log("click", e.target.value);
    const selectedCategory = e.target.value;

    Object.keys(categories).forEach((category) => {
      map.removeLayer(categories[category]);
    });
    map.addLayer(categories[selectedCategory]);
  });
});
