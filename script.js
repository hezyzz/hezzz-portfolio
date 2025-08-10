window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initAOS);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            if (video.paused) {
                video.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                });
            }
        } else {
            const rect = video.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.bottom < -100 || rect.top > windowHeight + 100) {
                video.pause();
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '100px'
});

document.querySelectorAll('video').forEach(video => {
    videoObserver.observe(video);
    
    video.addEventListener('loadeddata', () => {
        video.play().catch(e => {
            console.log('Video autoplay prevented:', e);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        
        video.addEventListener('canplay', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
    });
});