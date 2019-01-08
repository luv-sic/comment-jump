const THUMBUP_SELECTOR = 'g-emoji';

const getThumbCount = (el) => {
  return parseInt(el.nextSibling.nodeValue.toString().trim())
}

const getThumbComment = (el) => {
  while(el && el.parentElement) {
    if (el.classList.contains('timeline-comment')) return el;
    el = el.parentElement;
  }
}

const thumbs = Array.from(document.querySelectorAll(THUMBUP_SELECTOR)).filter(el => {
  return el.innerText.trim() === '👍' &&
  getThumbCount(el) >= 1;
}).sort((a, b) => {
  const athunmbCount = getThumbCount(a);
  const bthunmbCount = getThumbCount(b);
  return athunmbCount > bthunmbCount;
})

let index = -1;

hotkeys('ctrl+j,command+j', function(event,handler) {
  index++;
  if (index >= thumbs.length) {
    index = 0;
  }
  const current = getThumbComment(thumbs[index]);
  current.scrollIntoView();
});

console.log('thumbs :', thumbs);