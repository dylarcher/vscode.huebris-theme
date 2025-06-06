document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button'); // Changed ID
    const body = document.body;
    const lightModeScreenshots = document.querySelectorAll('.light-mode-screenshot');
    const darkModeScreenshots = document.querySelectorAll('.dark-mode-screenshot');

    const showScreenshots = (theme) => {
        if (theme === 'dark') {
            lightModeScreenshots.forEach(el => el.style.display = 'none');
            darkModeScreenshots.forEach(el => el.style.display = 'block');
        } else {
            lightModeScreenshots.forEach(el => el.style.display = 'block');
            darkModeScreenshots.forEach(el => el.style.display = 'none');
        }
        // TODO: Add logic to update code example styling if necessary (though CSS variables should handle most of this)
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Switch to Light Mode';
        } else {
            body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Switch to Dark Mode';
        }
        showScreenshots(theme);
        // Placeholder for future:
        // updateCodeExamplesTheme(theme);
    };

    // Check localStorage for saved theme preference
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        // If no theme saved, check for system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light'; // Default to light
        }
    }

    applyTheme(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        let newTheme;
        if (body.classList.contains('dark-mode')) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        applyTheme(newColorScheme);
        localStorage.setItem('theme', newColorScheme);
    });
});
