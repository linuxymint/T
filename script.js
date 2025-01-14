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
        name: 'Channel 1',
        url: 'http://a7-60.5-194.cdn13.com/30000/30944/30944.flv',
        logo: 'https://via.placeholder.com/80' // يمكنك استبدالها برابط شعار القناة
    },
    {
        name: 'Channel 2',
        url: 'http://a7-60.5-194.cdn13.com/30000/30938/30938.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 3',
        url: 'http://a7-60.5-194.cdn13.com/30000/30920/30920.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 4',
        url: 'http://a7-60.5-77.cdn13.com/30000/30933/30933.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 5',
        url: 'http://a7-60.5-77.cdn13.com/30000/30919/30919.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 6',
        url: 'http://a7-60.5-194.cdn13.com/30000/30932/30932.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 7',
        url: 'http://a7-60.5-201.cdn13.com/30000/30939/30939.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 8',
        url: 'http://a7-60.5-201.cdn13.com/30000/30918/30918.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 9',
        url: 'http://a7-60.5-194.cdn13.com/30000/30930/30930.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 10',
        url: 'http://a7-60.5-69.cdn13.com/28000/28974/28974.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 11',
        url: 'http://a7-60.5-194.cdn13.com/28000/28978/28978.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 12',
        url: 'http://a7-60.5-77.cdn13.com/25000/25543/25543.flv',
        logo: 'https://via.placeholder.com/80'
    },
    {
        name: 'Channel 13',
        url: 'http://a7-60.5-201.cdn13.com/30000/30939/30939.flv',
        logo: 'https://via.placeholder.com/80'
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
