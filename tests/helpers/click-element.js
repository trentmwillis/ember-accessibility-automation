export default function clickElement(el){
  var ev = document.createEvent("MouseEvent");
  ev.initMouseEvent('click');
  el.dispatchEvent(ev);
}
