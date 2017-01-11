$.fn.panorama = function (images) {
    this[0].classList.add("image-carousel");
    this[0].style.display = "block";
    this[0].style.width = "100%";
    this[0].style.height = "50vh";
    var imageAdd = document.createElement("div");
    imageAdd.classList.add("image-container");
    imageAdd.style.display = "flex";
    imageAdd.style.overflow = "scroll";
    imageAdd.style.width = "50%";
    imageAdd.style.height = "100%";
    imageAdd.style.margin = "0 auto";
    this[0].append(imageAdd);
    for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
        var image = images_1[_i];
        var imageCreate = document.createElement("img");
        imageCreate.src = image;
        imageCreate.style.height = imageAdd.style.height;
        imageAdd.appendChild(imageCreate);
    }
};
