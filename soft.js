document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.querySelector('.theme-switch');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme);
  themeSwitch.classList.toggle('dark-theme', savedTheme === 'dark');

  themeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      themeSwitch.classList.toggle('dark-theme');
      const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
  });
});