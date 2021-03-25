import Flipping from 'flipping';
const elPrevButton = document.querySelector('#prev');
const elNextButton = document.querySelector('#next');
const flipping = new Flipping();

const elImages = Array.from(document.querySelectorAll('.ui-big-image'));
const elThumbnails = Array.from(document.querySelectorAll('.ui-thumbnail'));

let state = {
  photo: 0
};

function send(event) {
  const elActives = document.querySelectorAll('[data-active]');
  flipping.read();
  Array.from(elActives)
    .forEach(el => el.removeAttribute('data-active'));

    switch (event) {
      case 'PREV':
        state.photo--;  // = Math.max(state.photo - 1, 0);
        break;
      case 'NEXT':
        state.photo++;  // = Math.min(state.photo + 1, elImages.length);
        break;
      default:
        state.photo = +event;
        break;
    }

    console.log(state.photo);

    var len = elImages.length;
    state.photo = Math.max(0, Math.min( state.photo, len - 1) );
    //Loop
    //elImages[((state.photo % len) + len ) % len];

    Array.from(document.querySelectorAll(`[data-key="${state.photo}"]`))
      .forEach( el => {
        el.setAttribute('data-active', true);
    });

    //execute flip animation
    flipping.flip();
}    

elThumbnails.forEach( thumb => {
  thumb.addEventListener('click', () => {send(thumb.dataset.key); });
});

elPrevButton.addEventListener('click', () => {
  send('PREV');
});

elNextButton.addEventListener('click', () => {
  send('NEXT');
});

send(0);
