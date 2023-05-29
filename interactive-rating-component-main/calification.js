const element1 = document.getElementById('rating1');
const element2 = document.getElementById('rating2');
const element3 = document.getElementById('rating3');
const element4 = document.getElementById('rating4');
const element5 = document.getElementById('rating5');

element1.addEventlistener('click',function(){
    element1.classList.add('rating-back')
})