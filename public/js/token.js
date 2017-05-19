$(document).ready(function() {
    var token = $('#token').text();
    $.cookie("x-access-token", token, { expires : 1, path: '/' });
    window.location.href = '/homepage';
});
