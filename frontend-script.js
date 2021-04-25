window.addEventListener('load', () => {
    const inputPort = document.querySelector('#inputPort');
    const requestTypes = document.querySelectorAll('input[name=requestType]');
    const querystring = document.querySelector('#querystring');
    const requestBody = document.querySelector('#requestBody');
    const destinationUrl = document.querySelector('#destinationUrl');
    const buttonRequest = document.querySelector('#buttonRequest');
    const resultDiv = document.querySelector('#resultDiv');

    let url = '';
    let requestType = 'GET';
    update();

    function update() {
        url = `http://localhost:${inputPort.value}/?${querystring.value}`;
        destinationUrl.innerText = `${url} (${requestType})`;
    }

    inputPort.addEventListener('change', update);
    requestTypes.forEach(radio => radio.addEventListener('change', e => {
        requestType = e.target.value;
    }))
    querystring.addEventListener('change', update);
    buttonRequest.addEventListener('click', async () => {
        buttonRequest.disabled = true;
        buttonRequest.innerText = 'Request underway...'
        let body = requestBody.innerText;
        try {
            const response = await fetch(url, {
                method: requestType,
                body: body
            });
            const data = await response.json();
            console.log(data);
            resultDiv.innerText = JSON.stringify(data);
        } catch(error) {
            resultDiv.innerText = 'Error! Do you have a local web server? Do you use the correct port?\n' + error.message;
        } finally {
            buttonRequest.disabled = false;
            buttonRequest.innerText = 'Make request'
        }
    })
})
