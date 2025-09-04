// 初始化粒子背景
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ff6b8b'
        },
        shape: {
            type: 'heart',
            stroke: {
                width: 0,
                color: '#000000'
            },
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff6b8b',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});

// 健康成长计时功能
function updateCountdown() {
    // 设置开始日期：2000年农历七月十三（对应的公历日期是2000年8月12日）
    const startDate = new Date('2000-08-12');
    const now = new Date();
    
    // 计算从开始日期到现在经过的时间
    const diff = now - startDate;
    
    // 计算天、时、分、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 更新显示
    document.getElementById('days').textContent = `大肥闪已经健康成长：${days} 天`;
    document.getElementById('hours').textContent = `${hours} 小时`;
    document.getElementById('minutes').textContent = `${minutes} 分钟`;
    document.getElementById('seconds').textContent = `${seconds} 秒`;
}

// 初始化倒计时并每秒更新
updateCountdown();
setInterval(updateCountdown, 1000);

// 页面加载完成后尝试自动播放背景音乐
window.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const interactiveButtons = document.querySelector('.interactive-buttons');
    
    // 检查音频文件是否加载成功
    backgroundMusic.addEventListener('error', (e) => {
        console.log('音频文件加载失败:', e);
        console.log('当前音频文件路径:', backgroundMusic.currentSrc);
    });
    
    // 监听播放事件
    backgroundMusic.addEventListener('play', () => {
        // 播放成功，隐藏按钮
        interactiveButtons.style.display = 'none';
        console.log('音频播放成功，当前播放源:', backgroundMusic.currentSrc);
    });
    
    // 尝试自动播放
    backgroundMusic.play().then(() => {
        console.log('音频自动播放开始');
    }).catch(e => {
        // 自动播放失败，显示按钮并设置文本
        console.log('自动播放音乐失败:', e);
        const musicButton = document.getElementById('music-button');
        musicButton.textContent = '播放音乐';
    });
});

// 照片上传功能
const photoUpload = document.getElementById('photo-upload');
const photoPlaceholder = document.querySelector('.photo-placeholder');

photoPlaceholder.addEventListener('click', () => {
    photoUpload.click();
});

photoUpload.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '15px';
            
            photoPlaceholder.innerHTML = '';
            photoPlaceholder.appendChild(img);
        }
        
        reader.readAsDataURL(e.target.files[0]);
    }
});

// 爱心按钮功能
const loveButton = document.getElementById('love-button');

loveButton.addEventListener('click', () => {
    createFloatingHearts(10);
    
    // 添加点击效果
    loveButton.classList.add('clicked');
    setTimeout(() => {
        loveButton.classList.remove('clicked');
    }, 300);
});

// 创建漂浮的爱心
function createFloatingHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤️';
        
        // 随机位置和动画延迟
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.transform = `scale(${0.5 + Math.random() * 1})`;
        
        document.body.appendChild(heart);
        
        // 动画结束后移除元素
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// 音乐控制功能
const musicButton = document.getElementById('music-button');
const backgroundMusic = document.getElementById('background-music');

musicButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(e => {
            console.log('音乐播放失败:', e);
            alert('音乐播放需要用户交互，请再次点击播放按钮');
        });
        musicButton.textContent = '暂停音乐';
    } else {
        backgroundMusic.pause();
        musicButton.textContent = '播放音乐';
    }
});

// 鼠标跟随爱心效果
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // 只有5%的概率创建爱心
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '💖';
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        heart.style.transform = 'scale(0.5)';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});