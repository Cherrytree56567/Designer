const fileBtn = document.getElementById('file-btn');
const fileDropdown = document.getElementById('file-dropdown');
const editBtn = document.getElementById('edit-btn');
const editDropdown = document.getElementById('edit-dropdown');
const selectBtn = document.getElementById('select-btn');
const selectDropdown = document.getElementById('select-dropdown');
const viewBtn = document.getElementById('view-btn');
const viewDropdown = document.getElementById('view-dropdown');

function isElectron() {
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

fileBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    fileDropdown.classList.toggle('show');
    if (editDropdown.classList.contains('show')) {
        editDropdown.classList.remove('show');
    }
    if (selectDropdown.classList.contains('show')) {
        selectDropdown.classList.remove('show');
    }
    if (viewDropdown.classList.contains('show')) {
        viewDropdown.classList.remove('show');
    }
});

editBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    editDropdown.classList.toggle('show');
    if (fileDropdown.classList.contains('show')) {
        fileDropdown.classList.remove('show');
    }
    if (selectDropdown.classList.contains('show')) {
        selectDropdown.classList.remove('show');
    }
    if (viewDropdown.classList.contains('show')) {
        viewDropdown.classList.remove('show');
    }
});

selectBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    selectDropdown.classList.toggle('show');
    if (fileDropdown.classList.contains('show')) {
        fileDropdown.classList.remove('show');
    }
    if (editDropdown.classList.contains('show')) {
        editDropdown.classList.remove('show');
    }
    if (viewDropdown.classList.contains('show')) {
        viewDropdown.classList.remove('show');
    }
});

viewBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    viewDropdown.classList.toggle('show');
    if (fileDropdown.classList.contains('show')) {
        fileDropdown.classList.remove('show');
    }
    if (editDropdown.classList.contains('show')) {
        editDropdown.classList.remove('show');
    }
    if (selectDropdown.classList.contains('show')) {
        selectDropdown.classList.remove('show');
    }
});

window.addEventListener('click', () => {
    if (fileDropdown.classList.contains('show')) {
        fileDropdown.classList.remove('show');
    }
    if (editDropdown.classList.contains('show')) {
        editDropdown.classList.remove('show');
    }
    if (selectDropdown.classList.contains('show')) {
        selectDropdown.classList.remove('show');
    }
    if (viewDropdown.classList.contains('show')) {
        viewDropdown.classList.remove('show');
    }
});

fileDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});

editDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});

selectDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});

viewDropdown.addEventListener('click', (event) => {
    event.stopPropagation();
});

if (isElectron() == true) {
    document.getElementById('min').addEventListener('click', () => {
        window.electronAPI.controlWindow('minimize');
    });

    document.getElementById('max').addEventListener('click', () => {
        window.electronAPI.controlWindow('maximize');
    });

    document.getElementById('close').addEventListener('click', () => {
        window.electronAPI.controlWindow('close');
    });
} else {
    var min = document.getElementById("min");
    var max = document.getElementById("max");
    var close = document.getElementById("close");
    min.parentNode.removeChild(min);
    max.parentNode.removeChild(max);
    close.parentNode.removeChild(close);
}

function addToolBtn(child) {
    document.getElementById("menu-items").innerHTML += '<a class="text-base pl-4 pr-4 border-r-2 border-ctp-surface0 cursor-pointer flex items-center h-8" style="-webkit-app-region: no-drag;">' + child + '</a>';
}

function changeToolBarName(child) {
    document.getElementById("menu-main").innerHTML = child;
}

function resetToolbar() {
    document.getElementById("menu-items").innerHTML = "";
}