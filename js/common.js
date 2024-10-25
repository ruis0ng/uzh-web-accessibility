/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
function openMenu(event) {
    event.stopPropagation();
    event.preventDefault();

    var currentDropDownButton = event.target;
    var currentDropDownMenu = currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    var isOpen = currentDropDownMenu.classList.contains('show');
    var dropDownMenus = document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    for (var j = 0; j < dropDownMenus.length; j++) {
        dropDownMenus[j].classList.remove('show');
    }

    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
        currentDropDownMenu.querySelector('.dropdown-item:first-child').focus();
    }
}

/**
 * Close the current open menu
 * @param {object} event - The DOM event
 */
function closeMenu(event) {
    var currentDropDownMenu = event.target.closest('.dropdown-menu');
    if (currentDropDownMenu) {
        currentDropDownMenu.classList.remove('show');
        var menuButton = currentDropDownMenu.parentNode.querySelector('.dropdown-toggle');
        menuButton.focus();
    }
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    var content = document.getElementById('nav-bar-content');
    var expanded = content.getAttribute('aria-expanded');

    if (expanded === 'true') {
        content.setAttribute('aria-expanded', 'false');
    } else {
        content.setAttribute('aria-expanded', 'true');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var dropDownToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');
    var lastFocusedMenuItem = null;

    for (var i = 0; i < dropDownToggles.length; i++) {
        dropDownToggles[i].addEventListener('click', openMenu, false);
        dropDownToggles[i].addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu(event);
            } else if (event.code === 'Tab') {
                var currentMenu = this.parentNode.querySelector('.dropdown-menu');
                if (currentMenu) {
                    var menuItems = currentMenu.querySelectorAll('.dropdown-item');
                    if (menuItems.length > 0) {
                        var currentIndex = Array.from(menuItems).indexOf(document.activeElement);
                        if (event.shiftKey && currentIndex === 0 && lastFocusedMenuItem) {
                            // Shift+Tab from the first item in the submenu
                            event.preventDefault();
                            lastFocusedMenuItem.focus();
                        } else if (!event.shiftKey && currentIndex === menuItems.length - 1) {
                            // Tab from the last item in the submenu
                            event.preventDefault();
                            var nextDropdown = getNextDropdown(i);
                            if (nextDropdown) {
                                nextDropdown.querySelector('.dropdown-toggle').focus();
                            }
                        }
                    }
                }
            }
        }, false);
    }

    document.querySelector('.navbar-toggler').addEventListener('click', toggleNavigation, false);

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Tab') {
            var openMenus = document.querySelectorAll('.dropdown-menu.show');
            if (openMenus.length > 0) {
                var currentMenu = openMenus[openMenus.length - 1];
                var menuItems = currentMenu.querySelectorAll('.dropdown-item');
                if (menuItems.length > 0) {
                    var currentIndex = Array.from(menuItems).indexOf(document.activeElement);
                    if (currentIndex === -1) {
                        // Focus the first item in the submenu
                        menuItems[0].focus();
                        event.preventDefault();
                    } else if ((event.shiftKey && currentIndex === 0) || (!event.shiftKey && currentIndex === menuItems.length - 1)) {
                        // Close the submenu and allow default tab behavior
                        currentMenu.classList.remove('show');
                        lastFocusedMenuItem = this;
                    }
                }
            }
        } else if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            var currentMenu = document.querySelector('.dropdown-menu.show');
            if (currentMenu) {
                var menuItems = currentMenu.querySelectorAll('.dropdown-item');
                if (menuItems.length > 0) {
                    event.preventDefault();
                    var currentIndex = Array.from(menuItems).indexOf(document.activeElement);
                    var newIndex = event.code === 'ArrowDown' ? (currentIndex + 1) % menuItems.length : (currentIndex - 1 + menuItems.length) % menuItems.length;
                    menuItems[newIndex].focus();
                    lastFocusedMenuItem = menuItems[newIndex];
                }
            }
        } else if (event.code === 'Escape') {
            var openMenu = document.querySelector('.dropdown-menu.show');
            if (openMenu) {
                closeMenu(event);
                lastFocusedMenuItem = this;
            }
        } else if (event.code === 'Space') {
            event.preventDefault();
            event.target.click();
        }
    }, false);

    function getNextDropdown(index) {
        var dropdowns = document.querySelectorAll('.nav-item.dropdown');
        var nextDropdown = null;

        for (var j = index + 1; j < dropdowns.length; j++) {
            if (dropdowns[j].querySelector('.dropdown-menu.show')) {
                nextDropdown = dropdowns[j];
                break;
            }
        }

        return nextDropdown;
    }
}, false);




function changeFontSize(increaseFactor) {
    var txt = document.getElementById('root');
    var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    txt.style.fontSize = (currentSize + increaseFactor) + 'px';
}


