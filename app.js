
function init()
{
    console.log("WHY U HERE ?");
    const url = 'https://script.google.com/macros/s/AKfycbxzZzB4DsV_tqMXnqUdyw15uByfmej_uOjEyqMMZt6oPOWMN3krcP7aok9_AD8d1go99g/exec';
    
    fetch(url)
    .then(res => res.json())
    .then(res => {
        const streamers = res[0]?.data?.streamer;
        if(streamers && streamers.length > 0) {
            streamers.forEach(streamer => {
                const name = streamer?.name;

                if(!name) {
                    return;
                }

                const imageurl = streamer?.imageurl;

                const quote = streamer?.quote;
                let quoteElement = '';
                if(quote) {
                    quoteElement = `<p class="text-gray-600">"${quote}"</p>`;
                }

                const streamerElement = document.getElementById("streamer");
                streamerElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 w-full xl:w-1/2 intro-y">
                        <div class="p-6 flex rounded-md bg-white zoom-in">
                            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-4 md:mr-6 flex-shrink-0">
                                <img src="${imageurl !== '' ? imageurl : 'noavatar.png'}" alt="profile image" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <div class="text-gray-900 font-bold uppercase mt-6 text-lg"> ${name}</div>
                                ${quoteElement}
                                ${buildStreamingElement(streamer)}
                                ${buildSocialMediaElement(streamer)}
                                ${buildDonationElement(streamer)}
                            </div>
                        </div>
                    </div>
                `;
            });
        }else {
            const streamerWrapperElement = document.getElementById("streamerwrapper");
            streamerWrapperElement.remove();
        }

        const staffs = res[0]?.data?.staff;
        if(staffs && staffs.length > 0) {
            staffs.forEach(staff => {
                const name = staff?.name;

                if(!name) {
                    return;
                }

                const staffElement = document.getElementById("staff");
                staffElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-6 xl:col-span-4 w-full intro-y">
                        <div class="p-6 flex rounded-md bg-white zoom-in justify-center items-center">
                            <div class="text-gray-900 font-bold text-lg"> ${name}</div>
                        </div>
                    </div>
                `;
            });
        }else {
            const staffWrapperElement = document.getElementById("staffwrapper");
            staffWrapperElement.remove();
        }

        const friends = res[0]?.data?.friend;
        if(friends && friends.length > 0) {
            friends.forEach(friend => {
                const name = friend?.name;

                if(!name) {
                    return;
                }

                const quote = friend?.quote;
                let quoteElement = '';
                if(quote) {
                    quoteElement = `<p class="text-gray-600">"${quote}"</p>`;
                }

                const friendElement = document.getElementById("friend");
                friendElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-6 xl:col-span-4 w-full intro-y">
                        <div class="p-6 rounded-md bg-white zoom-in">
                            <div class="text-gray-900 font-bold uppercase text-lg"> ${name}</div>
                            ${quoteElement}
                            ${buildStreamingElement(friend)}
                            ${buildSocialMediaElement(friend)}
                            ${buildDonationElement(friend)}
                        </div>
                    </div>
                `;
            });
        }else {
            const friendWrapperElement = document.getElementById("friendwrapper");
            friendWrapperElement.remove();
        }

        const members = res[0]?.data?.member;
        if(members && members.length > 0) {
            members.forEach(member => {
                const name = member?.name;

                if(!name) {
                    return;
                }

                const memberElement = document.getElementById("member");
                memberElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-6 xl:col-span-3 w-full intro-y">
                        <div class="p-6 flex rounded-md bg-white zoom-in justify-center items-center">
                            <div class="text-gray-900 font-bold text-lg"> ${name}</div>
                        </div>
                    </div>
                `;
            });
        }else {
            const memberWrapperElement = document.getElementById("memberwrapper");
            memberWrapperElement.remove();
        }

        const plays = res[0]?.data?.play;
        if(plays && plays.length > 0) {
            plays.forEach(play => {
                const name = play?.name;
                const detail = play?.detail;

                if(!name) {
                    return;
                }

                const playElement = document.getElementById("play");
                playElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-6 xl:col-span-4 w-full intro-y">
                        <div class="p-6 rounded-md bg-white zoom-in">
                            <div class="text-gray-900 font-bold text-lg text-center"> ${name}</div>
                            <div class="text-gray-900 text-center"> ${detail}</div>
                        </div>
                    </div>
                `;
            });
        }else {
            const playWrapperElement = document.getElementById("playwrapper");
            playWrapperElement.remove();
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

function buildStreamingElement(streamer)
{
    const youtube = streamer?.youtube;
    const youtubeurl = streamer?.youtubeurl;
    let youtubeElement = '';
    if(youtube && youtubeurl) {
        youtubeElement = `<div class="text-gray-600">Youtube : <a  class="text-yellow-500" href="${youtubeurl}">${youtube}</a></div>`;
    }

    const gox = streamer?.gox;
    const goxurl = streamer?.goxurl;
    let goxElement = '';
    if(gox && goxurl) {
        goxElement = `<div class="text-gray-600">Gox : <a class="text-yellow-500" href="${goxurl}">${gox}</a></div>`;
    }

    let element = '';
    if(youtubeElement !== '' || goxElement !== ''){
        element = `<div class="text-gray-900 font-bold uppercase mt-6">Streaming Platform</div>` + youtubeElement + goxElement;
    }

    return element;
}

function buildSocialMediaElement(streamer)
{
    const instagram = streamer?.instagram;
    const instagramurl = streamer?.instagramurl;
    let instagramElement = '';
    if(instagram && instagramurl) {
        instagramElement = `<div class="text-gray-600">Instagram : <a class="text-yellow-500" href="${instagramurl}">${instagram}</a></div>`;
    }

    let element = '';
    if(instagramElement !== ''){
        element = `<div class="text-gray-900 font-bold uppercase mt-6">Social Media</div>` + instagramElement;
    }

    return element;
}

function buildDonationElement(streamer)
{
    const saweria = streamer?.saweria;
    let saweriaElement = '';
    if(saweria) {
        saweriaElement = `<div class="text-gray-600">Saweria : <a class="text-yellow-500" href="${saweria}">Donate Now</a></div>`;
    }

    const sociabuzz = streamer?.sociabuzz;
    let sociabuzzElement = '';
    if(sociabuzz) {
        sociabuzzElement = `<div class="text-gray-600">SociaBuzz : <a class="text-yellow-500" href="${sociabuzz}">Donate Now</a></div>`;
    }

    let element = '';
    if(saweriaElement !== '' || sociabuzzElement !== ''){
        element = `<div class="text-gray-900 font-bold uppercase mt-6">Donation</div>` + saweriaElement + sociabuzzElement;
    }

    return element;
}

document.addEventListener('DOMContentLoaded', init);
