var tools = [];
var rightTabs = [];
var rightMidTabs = [];
var currentSide = null;
var currentRight = null;
var currentRightMid = null;

document.getElementById("dropdownBtn").addEventListener("click", function () {
    document.getElementById("dropdownMenu").classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    let dropdown = document.getElementById("dropdownMenu");
    let button = document.getElementById("dropdownBtn");

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add("hidden");
    }
});

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

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    document.getElementById("side-items").innerHTML += '<a class="text-base pl-2.5 pr-2 cursor-pointer flex items-center h-10 rounded-md ml-2 mr-2 w-10" style="-webkit-app-region: no-drag;" id="' + id + '" onclick="activeSide(' + "'" + id + "'" + ')">' + child + '</a>';
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

function addBottomKey(child) {
    document.getElementById("bottom-items").innerHTML += child;
}

function resetBottombar() {
    document.getElementById("bottom-items").innerHTML = "";
}

function addRightTab(tabName, tabContent) {
    let newTabName = tabName.replace(/\s+/g, '') + "Right";
    document.getElementById("right-tabs").innerHTML += '<button class="tab-btn px-2 py-1 mt-1 border-l-2 border-ctp-base bg-ctp-base rounded-t-lg pr-3" data-tab="' + newTabName + '">' + tabName + '</button>';
    document.getElementById("right-items").innerHTML += '<div class="tab-content w-72 p-4 hidden" id="' + newTabName + '">' + tabContent + '</div>';
    document.getElementById("right-dropdown").innerHTML += '<li><a href="#" class="block px-4 py-2 hover:bg-ctp-surface0 drop-btn" data-tab="' + newTabName + '" id="dropTab-' + newTabName + '">' + tabName + '</a></li>';
    rightTabs.push(newTabName);
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");

            buttons.forEach((btn) => btn.classList.remove("bg-ctp-base"));
            
            contents.forEach((content) => content.classList.add("hidden"));

            this.classList.add("bg-ctp-base");
            document.getElementById(tabId).classList.remove("hidden");
            currentRight = tabId;
        });
    });

    document.querySelectorAll(".drop-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
    
            buttons.forEach((btn) => btn.classList.remove("bg-ctp-base"));
                
            contents.forEach((content) => content.classList.add("hidden"));
    
            document.querySelector('.tab-btn[data-tab="' + tabId + '"]').classList.add("bg-ctp-base");
            document.getElementById(tabId).classList.remove("hidden");
            currentRight = tabId;
        });
    })

    buttons[0].click();

    document.getElementById("dropdownBtn").addEventListener("click", function () {
        document.getElementById("dropdownMenu").classList.toggle("hidden");
    });
    
    document.addEventListener("click", function (event) {
        let dropdown = document.getElementById("dropdownMenu");
        let button = document.getElementById("dropdownBtn");
    
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
}

function removeRightTab(tabName) {
    let newTabName = tabName.replace(/\s+/g, '') + "Right";
    document.querySelectorAll('.tab-btn[data-tab="' + newTabName + '"]').forEach(el => el.remove());
    document.querySelector('#' + newTabName)?.remove();
    rightTabs = rightTabs.filter(item => item !== newTabName);
    if (currentRight == newTabName) {
        currentRight = null;
    }
}

function clearRightTab() {
    document.querySelectorAll('.tab-btn').forEach(el => el.remove());
    document.querySelectorAll('.tab-content').forEach(el => el.remove());
    rightTabs = [];
    currentRight = null;
}

function addRightMidTab(tabName, tabContent) {
    let newTabName = tabName.replace(/\s+/g, '') + "RightMID";
    document.getElementById("rightmid-tabs").innerHTML += '<button class="tabmid-btn px-2 py-1 mt-1 border-l-2 border-ctp-base bg-ctp-base rounded-t-lg pr-3" data-tab="' + newTabName + '">' + tabName + '</button>';
    document.getElementById("rightmid-items").innerHTML += '<div class="tabmid-content w-72 p-2 hidden" id="' + newTabName + '">' + tabContent + '</div>';
    document.getElementById("rightmid-dropdown").innerHTML += '<li><a href="#" class="block px-4 py-2 hover:bg-ctp-surface0 dropmid-btn" data-tab="' + newTabName + '" id="dropMidTab-' + newTabName + '">' + tabName + '</a></li>';
    rightMidTabs.push(newTabName);
    const buttons = document.querySelectorAll(".tabmid-btn");
    const contents = document.querySelectorAll(".tabmid-content");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");

            buttons.forEach((btn) => btn.classList.remove("bg-ctp-base"));
            
            contents.forEach((content) => content.classList.add("hidden"));

            this.classList.add("bg-ctp-base");
            document.getElementById(tabId).classList.remove("hidden");
            currentRightMid = tabId;
        });
    });

    document.querySelectorAll(".dropmid-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
    
            buttons.forEach((btn) => btn.classList.remove("bg-ctp-base"));
                
            contents.forEach((content) => content.classList.add("hidden"));
    
            document.querySelector('.tabmid-btn[data-tab="' + tabId + '"]').classList.add("bg-ctp-base");
            document.getElementById(tabId).classList.remove("hidden");
            currentRightMid = tabId;
        });
    })

    buttons[0].click();

    document.getElementById("dropdownrightmidBtn").addEventListener("click", function () {
        document.getElementById("dropdownrightmidMenu").classList.toggle("hidden");
    });
    
    document.addEventListener("click", function (event) {
        let dropdown = document.getElementById("dropdownrightmidMenu");
        let button = document.getElementById("dropdownrightmidBtn");
    
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
}

function removeRightMidTab(tabName) {
    let newTabName = tabName.replace(/\s+/g, '') + "RightMID";
    document.querySelectorAll('.tabmid-btn[data-tab="' + newTabName + '"]').forEach(el => el.remove());
    document.querySelector('#' + newTabName)?.remove();
    rightMidTabs = rightMidTabs.filter(item => item !== newTabName);
    if (currentRightMid == newTabName) {
        currentRightMid = null;
    }
}

function clearRightMidTab() {
    document.querySelectorAll('.tabmid-btn').forEach(el => el.remove());
    document.querySelectorAll('.tabmid-content').forEach(el => el.remove());
    rightMidTabs = [];
    currentRightMid = null;
}

addMenuEntry("File", null, ["New", "Open", "Save", "Save As", "Close"], ["newFile()", "openFile()", "saveFile()", "saveAsFile()", "closeFile()"]);
addMenuEntry("Edit", null, ["Undo", "Redo", "Cut", "Copy", "Paste", "Select All"], ["undo()", "redo()", "cut()", "copy()", "paste()", "selectAll()"]);
addMenuEntry("Select", null, ["Select All", "Select Line", "Select Word"], ["selectAll()", "selectLine()", "selectWord()"]);
addMenuEntry("View", null, ["Zoom In", "Zoom Out", "Reset Zoom"], ["zoomIn()", "zoomOut()", "resetZoom()"]);

addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M0 55.2L0 426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320l118.1 0c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z"/></svg>');
addSideBtn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path class="fill-current" d="M504.3 273.6c4.9-4.5 7.7-10.9 7.7-17.6s-2.8-13-7.7-17.6l-112-104c-7-6.5-17.2-8.2-25.9-4.4s-14.4 12.5-14.4 22l0 56-192 0 0-56c0-9.5-5.7-18.2-14.4-22s-18.9-2.1-25.9 4.4l-112 104C2.8 243 0 249.3 0 256s2.8 13 7.7 17.6l112 104c7 6.5 17.2 8.2 25.9 4.4s14.4-12.5 14.4-22l0-56 192 0 0 56c0 9.5 5.7 18.2 14.4 22s18.9 2.1 25.9-4.4l112-104z"/></svg>');

addBottomKey('<b>Drag</b> to select. ');
addBottomKey('<b>Click</b> an object to select it. ');
addBottomKey('<b>Scroll</b> to move. ');

addRightTab("Color", '<div class="flex items-center justify-center"><div id="color-picker-container"></div></div>');

var colorPicker = new iro.ColorPicker("#color-picker-container", {
    width: 175,
    color: "#ffffff",
    wheelAngle: 270,
    wheelLightness: true,
    layout: [
        {
            component: iro.ui.TriangleWheel,
            options: {
                ringWidth: 15
            }
        }
    ]
});

colorPicker.on('color:change', function(color) {
    console.log('Selected color:', color.hexString);
});