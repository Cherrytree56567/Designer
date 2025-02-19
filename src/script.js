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

var tools = [];

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