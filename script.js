// Data
// Array of team members, members can be added and remove to you liking using the template (id: 0), the cards and socials update automatically
const members = [
    {
        id: 0,
        name: "",
        img: "",
        description: "",
        socials: {
            youtube: "",
            twitch: "",
            twitter: ""
        },
        channelid: "",
        newstvid: ""
    },
    {
        id: 1,
        name: "Member 1",
        img: "images/placeholderperson.jfif",
        description:"A description that fits the person well! (hopefully)",
        socials: {
            youtube: "https://www.example.com",
            twitch: "https://www.example.com",
            twitter: "https://www.example.com"
        },
        channelid: "UNUSED",
        newstvid: "https://www.youtube.com/embed/VNu15Qqomt8" // placeholder video, can be replaced with anyting!
    },
    {
        id: 2,
        name: "Member 2",
        img: "images/placeholderperson.jfif",
        description: "A description that fits the person well! (hopefully)",
        socials: {
            youtube: "https://www.example.com",
            twitch: "https://www.example.com",
            twitter: "https://www.example.com"
        },
        channelid: "UNUSED",
        newstvid: "https://www.youtube.com/embed/4bHUsy74Fss"
    },
    {
        id: 3,
        name: "Member 3",
        img: "images/placeholderperson.jfif",
        description: "A description that fits the person well! (hopefully)",
        socials: {
            youtube: "https://www.example.com",
            twitch: "https://www.example.com",
            twitter: "https://www.example.com"
        },
        channelid: "UNUSED",
        newstvid: "https://www.youtube.com/embed/pb-j3svRQLI"
    },
    {
        id: 4,
        name: "Member 4",
        img: "images/placeholderperson.jfif",
        description: "A description that fits the person well! (hopefully)",
        socials: {                                       // socials can be adjusted and replaced to the client's preferences
            youtube: "https://www.example.com",
            instagram: "https://www.example.com",
            twitter: "https://www.example.com"
        },
        channelid: "UNUSED", // in preperation for API integration
        newstvid: "https://www.youtube.com/embed/CUlAg4iqeTQ"
    },
]

// DOM references
const cards = document.querySelectorAll('.card');

const cardcontainer = document.getElementById("cards-container");
const socialcontainer = document.getElementById("socialcontainer");
const videocontainer = document.getElementById("videocontainer")

            
// Event listeners



// Functions

members.forEach(member => {

    if (member.id === 0) return;

    const card = document.createElement("div");
    card.classList.add("card");

          const content = document.createElement("div");
          const visuals = document.createElement("div");
          const wrapper = document.createElement("div");
          content.classList.add("content");
          visuals.classList.add("visual-layer");
          wrapper.classList.add("text-wrapper");
          card.appendChild(content);
          card.appendChild(visuals);
          card.appendChild(wrapper);
          content.innerHTML =`
          <img src="${member.img}" alt="${member.name}" width="150" height="auto">
          <h3>${member.name}</h3>
          

          `;
          wrapper.innerHTML =`
          <p>${member.description}</p>

          `;

    cardcontainer.appendChild(card);

    const socialsection = document.createElement("div");
    socialsection.classList.add("socialcontainer");
          socialsection.innerHTML= `
          <h3>${member.name}</h3>
          `;
    
    const sociallinks = document.createElement("div");
    sociallinks.classList.add("Social");
    sociallinks.id = `socials-${member.id}`;
    socialsection.appendChild(sociallinks);

    sociallinks.innerHTML= `
    <img src="${member.img}" alt="${member.name}" width="100" height="100">
    <ul>
                <li><a href="${member.socials.youtube}" target="_blank">YouTube</a></li>
                <li><a href="${member.socials.twitch}" target="_blank">Twitch</a></li>
                <li><a href="${member.socials.twitter}" target="_blank">X/Twitter</a></li>     
            </ul>
    `;
    
    socialcontainer.appendChild(socialsection);

    

    card.addEventListener('click', () => {
        const socials = [...document.querySelectorAll('.Social')];
        socials.forEach(s => s.classList.remove('active-card'));

                    const target = document.getElementById(`socials-${member.id}`);
                    const offset = 450;
                    const topPos = target.getBoundingClientRect().top + window.scrollY - offset;

                    window.scrollTo({top: topPos});

                    target.classList.add('active-card');
    })

    card.addEventListener("mouseenter", () => {
        card.classList.add("expanded");
    })

    card.addEventListener("mouseleave", () => {
        card.classList.remove("expanded");
    })

    window.addEventListener("scroll", () => {
        cards.forEach(card => { 
            requestAnimationFrame(() => {
        cards.forEach(card => card.classList.remove("expanded"));})

        })
    })

    

   fetchLatestVideo(member);
     
    async function fetchLatestVideo(member) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${member.channelid}&order=date&type=video&maxResults=1&key=AIzaSyCSD3RNnm_YK6S_huubKkppOJlycJ6jPUU`);
        const data = await response.json();
        console.log(data);
        const videoId = data.items[0].id.videoId;
        
        console.log(videoId);
       
    }


        const videosection = document.createElement("div");
    videosection.classList.add("videosec");

    document.getElementById("videocontainer").appendChild(videosection);
    videosection.innerHTML= `
    <h3>${member.name}</h3>
    `;
    const video = document.createElement("iframe");
    video.src = `${member.newstvid}`;
    video.width = "355";
    video.height = "200";
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    video.allowFullscreen = true;
    videosection.appendChild(video);
    videocontainer.appendChild(videosection);
    

            

})