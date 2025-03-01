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
    document.getElementById("right-tabs").innerHTML += '<button class="tab-btn px-2 py-1 mt-1 border-l-2 border-ctp-base bg-ctp-base  pr-3" data-tab="' + newTabName + '">' + tabName + '</button>';
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