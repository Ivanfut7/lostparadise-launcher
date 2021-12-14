const exec = require('child_process').exec;
const Shell = require('node-powershell');

const uaup = require('uaup-js');


window.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#jugar').addEventListener('click', () => {
        jugar();
    });

    // document.querySelector('#foro').addEventListener('click', () => {
    //     abrir('explorer "https://www.hysteriarp.com/"');
    // });
    
    document.querySelector('#app').style.display = 'none';
    
    const defaultStages = {
        Checking: "Comprobando actualizaciones", // When Checking For Updates.
        Found: "Actualización encontrada",  // If an Update is Found.
        NotFound: "No hay nuevas actualizaciones", // If an Update is Not Found.
        Downloading: "Descargando...", // When Downloading Update.
        Unzipping: "Instalando...", // When Unzipping the Archive into the Application Directory.
        Cleaning: "Terminando...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
        Launch: "Ejecutando..." // When Launching the Application.
    };
    
    
    const updateOptions = {
        gitRepo: "lostparadise-launcher", // [Required] Your Repo Name
        gitUsername: "Ivanfut7",  // [Required] Your GitHub Username.
    
        appName: "lostparadise-launcher", //[Required] The Name of the app archive and the app folder.
        appExecutableName: "lostparadise-launcher.exe", //[Required] The Executable of the Application to be Run after updating.
        
        stageTitles: defaultStages,

        progressBar: document.querySelector('#download'), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
        label: document.querySelector('#download-label'), // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    
    };

    checkUpdate()
        .then(updateAvaliable => {
            if (updateAvaliable) {
                uaup.Update(updateOptions);
            }else {
                document.querySelector('#app').style.display = '';
                document.querySelector('#update').style.display = 'none';
            }
        });

    async function checkUpdate() {
        
        return await uaup.CheckForUpdates(updateOptions);
    }
})

function abrir(comando) {
    exec(comando);
}

function jugar() {
    const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
    });
    
    ps.addCommand(`start fivem://connect/cfx.re/join/683yv4`);
    ps.invoke().then(output => {
        console.log(output);
    }).catch(err => {
        console.log(err);
    });
}
