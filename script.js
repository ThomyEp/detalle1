// 1. Cargar el reproductor de YouTube
let player;
let isVideoReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'eRnIks59Pjw', // ID del video nuevo de YouTube
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isVideoReady = true;
    console.log('Reproductor de YouTube listo para reproducir.');
}

function onPlayerError(event) {
    const errorMessages = {
        2: 'Error de parámetro.',
        5: 'Error de reproducción.',
        100: 'El video no puede ser reproducido.',
        101: 'El propietario del video ha restringido la reproducción en otros sitios.',
        150: 'El video no puede ser reproducido debido a restricciones del propietario del video.'
    };
    console.error('Error en el reproductor de YouTube:', errorMessages[event.data] || 'Error desconocido');
}

// 2. Comenzar la animación y la música al presionar el botón
document.getElementById('startButton').addEventListener('click', function() {
    const intro = document.querySelector('.intro');
    const mainContent = document.getElementById('mainContent');

    // Reproducir el video de YouTube
    if (isVideoReady) {
        console.log('Reproduciendo video de YouTube...');
        player.playVideo();
    } else {
        console.error('El reproductor de YouTube no está listo.');
    }

    // Animar la transición de la introducción a la sección principal
    gsap.to(intro, { duration: 1, opacity: 0, onComplete: function() {
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');

        // Inicia la animación de los mensajes
        animateMessages();
    }});
});

function animateMessages() {
    const messages = [
        '#message1', '#message2', '#message3', 
        '#message4', '#message5', '#message6', 
        '#message7', '#message8', '#message9', '#message10'
    ];

    messages.forEach((message, index) => {
        const element = document.querySelector(message);
        element.classList.remove('hidden');
        
        gsap.fromTo(element, 
            { opacity: 0, scale: 0.8, rotationY: -15, filter: 'blur(5px)' }, 
            { opacity: 1, scale: 1, rotationY: 0, filter: 'blur(0px)', duration: 1.5, delay: index * 3 });
    });
}
