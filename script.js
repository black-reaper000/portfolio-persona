const menuItems = document.querySelectorAll('.menu-item');
const contentScreens = document.querySelectorAll('.content-screen');
const previews = document.querySelectorAll('.preview');
const transition = document.getElementById('transition');
const projectButtons = document.querySelectorAll('.project-select');

const projectImage = document.getElementById('project-image');
const projectIndex = document.getElementById('project-index');
const projectCardNumber = document.getElementById('project-card-number');
const projectCardType = document.getElementById('project-card-type');
const projectCardTitle = document.getElementById('project-card-title');
const projectCardDescription = document.getElementById('project-card-description');
const projectGithub = document.getElementById('project-github');

let currentScreen = 'about';
let transitioning = false;
let selectedIndex = 0;

const projectData = {
    niple: {
        number: '01', name: 'NIPLE', type: 'LAN / AUDIO', image: 'projects/niple.svg',
        description: 'Native Low-Latency Windows → Mac Wireless Speaker Turn your MacBook into a high-fidelity, real-time wireless speaker for your Windows PC over your local home network (LAN). Optimized for the lowest achievable latency with zero cloud relays, zero screen-capture pipeline overhead, and no WebRTC bloat.',
        github: 'https://github.com/black-reaper000/niple'
    },
    afk: {
        number: '02', name: 'ATERNOS AFK BOT', type: 'MINECRAFT / BOT / AUTOMATION', image: 'projects/afk.svg',
        description: 'A Minecraft bot designed for Aternos free servers. It maintains server activity through automated movement and block interactions so the server can remain active.',
        github: 'https://github.com/black-reaper000/minecraft.aternos'
    },
    sst: {
        number: '03', name: 'SST OPPORTUNITIES', type: 'WEB / PLATFORM', image: 'projects/sst.svg',
        description: 'A platform designed to help Scaler School of Technology students discover opportunities, activities, events and different paths available around campus..',
        github: 'https://github.com/black-reaper000/sst-opportunities-modern'
    },
    launchpad: {
        number: '04', name: 'CAMPUS LAUNCHPAD', type: 'WEB / PLATFORM', image: 'projects/launchpad.svg',
        description: 'A campus-focused platform designed to help students discover projects, opportunities and useful resources in one place.',
        github: 'https://github.com/Neo-Venom/CampusLaunchpad'
    }
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function changeScreen(target) {
    if (transitioning || target === currentScreen) return;
    transitioning = true;
    transition.classList.remove('exit');
    transition.classList.add('active');

    await wait(430);
    contentScreens.forEach(screen => screen.classList.remove('active'));
    previews.forEach(preview => preview.classList.remove('active'));

    document.getElementById(`content-${target}`)?.classList.add('active');
    document.getElementById(`preview-${target}`)?.classList.add('active');

    menuItems.forEach(item => item.classList.remove('selected'));
    const selectedItem = document.querySelector(`[data-screen="${target}"]`);
    selectedItem?.classList.add('selected');
    selectedIndex = [...menuItems].indexOf(selectedItem);
    currentScreen = target;

    transition.classList.remove('active');
    transition.classList.add('exit');
    await wait(500);
    transition.classList.remove('exit');
    transitioning = false;
}

menuItems.forEach(item => item.addEventListener('click', () => changeScreen(item.dataset.screen)));

function updateProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectButtons.forEach(button => button.classList.toggle('active', button.dataset.project === projectId));
    projectImage.src = data.image;
    projectImage.alt = `${data.name} project preview`;
    projectIndex.textContent = data.number;
    projectCardNumber.textContent = data.number;
    projectCardType.textContent = data.type;
    projectCardTitle.textContent = data.name;
    projectCardDescription.textContent = data.description;
    projectGithub.href = data.github;
}

projectButtons.forEach(button => button.addEventListener('click', () => updateProject(button.dataset.project)));

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectedIndex = (selectedIndex + 1) % menuItems.length;
        menuItems[selectedIndex].focus();
    }
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[selectedIndex].focus();
    }
    if (event.key === 'Enter' && document.activeElement?.classList.contains('menu-item')) {
        event.preventDefault();
        changeScreen(menuItems[selectedIndex].dataset.screen);
    }
});

updateProject('niple');
