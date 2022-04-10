
function init()
{
    console.log("WHY U HERE ?");
    const url = 'https://script.google.com/macros/s/AKfycbxzZzB4DsV_tqMXnqUdyw15uByfmej_uOjEyqMMZt6oPOWMN3krcP7aok9_AD8d1go99g/exec';
    
    fetch(url)
    .then(res => res.json())
    .then(res => {
        const datas = res[0]?.data?.privacypolicy;
        if(datas && datas.length > 0) {
            datas.forEach(datas => {
                const text = datas?.text;

                if(!text) {
                    return;
                }
                const privacyElement = document.getElementById("privacy-content");
                privacyElement.innerHTML += `${text}`;

                const date = datas?.date;

                if(!date) {
                    return;
                }
                const d = new Date(date);
                const privacyDateElement = document.getElementById("privacy-date");
                privacyDateElement.innerHTML = `${d.toLocaleDateString()}`;
            });
        }
    })
    .then(res => {
        const element = document.getElementById("loading");
        element.remove();

        const bodyElemeny = document.body;
        bodyElemeny.classList.remove('stop-scrolling');

        const welcomeElemeny = document.getElementById("welcome");
        welcomeElemeny.classList.add('intro-y');

        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
