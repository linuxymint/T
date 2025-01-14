window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splashScreen').style.display = 'none';
    }, 3000);
});

// تبديل الوضع الليلي
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// تحميل القنوات
function loadChannels() {
    const channels = [
        {
            name: 'Al-Hurra Iraq',
            url: 'https://mbnvvideoingest-i.akamaihd.net/hls/live/1004674/MBNV_ALHURRA_IRAQ/playlist.m3u8',
            logo: 'https://i.imgur.com/mXBZEQP.png'
        },
        // إضافة المزيد من القنوات هنا
    ];

    const channelsList = document.getElementById('channels');
    channels.forEach(channel => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}" height="20">
            <span>${channel.name}</span>
        `;
        li.addEventListener('click', () => {
            playChannel(channel.url);
        });
        channelsList.appendChild(li);
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
    const channels = document.querySelectorAll('#channels li');
    channels.forEach(channel => {
        const channelName = channel.textContent.toLowerCase();
        if (channelName.includes(searchTerm)) {
            channel.style.display = 'flex';
        } else {
            channel.style.display = 'none';
        }
    });
});

// تحميل القنوات عند بدء التشغيل
loadChannels();
