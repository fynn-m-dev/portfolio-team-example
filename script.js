// Data
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
        name: "Apollo",
        img: "images/Apollo.jpg",
        description:"The Autistic of the group, Apollo creates variety content focused on funny moments and dumb humor.",
        socials: {
            youtube: "https://www.youtube.com/@apollowaslive",
            twitch: "https://www.twitch.tv/mtrashickz",
            twitter: "https://x.com/_apollo_lol"
        },
        channelid: "UC6YRSgu-AFZb593RaXQPEKw",
        newstvid: "https://www.youtube.com/embed/QdLoRob5ZyA"
    },
    {
        id: 2,
        name: "MMatickz",
        img: "images/MMatickz.jpg",
        description: "The oldest of the group (unc), creates variety content with just as little braincells as Apollo. ;)",
        socials: {
            youtube: "https://www.youtube.com/@MMatickz",
            twitch: "https://www.twitch.tv/mtrashickz",
            twitter: "https://x.com/MMatickz"
        },
        channelid: "UCTWyt_x1rWkHEEVs_3E1vAw",
        newstvid: "https://www.youtube.com/embed/ltOMPFrBu4o"
    },
    {
        id: 3,
        name: "Hexikal",
        img: "images/Hexikal.jpg",
        description: "Also known as Hexikalboom, he creates Minecraft SMP content, he's boosted by llama's thumbnail skills icl.",
        socials: {
            youtube: "https://www.youtube.com/@Hexikalboom",
            twitch: "https://www.twitch.tv/hexikalboom_",
            twitter: "https://x.com/Hexikalboom"
        },
        channelid: "UCl_kHL1Qcixd4vpM1WcYG6w",
        newstvid: "https://www.youtube.com/embed/TUETZLWEDnU"
    },
    {
        id: 4,
        name: "Llamapear",
        img: "images/llamapear.jpg",
        description: "The artist of the group, seems like he put all of his points into art and very little into intelligence.",
        socials: {
            youtube: "https://www.youtube.com/@llama_pear",
            instagram: "https://www.twitch.tv/llamapear",
            twitter: "https://x.com/llama_pear"
        },
        channelid: "UCTRs61PKKF6JKermwJNTpHQ",
        newstvid: "https://www.youtube.com/embed/c1iIsa8t_xk"
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
          <img src="${member.img}" alt="${member.name}">
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