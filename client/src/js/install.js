const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
window.prompt = event;



});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
window.prompt?.prompt()
butInstall.classList.add("hidden")


});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {

window.prompt = null;
butInstall.classList.add("hidden")

});
