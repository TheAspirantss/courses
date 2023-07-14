
const multipleItemCarousel = document.querySelector('#carouselExampleControlsNoTouching');
if(window.matchMedia("(min-width: 576px)").matches){

  var carousel = new bootstrap.Carousel(multipleItemCarousel,{
    interval: false
  })
var crWidth = $('.carousel-inner')[0].scrollWidth;
var cardWidth = $('.carousel-item').width();

var scrollPosition = 0;
console.log(crWidth);
console.log(cardWidth);
$('.carousel-control-next').on('click',function(){
    if(scrollPosition < (crWidth -(cardWidth))){
        // console.log("next");
        scrollPosition += cardWidth;
        $('.carousel-inner').animate({scrollLeft: 
            scrollPosition},600);
    }
    // if(scrollPosition==)
    else{
        scrollPosition=(-316);
    }
    console.log(scrollPosition);
});

$('.carousel-control-prev').on('click',function(){
    if(scrollPosition > 0){
        scrollPosition -= cardWidth;
        $('.carousel-inner').animate({scrollLeft: 
            scrollPosition},600);
    }
});
}
else{
  $(multipleItemCarousel).addClass('slide');
}
