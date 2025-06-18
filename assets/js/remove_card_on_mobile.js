document.addEventListener("DOMContentLoaded", function () {
    console.log("remove_card_on_mobile.js loaded");
    function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    var article = document.querySelector('article.card[itemtype="http://schema.org/BlogPosting"]');
    var blogPostContainer = document.getElementById("blog-post-container");
    if (blogPostContainer) {
      blogPostContainer.style.margin = "0";
    }
    
    var articleCardBody = document.getElementById("article_card_body");
    if (articleCardBody) {
        console.log("Replacing 'card' with 'card-mobile' class for mobile");
        articleCardBody.classList.remove("card");
        articleCardBody.classList.add("card-mobile");
    }
  }
});