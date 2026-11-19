const controls = document.querySelector('#filters');
const buttons = Array.from(controls.querySelectorAll('button'));
const days = Array.from(document.querySelectorAll('.timeline-day'));
const status = document.querySelector('#filter-status');

function filterTimeline(activeButton) {
  const filter = activeButton.dataset.filter;
  let eventCount = 0;

  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === activeButton));
  });

  days.forEach((day) => {
    const events = Array.from(day.querySelectorAll('[data-kind]'));
    const matches = events.filter((event) => {
      const visible = filter === 'all' || event.dataset.kind === filter;
      event.hidden = !visible;
      return visible;
    });
    day.hidden = matches.length === 0;
    eventCount += matches.length;
  });

  status.textContent = eventCount === 1
    ? 'Showing 1 entry.'
    : `Showing ${eventCount} entries.`;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => filterTimeline(button));
});

controls.hidden = false;
