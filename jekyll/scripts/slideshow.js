---
#script to get slideshow working
---

var makeSlideshow = function(element, options) {
  var $slideshows = document.querySelectorAll(element),

    $slideshow = {},

    Slideshow = {
      init: function(element, options) {
        this.counter = 0;
        this.element =  element;
        this.$items = element.querySelectorAll('figure');
        this.numItems = this.$items.length;
        options = options || {};
        options.auto = options.auto || false;
        this.opts = {
          auto: (typeof options.auto === "undefined") ? false : options.auto,
          speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
          pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ?  false : options.auto.pauseOnHover,
          swipe: (typeof options.swipe === "undefined") ? false : options.swipe
				};
        this.$items[0].classList.add('slideshow-show');
        this.injectControls(element);
        this.addEventListeners(element);

        if (this.opts.auto) {
          this.autoCycle(this.element, this.opts.speed, this.opts.pauseOnHover);
        }
        if (this.opts.swipe) {
          this.addSwipe(this.element);
        }
      },
      showCurrent: function(i) {
        /*if (i > 0) {
          this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
        } else {
          this.counter = ((this.counter - 1) < 0) ? this.numItems - 1: this.counter - 1;
        }
        this.counter = (this.counter + i) % this.numItems;

        [].forEach.call(this.$items, function(element) {
          element.classList.remove('slideshow-show');
        });

        this.$items[this.counter].classList.add('slideshow-show');*/

        this.$items[this.counter].classList.remove('slideshow-show');
        this.counter = (((this.counter + i) % this.numItems) + this.numItems) % this.numItems;
        this.$items[this.counter].classList.add('slideshow-show');
      },
      injectControls: function(element) {
        var spanPrev = document.createElement("span"),
        spanNext = document.createElement("span"),
        docFrag = document.createDocumentFragment();

        spanPrev.classList.add('slideshow-prev');
        spanNext.classList.add('slideshow-next');

        spanPrev.innerHTML = '&laquo;';
        spanNext.innerHTML = '&raquo;';

        docFrag.appendChild(spanPrev);
        docFrag.appendChild(spanNext);
        element.appendChild(docFrag);
      },
      addEventListeners: function(element) {
        var that = this;

        element.querySelector('.slideshow-next').addEventListener('click', function() {
          that.showCurrent(1);
        }, false);

				element.querySelector('.slideshow-prev').addEventListener('click', function() {
          that.showCurrent(-1);
        }, false);

        element.onkeydown = function (e) {
          e = e || window.event;

          if (e.keyCode === 37) {
            that.showCurrent(-1);
          } else if (e.keyCode === 39) {
            that.showCurrent(1);
          }
        };
      },
      autoCycle: function(element, speed, pauseOnHover) {
        var that = this,
          interval = window.setInterval(function () {
            that.showCurrent(1);
          }, speed);

        if (pauseOnHover) {
          element.addEventListener('mouseover', function() {
            interval = clearInterval(interval);
          }, false);
					
          element.addEventListener('mouseout', function() {
            interval = window.setInterval(function() {
              that.showCurrent(1);
            }, speed);
          }, false);
        }
      },
      addSwipe: function(elements) {
        var that = this,
        ht = new Hammer(element);
        ht.on('swiperight', function(e) {
          that.showCurrent(-1);
        });
        ht.on('swipeleft', function(e) {
          that.showCurrent(1);
        });
      },
    };
  [].forEach.call($slideshows, function(element) {
    $slideshow = Object.create(Slideshow);
    $slideshow.init(element, options);
  });
};

var opts = {
  auto: {
    speed: 3000,
    pauseOnHover: true
  },
  swipe: true
};

makeSlideshow('.welcomeslides', opts);

// vim:expandtab:ts=2:sw=2
