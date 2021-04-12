$('#themeSelect').on('change', function() {
    setTheme($(this).val())
})

function setTheme(theme) {
    $('#themeSelect').val(theme)
    localStorage.setItem('theme', theme)
    $('html').attr('theme', theme)
}

setTheme(localStorage.getItem('theme'))