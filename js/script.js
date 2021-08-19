// ------------------------------   Portfolio Gallery  -----------------------------------------
const galleryRefresh=()=>{
    const gallery=document.querySelector("#portfolio .grid");
    const masonry =new Masonry(gallery,{
        itemSelector:".grid-item"
    });
}


const linksList = document.querySelector('#portfolio .options');
const links = document.querySelectorAll('#portfolio .options li button');
linksList.addEventListener("click",function(event){
    links.forEach(function(item){ // Remove active class from all buttons
        item.classList.remove("active")
    });
    event.target.classList.add("active");
    const allItems=document.querySelectorAll("#portfolio .img-container");
    if(event.target.dataset.filter){
        if(event.target.dataset.filter==="all"){
            allItems.forEach(function(item){
                item.classList.remove("remove");
                setTimeout(function(){
                    item.classList.remove("hide");
                    galleryRefresh();
                },0);
            })
        }else{
            allItems.forEach(function(item){
                const [...classes]=item.classList;
               if(!classes.includes(event.target.dataset.filter))
               {
                item.classList.add("hide");
                setTimeout(function(){
                    item.classList.add("remove");
                    galleryRefresh();
                },0);
               }
               else{
                item.classList.remove("remove");
                galleryRefresh();
                setTimeout(function(){
                    item.classList.remove("hide");
                    galleryRefresh();
                },0);
               }
               
            })
        }
    }
   
 })

 
// ------------------------------  NavBar Scroll  -----------------------------------------
const navBar=document.getElementById("navigationBar");
window.onscroll=function (){
let top=window.scrollY;
if(top>=100){
    navBar.classList.add("bg-dark");
}else{
    navBar.classList.remove("bg-dark");
    }
}

const navBarList=document.getElementById("navbarSupportedContent");
const navbarTogglerBtn=navBar.querySelector(".navbar-toggler");
navBarList.addEventListener("click",function(){
    navBarList.classList.remove("show");
    navbarTogglerBtn.classList.add("collapsed");
});

// ------------------------------  Animated Typing   -----------------------------------------
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    galleryRefresh();
};
