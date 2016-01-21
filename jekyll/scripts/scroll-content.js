---
# script to make sure scrollbar-div gets appropriately resized so that
# the scrollbar is always hidden
---

function getScrollBarWidth() {
  var innerp = document.createElement('p');
  innerp.setAttribute("style","width:100%;height:100px;");
  innerp.style.width = "100%";
  innerp.style.height = "100px";

  var outerdiv = document.createElement('div');
  outerdiv.setAttribute("style","position:absolute; " +
      "top:0px; left:0px; visibility:hidden;" +
      "width:100%; height:50px; overflow:hidden;" );
  outerdiv.style.position = "absolute";
  outerdiv.style.top = "0px";
  outerdiv.style.left = "0px";
  outerdiv.style.visibility = "hidden";
  outerdiv.style.width = "100%";
  outerdiv.style.height = "50px";
  outerdiv.style.overflow = "hidden";
  outerdiv.appendChild(innerp);

  document.body.appendChild(outerdiv);
  var widthWithoutScroll = innerp.offsetWidth;
  outerdiv.setAttribute("style","position:absolute; " +
      "top:0px; left:0px; visibility:hidden;" +
      "width:100%; height:50px; overflow:scroll;" );
  outerdiv.style.overflow = "scroll";
  var widthWithScroll = innerp.offsetWidth;

  if (widthWithScroll == widthWithoutScroll) widthWithScroll = innerp.clientWidth;
  return widthWithoutScroll - widthWithScroll;
}

var sbwidth = getScrollBarWidth();

var adjustWidth = function addScrollBarWidth(element) {
  element.setAttribute("style", "width: " + (element.parentElement.offsetWidth+ sbwidth) + "px;");
}

function resizeScrollbarDivs() {
  var scrollbarDivs = document.querySelectorAll(".scrollbar-div");
  console.log("Number of scrollbar divs: " + scrollbarDivs.length);

  [].forEach.call(scrollbarDivs, adjustWidth);
}

var resizeDivs = resizeScrollbarDivs();

resizeScrollbarDivs();
window.addEventListener("resize", resizeScrollbarDivs);

// vim:expandtab:sw=2:ts=2
