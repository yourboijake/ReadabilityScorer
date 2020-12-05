document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#analyze').onclick = fkscore;
})

var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
var dipthongs = ['igh', 'ey', 'ai', 'oa', 'ou', 'ow', 'ea', 'ee', 'ie', 'oy', 'oi', 'oo', 'ue', 'ay', 'uy'];

function fleschKincaid(s) {
    let nsentences = s.split(".").length;
    let words = s.split(' ');
    let nwords = words.length;
    let nsyll = 0;
    for (i = 0; i < words.length; i++){
        let w = words[i].toLowerCase();
        if (w[w.length - 1] == 'e') {
            nsyll -= 1;
        }
        for (j = 0; j < w.length; j++){
            nsyll += w.split(vowels[j]).length - 1;
        }
        for (j = 0; j < dipthongs.length; j++){
            nsyll -= w.split(dipthongs[j]).length - 1;
        }
    }
    return 206.835 - 1.015*(nwords/nsentences) - 84.6*(nsyll/nwords)
}

function fkscore() {
    let text = document.getElementById('form1');
    let s = text.elements[0].value;
    let score = fleschKincaid(s);
    if (score > 90) {
        var cat = '5th Grade or lower';
    }
    else if (score > 80) {
        var cat = '6th grade';
    }
    else if (score > 70) {
        var cat = '7th grade';
    }
    else if (score > 60) {
        var cat = '8th or 9th grade';
    }
    else if (score > 50) {
        var cat = '10th to 12th grade';
    }
    else if (score > 30) {
        var cat = 'College';
    }
    else if (score > 10) {
        var cat = 'College graduate';
    }
    else {
        var cat = 'Professional';
    }
    score = Number((score).toFixed(2));
    let displayString = 'Your text has a score of <strong>' + score + '</strong>, reprenting a ' + cat + ' reading level';
    document.getElementById('display-score').innerHTML = displayString;
}
