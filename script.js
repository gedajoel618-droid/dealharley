const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const modalBackdrop = document.querySelector('#rideModal');
const modalClose = document.querySelector('.modal-close');
const rideForm = document.querySelector('#rideForm');
const successMessage = document.querySelector('#successMessage');
const toast = document.querySelector('#toast');
let toastTimer;

document.querySelector('#year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-open-modal]').forEach(button => button.addEventListener('click', () => openModal()));
function openModal(model = '') {
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (model) document.querySelector('#model').value = model;
  window.setTimeout(() => document.querySelector('#fullName').focus(), 80);
}
function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
document.querySelector('#closeSuccess').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', event => { if (event.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.filter-chip').forEach(item => item.classList.remove('active'));
  chip.classList.add('active');
  const filter = chip.dataset.filter;
  document.querySelectorAll('.motor-card').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

document.querySelectorAll('.favorite').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(saved));
  button.textContent = saved ? '♥' : '♡';
  showToast(saved ? 'Motor ditambahkan ke daftar favorit.' : 'Motor dihapus dari daftar favorit.');
}));

document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => {
  const model = button.dataset.model;
  openModal(model);
}));

rideForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!rideForm.reportValidity()) return;
  rideForm.hidden = true;
  successMessage.hidden = false;
  successMessage.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2500);
}
