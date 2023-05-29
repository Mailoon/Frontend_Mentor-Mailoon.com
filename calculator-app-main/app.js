const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () =>{
    document.body.classList.toggle('themeClass1');
    btnSwitch.classList.toggle('active');
})