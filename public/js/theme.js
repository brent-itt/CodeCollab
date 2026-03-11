// Apply saved theme immediately to prevent flash of wrong mode
(function () {
    if (localStorage.getItem('themeMode') === 'light') {
        document.body.classList.add('light-mode');
    }
})();

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('themeMode', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    // Switch CodeMirror theme if editor is present
    if (typeof codeEditor !== 'undefined' && codeEditor) {
        codeEditor.setOption('theme', isLight ? 'eclipse' : 'dracula');
    }
}

function updateThemeIcon(isLight) {
    document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
        const icon = btn.querySelector('.theme-icon');
        const label = btn.querySelector('.theme-label');
        if (icon) icon.textContent = isLight ? '☀️' : '🌙';
        if (label) label.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    });
    // also support legacy id used on homepage
    const legacyBtn = document.getElementById('themeToggleBtn');
    if (legacyBtn) {
        const icon = legacyBtn.querySelector('.theme-icon');
        const label = legacyBtn.querySelector('.theme-label');
        if (icon) icon.textContent = isLight ? '☀️' : '🌙';
        if (label) label.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const isLight = document.body.classList.contains('light-mode');
    updateThemeIcon(isLight);
});
