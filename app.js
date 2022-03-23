
function init()
{
    console.log("WHY U HERE ?");
    const url = 'https://script.google.com/macros/s/AKfycbz_KdY_CGzyufIaA_q2YNPxC2yK21_V7sOGlcYBVWPTwi1zMdwIXw3ctpR4hQogkk2YWQ/exec';
    
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
                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 xl:w-1/2 intro-y">
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
                    <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y">
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

        const members = res[0]?.data?.member;
        if(members && members.length > 0) {
            members.forEach(member => {
                const name = member?.name;

                if(!name) {
                    return;
                }

                const memberElement = document.getElementById("member");
                memberElement.innerHTML += `
                    <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
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
        youtubeElement = `<div class="text-gray-600">Youtube : <a href="${youtubeurl}">${youtube}</a></div>`;
    }

    const gox = streamer?.gox;
    const goxurl = streamer?.goxurl;
    let goxElement = '';
    if(gox && goxurl) {
        goxElement = `<div class="text-gray-600">gox : <a href="${goxurl}">${gox}</a></div>`;
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
        instagramElement = `<div class="text-gray-600">Instagram : <a href="${instagramurl}">${instagram}</a></div>`;
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
    const saweriaurl = streamer?.saweriaurl;
    let saweriaElement = '';
    if(saweria && saweriaurl) {
        saweriaElement = `<div class="text-gray-600">Saweria : <a href="${saweriaurl}">Donasi Sekarang</a></div>`;
    }

    const socialbuzz = streamer?.socialbuzz;
    const socialbuzzurl = streamer?.socialbuzzurl;
    let socialbuzzElement = '';
    if(socialbuzz && socialbuzzurl) {
        socialbuzzElement = `<div class="text-gray-600">socialbuzz : <a href="${socialbuzzurl}">Donasi Sekarang</a></div>`;
    }

    let element = '';
    if(saweriaElement !== '' || socialbuzzElement !== ''){
        element = `<div class="text-gray-900 font-bold uppercase mt-6">Streaming Platform</div>` + saweriaElement + socialbuzzElement;
    }

    return element;
}

document.addEventListener('DOMContentLoaded', init);