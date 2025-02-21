var tools = [];
var currentSide = null;

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

function hideToolbar() {
    document.getElementById("toolbar-container").style.display = "none";
}

function addSideBtn(child) {
    const id = "Side" + Math.random().toString();
    document.getElementById("side-items").innerHTML += '<a class="text-base pl-4 pr-4 cursor-pointer flex items-center h-8 rounded-md" style="-webkit-app-region: no-drag;" id="' + id + '" onclick="activeSide(' + "'" + id + "'" + ')">' + child + '</a>';
}

function resetSidebar() {
    document.getElementById("side-items").innerHTML = "";
}

function hideSidebar() {
    document.getElementById("sidebar-container").style.display = "none";
}

function activeSide(id) {
    var sideItems = document.getElementById("side-items").children;
    var sideItem = document.getElementById(id);
    if (currentSide == id) {
        sideItem.classList.remove("bg-ctp-mantle");
    }
    for (var i = 0; i < sideItems.length; i++) {
        sideItems[i].classList.remove("bg-ctp-mantle");
    }
    if (currentSide != id) {
        sideItem.classList.add("bg-ctp-mantle");
        currentSide = id;
    }
}

function addMenuEntry(name, exec, dropdownname, dropdownexec) {
    var modname = name.replace(/ /g, "-");
    var nbsname = name.replace(/ /g, "&nbsp;");
    var menu = document.getElementById("menu");
    var container = document.createElement("div");
    container.classList.add("relative");
    container.style.webkitAppRegion = "no-drag";
  
    var btn = document.createElement("a");
    btn.id = modname + "-btn";
    btn.className = "text-xs pl-4 cursor-pointer";
    if (exec && exec !== "") {
      btn.setAttribute("onclick", exec);
    }
    btn.innerHTML = nbsname;
    container.appendChild(btn);

    var dropdown = null;
    if (dropdownname != null) {
      dropdown = document.createElement("div");
      dropdown.id = modname + "-dropdown";
      dropdown.className = "dropdown-content absolute left-3 mt-2 bg-ctp-mantle shadow-lg z-10";
      for (var i = 0; i < dropdownname.length; i++) {
        var ddItem = document.createElement("a");
        ddItem.className = "block px-3 py-1 text-xs text-ctp-text hover:bg-ctp-surface2 w-fit cursor-pointer";
        if (dropdownexec[i] && dropdownexec[i] !== "") {
          ddItem.setAttribute("onclick", dropdownexec[i]);
        }
        ddItem.innerHTML = dropdownname[i].replace(/ /g, "&nbsp;");
        dropdown.appendChild(ddItem);
      }
      container.appendChild(dropdown);
    }
  
    menu.appendChild(container);
  
    btn.addEventListener("click", function(event) {
      event.stopPropagation();
      if (dropdown) {
        dropdown.classList.toggle("show");
      }
      for (var i = 0; i < tools.length; i++) {
        var otherDropdown = document.getElementById(tools[i] + "-dropdown");
        if (otherDropdown && otherDropdown !== dropdown && otherDropdown.classList.contains("show")) {
          otherDropdown.classList.remove("show");
        }
      }
    });

  
    tools.push(modname);

    document.getElementById(modname + "-dropdown").addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

function resetMenu() {
    document.getElementById("menu").innerHTML = "";
}

document.addEventListener("click", function() {
    var openDropdowns = document.querySelectorAll(".dropdown-content.show");
    openDropdowns.forEach(function(dropdown) {
        dropdown.classList.remove("show");
    });
});
  

addMenuEntry("File", null, ["New", "Open", "Save", "Save As", "Close"], ["newFile()", "openFile()", "saveFile()", "saveAsFile()", "closeFile()"]);
addMenuEntry("Edit", null, ["Undo", "Redo", "Cut", "Copy", "Paste", "Select All"], ["undo()", "redo()", "cut()", "copy()", "paste()", "selectAll()"]);
addMenuEntry("Select", null, ["Select All", "Select Line", "Select Word"], ["selectAll()", "selectLine()", "selectWord()"]);
addMenuEntry("View", null, ["Zoom In", "Zoom Out", "Reset Zoom"], ["zoomIn()", "zoomOut()", "resetZoom()"]);

addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M0 55.2L0 426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320l118.1 0c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"/></svg>');