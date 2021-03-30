function troca() {
    var calcBody = document.getElementById("calcMain");
    var histBody = document.getElementById('history');

    calcBody.classList.toggle("hidden")
    histBody.style.display = "block";
}

$('#button').on('click', function(e) {
    $('.calcMain').toggleClass('hidden');
    $('.history-page').toggleClass('not-hidden');
    $('#button').toggleClass('buttonSelected');
    e.preventDefault();
});

