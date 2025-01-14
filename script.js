// شاشة التحميل
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

// تحميل القنوات من localStorage
function loadChannels() {
    const savedChannels = JSON.parse(localStorage.getItem('channels')) || [];
    savedChannels.forEach(channel => {
        addChannelToList(channel);
    });
}

// إضافة قناة إلى القائمة
function addChannelToList(channel) {
    const channelsList = document.getElementById('channels');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${channel.logo}" alt="${channel.name}">
        <h3>${channel.name}</h3>
        <button class="editBtn"><i class="fas fa-edit"></i></button>
        <button class="deleteBtn"><i class="fas fa-trash"></i></button>
    `;
    card.addEventListener('click', () => {
        playChannel(channel.url);
    });

    // إضافة حدث للتعديل
    card.querySelector('.editBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        editChannel(card, channel);
    });

    // إضافة حدث للحذف
    card.querySelector('.deleteBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteChannel(card, channel);
    });

    channelsList.appendChild(card);
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

// إضافة قناة جديدة
const addChannelBtn = document.getElementById('addChannelBtn');
addChannelBtn.addEventListener('click', () => {
    const name = prompt("أدخل اسم القناة:");
    const url = prompt("أدخل رابط القناة (M3U):");
    const logo = prompt("أدخل رابط الشعار (اختياري):");

    if (name && url) {
        const channel = { name, url, logo: logo || 'https://via.placeholder.com/20' };
        addChannelToList(channel);
        saveChannels();
        showNotification('تمت إضافة القناة بنجاح!');
    }
});

// تعديل قناة
function editChannel(card, channel) {
    const newName = prompt("أدخل الاسم الجديد:", channel.name);
    const newUrl = prompt("أدخل الرابط الجديد:", channel.url);
    const newLogo = prompt("أدخل رابط الشعار الجديد:", channel.logo);

    if (newName && newUrl) {
        channel.name = newName;
        channel.url = newUrl;
        channel.logo = newLogo || channel.logo;
        card.querySelector('h3').textContent = newName;
        card.querySelector('img').src = channel.logo;
        saveChannels();
        showNotification('تم تعديل القناة بنجاح!');
    }
}

// حذف قناة
function deleteChannel(card, channel) {
    if (confirm(`هل تريد حذف قناة ${channel.name}؟`)) {
        card.remove();
        saveChannels();
        showNotification('تم حذف القناة بنجاح!');
    }
}

// حفظ القنوات في localStorage
function saveChannels() {
    const channels = [];
    document.querySelectorAll('.card').forEach(card => {
        channels.push({
            name: card.querySelector('h3').textContent,
            url: card.querySelector('img').getAttribute('src'),
            logo: card.querySelector('img').getAttribute('src')
        });
    });
    localStorage.setItem('channels', JSON.stringify(channels));
}

// إنشاء قائمة تشغيل
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
createPlaylistBtn.addEventListener('click', () => {
    const playlistName = prompt("أدخل اسم قائمة التشغيل:");
    if (playlistName) {
        const playlist = { name: playlistName, channels: [] };
        addPlaylist(playlist);
        savePlaylists();
        showNotification('تم إنشاء قائمة التشغيل بنجاح!');
    }
});

// إضافة قائمة تشغيل إلى الواجهة
function addPlaylist(playlist) {
    const playlistsDiv = document.getElementById('playlists');
    const playlistDiv = document.createElement('div');
    playlistDiv.innerHTML = `
        <h3>${playlist.name}</h3>
        <ul id="playlist-${playlist.name}"></ul>
    `;
    playlistsDiv.appendChild(playlistDiv);
}

// حفظ قوائم التشغيل في localStorage
function savePlaylists() {
    const playlists = [];
    document.querySelectorAll('#playlists div').forEach(div => {
        const name = div.querySelector('h3').textContent;
        const channels = [];
        div.querySelectorAll('li').forEach(li => {
            channels.push({
                name: li.querySelector('span').textContent,
                url: li.querySelector('img').getAttribute('src'),
                logo: li.querySelector('img').getAttribute('src')
            });
        });
        playlists.push({ name, channels });
    });
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

// تحميل قوائم التشغيل من localStorage
function loadPlaylists() {
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    savedPlaylists.forEach(playlist => {
        addPlaylist(playlist);
        playlist.channels.forEach(channel => {
            addChannelToPlaylist(playlist.name, channel);
        });
    });
}

// التحكم الأبوي
const parentalControlBtn = document.getElementById('parentalControlBtn');
parentalControlBtn.addEventListener('click', () => {
    const password = prompt("أدخل كلمة المرور:");
    if (password === "1234") { // كلمة المرور الافتراضية
        const channelName = prompt("أدخل اسم القناة التي تريد حجبها:");
        if (channelName) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (card.querySelector('h3').textContent === channelName) {
                    card.style.display = 'none';
                }
            });
            showNotification('تم حجب القناة بنجاح!');
        }
    } else {
        showNotification('كلمة المرور غير صحيحة!');
    }
});

// إشعارات
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

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

// تحميل القنوات من رابط M3U
async function loadM3UChannels() {
    const m3uUrl = 'https://raw.githubusercontent.com/Free-TV/IPTV/master/README.md'; // استبدل بالرابط الصحيح
    const response = await fetch(m3uUrl);
    const data = await response.text();

    const channels = [];
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
            const name = lines[i].split(',')[1].trim();
            const url = lines[i + 1].trim();
            const logo = ''; // يمكنك استخراج الشعار من البيانات إذا كان متاحًا
            channels.push({ name, url, logo });
        }
    }

    channels.forEach(channel => {
        addChannelToList(channel);
    });
}

// تحميل القنوات وقوائم التشغيل عند بدء التشغيل
loadChannels();
loadPlaylists();
loadM3UChannels();
