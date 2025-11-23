export const handleSmoothScroll = (e, targetId, callback) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (callback) callback();
  }
};

