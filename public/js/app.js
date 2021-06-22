const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = search.value;
    // console.log(location);

    fetch(`/weather?address=${location}`).then((res) => {
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    
    res.json().then((data) => {
        if(data.error) {
            messageOne.textContent = 'Error';
            messageTwo.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
});