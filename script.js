window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splashScreen').style.display = 'none';
    }, 3000);
});

// تحميل الوضع الليلي من localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// تبديل الوضع الليلي
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// قائمة القنوات
const channels = [
    {
        name: 'Al-Hurra Iraq',
        url: 'https://mbnvvideoingest-i.akamaihd.net/hls/live/1004674/MBNV_ALHURRA_IRAQ/playlist.m3u8',
        logo: 'https://i.imgur.com/mXBZEQP.png'
    },
    {
        name: 'Al-Hurra',
        url: 'https://mbnvvideoingest-i.akamaihd.net/hls/live/1004673/MBNV_ALHURRA_MAIN/playlist.m3u8',
        logo: 'https://i.imgur.com/0izeu5z.png'
    },
    {
        name: 'Al-Iraqiya',
        url: 'https://cdn.catiacast.video/abr/8d2ffb0aba244e8d9101a9488a7daa05/playlist.m3u8',
        logo: 'https://i.imgur.com/imdV6kL.png'
    },
    {
        name: 'Al-Rafidain',
        url: 'https://cdg8.edge.technocdn.com/arrafidaintv/abr_live/playlist.m3u8',
        logo: 'https://i.imgur.com/D78qG91.png'
    },
    {
        name: 'Al-Rasheed',
        url: 'https://media1.livaat.com/AL-RASHEED-HD/tracks-v1a1/playlist.m3u8',
        logo: 'https://i.imgur.com/SU9HbXY.png'
    },
    {
        name: 'Al-Sharqiya News',
        url: 'https://5d94523502c2d.streamlock.net/alsharqiyalive/mystream/playlist.m3u8',
        logo: 'https://i.imgur.com/P6p17ZY.jpg'
    },
    {
        name: 'Al-Sharqiya',
        url: 'https://5d94523502c2d.streamlock.net/home/mystream/playlist.m3u8',
        logo: 'https://i.imgur.com/bPYyXNf.png'
    },
    {
        name: 'Dijlah Tarab',
        url: 'https://ghaasiflu.online/tarab/tracks-v1a1/playlist.m3u8',
        logo: 'https://i.imgur.com/2SBjjBQ.png'
    },
    {
        name: 'Dijlah TV',
        url: 'https://ghaasiflu.online/Dijlah/tracks-v1a1/playlist.m3u8',
        logo: 'https://i.imgur.com/FJEeYiz.png'
    },
    {
        name: 'iNEWS',
        url: 'https://svs.itworkscdn.net/inewsiqlive/inewsiq.smil/playlist.m3u8',
        logo: 'https://i.imgur.com/PeuBkaH.png'
    },
    {
        name: 'Iraq Future Ⓢ',
        url: 'https://streaming.viewmedia.tv/viewsatstream40/viewsatstream40.smil/playlist.m3u8',
        logo: 'https://i.imgur.com/Z7woTe5.png'
    },
    {
        name: 'Turkmeneli TV',
        url: 'https://137840.global.ssl.fastly.net/edge/live_6b7c6e205afb11ebb010f5a331abaf98/playlist.m3u8',
        logo: 'https://i.imgur.com/iUhhg4B.png'
    },
    {
        name: 'Zagros TV',
        url: 'https://5a3ed7a72ed4b.streamlock.net/zagrostv/SMIL:myStream.smil/playlist.m3u8',
        logo: 'https://i.imgur.com/UjIuIQX.png'
    }
];

// إضافة القنوات إلى الواجهة
function loadChannels() {
    const channelsList = document.getElementById('channels');
    channels.forEach(channel => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}">
            <h3>${channel.name}</h3>
        `;
        card.addEventListener('click', () => {
            playChannel(channel.url);
        });
        channelsList.appendChild(card);
    });
}

// تشغيل القناة
function playChannel(url) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = url;
    videoPlayer.play();
}

// البحث عن القنوات
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const channelName = card.querySelector('h3').textContent.toLowerCase();
        if (channelName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// زر الانتقال إلى الأعلى
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// تحميل القنوات عند بدء التشغيل
loadChannels();
