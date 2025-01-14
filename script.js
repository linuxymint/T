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
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${channel.logo}" alt="${channel.name}" height="20">
        <span>${channel.name}</span>
        <button class="editBtn">تعديل</button>
        <button class="deleteBtn">حذف</button>
    `;
    li.addEventListener('click', () => {
        playChannel(channel.url);
    });
    channelsList.appendChild(li);

    // إضافة حدث للتعديل
    li.querySelector('.editBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        editChannel(li, channel);
    });

    // إضافة حدث للحذف
    li.querySelector('.deleteBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteChannel(li, channel);
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
    }
});

// تعديل قناة
function editChannel(li, channel) {
    const newName = prompt("أدخل الاسم الجديد:", channel.name);
    const newUrl = prompt("أدخل الرابط الجديد:", channel.url);
    const newLogo = prompt("أدخل رابط الشعار الجديد:", channel.logo);

    if (newName && newUrl) {
        channel.name = newName;
        channel.url = newUrl;
        channel.logo = newLogo || channel.logo;
        li.querySelector('span').textContent = newName;
        li.querySelector('img').src = channel.logo;
        saveChannels();
    }
}

// حذف قناة
function deleteChannel(li, channel) {
    if (confirm(`هل تريد حذف قناة ${channel.name}؟`)) {
        li.remove();
        saveChannels();
    }
}

// حفظ القنوات في localStorage
function saveChannels() {
    const channels = [];
    document.querySelectorAll('#channels li').forEach(li => {
        channels.push({
            name: li.querySelector('span').textContent,
            url: li.querySelector('img').getAttribute('src'),
            logo: li.querySelector('img').getAttribute('src')
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
            const channels = document.querySelectorAll('#channels li');
            channels.forEach(li => {
                if (li.querySelector('span').textContent === channelName) {
                    li.style.display = 'none';
                }
            });
        }
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
});

// تحميل القنوات وقوائم التشغيل عند بدء التشغيل
loadChannels();
loadPlaylists();
