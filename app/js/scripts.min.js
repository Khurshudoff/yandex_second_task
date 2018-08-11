// main left block scrolling

const plannedDevices = document.getElementsByClassName('main__left-block__content__right-block')[0].getElementsByClassName('device-block_wrapper')[0];

plannedDevices.addEventListener('scroll', function() {
    plannedDevices.parentElement.getElementsByClassName('next')[0].style.height = '0';
}, {once: true});

// main right block scrolling

const right_device_block_wrapper = document.getElementsByClassName('main__right-block__content')[0].getElementsByClassName('device-block_wrapper')[0];
const right_device_blocks = right_device_block_wrapper.getElementsByClassName('device-block');
const right_block_controls = document.getElementsByClassName('main__right-block_controls')[0];
const right_block_next = right_block_controls.getElementsByClassName('next')[0];
const right_block_prev = right_block_controls.getElementsByClassName('prev')[0];

if((right_device_blocks.length + 2) / 3 * 215 > getComputedStyle(right_device_block_wrapper,null).width.slice(0,-2)) {
    right_block_next.classList.remove('disabled');
    right_block_next.addEventListener('click', rightBlockMoveToNextItemWrap);
} else {
    right_block_next.classList.add('disabled');
    right_block_next.removeEventListener('click', rightBlockMoveToNextItemWrap);
}

const param_right_block = {
    translate: 0,
    prev: right_block_prev,
    next: right_block_next,
    wrapper: right_device_block_wrapper,
    device_blocks: right_device_blocks
};

function moveToPrevItem(obj, prevFunction, nextFunction) {
    obj.translate += 215;
    if(obj.translate >= 0){
        obj.prev.classList.add('disabled');
        obj.prev.removeEventListener('click', prevFunction);
    }
    obj.next.classList.remove('disabled');
    obj.next.addEventListener('click', nextFunction);
    obj.wrapper.style.transform = "translateX(" + obj.translate + "px" + ")";
}

function moveToNextItem(obj, prevFunction, nextFunction) {
    obj.translate -= 215;
    if(obj.translate - 215 -215 <= - (obj.device_blocks.length + 2) / 3 * 215){
        obj.next.classList.add('disabled');
        obj.next.removeEventListener('click', nextFunction);
    }
    obj.prev.classList.remove('disabled');
    obj.prev.addEventListener('click', prevFunction);
    obj.wrapper.style.transform = "translateX(" + obj.translate + "px" + ")";
}

function rightBlockMoveToPrevItemWrap(){
    moveToPrevItem(param_right_block, rightBlockMoveToPrevItemWrap, rightBlockMoveToNextItemWrap)
}
function rightBlockMoveToNextItemWrap(){
    moveToNextItem(param_right_block, rightBlockMoveToPrevItemWrap, rightBlockMoveToNextItemWrap)
}

right_block_prev.addEventListener('click', rightBlockMoveToPrevItemWrap);
right_block_next.addEventListener('click', rightBlockMoveToNextItemWrap);

//main bottom scroll

const bottom_device_block_wrapper = document.getElementsByClassName('main__bottom-block__content')[0]
    .getElementsByClassName('device-block_wrapper')[0];
const bottom_device_blocks = bottom_device_block_wrapper.getElementsByClassName('device-block');
const bottom_block_controls = document.getElementsByClassName('main__bottom-block_controls')[0];
const bottom_block_next = bottom_block_controls.getElementsByClassName('next')[0];
const bottom_block_prev = bottom_block_controls.getElementsByClassName('prev')[0];

const param_bottom_block = {
    translate: 0,
    prev: bottom_block_prev,
    next: bottom_block_next,
    wrapper: bottom_device_block_wrapper,
    device_blocks: bottom_device_blocks
};

function bottomBlockMoveToPrevItemWrap(){
    if(active_button === 'all') {
        param_bottom_block.device_blocks = bottom_device_blocks;
    } else {
        param_bottom_block.device_blocks = bottom_device_block_wrapper.getElementsByClassName(active_button);
    }
    moveToPrevItem(param_bottom_block, bottomBlockMoveToPrevItemWrap, bottomBlockMoveToNextItemWrap)
}
function bottomBlockMoveToNextItemWrap(){
    if(active_button === 'all') {
        param_bottom_block.device_blocks = bottom_device_blocks;
    } else {
        param_bottom_block.device_blocks = bottom_device_block_wrapper.getElementsByClassName(active_button);
    }
    moveToNextItem(param_bottom_block, bottomBlockMoveToPrevItemWrap, bottomBlockMoveToNextItemWrap)
}

bottom_block_prev.addEventListener('click', bottomBlockMoveToPrevItemWrap);
bottom_block_next.addEventListener('click', bottomBlockMoveToNextItemWrap);

// main bottom block nav

const main__Bottom_block__nav_items = document.getElementsByClassName('main__bottom-block__nav')[0];
const button_all = main__Bottom_block__nav_items.getElementsByClassName('all')[0];
const button_kitchen = main__Bottom_block__nav_items.getElementsByClassName('kitchen')[0];
const button_hall = main__Bottom_block__nav_items.getElementsByClassName('hall')[0];
const button_lights = main__Bottom_block__nav_items.getElementsByClassName('lights')[0];
const button_cameras = main__Bottom_block__nav_items.getElementsByClassName('cameras')[0];

let active_button = 'all';

function reloadTransitionAndButton(){
    param_bottom_block.translate = 0;
    param_bottom_block.wrapper.style.transform = "translateX(" + param_bottom_block.translate + "px" + ")";
    bottom_block_prev.removeEventListener('click', bottomBlockMoveToPrevItemWrap);
    bottom_block_next.removeEventListener('click', bottomBlockMoveToNextItemWrap);
    bottom_block_prev.addEventListener('click', bottomBlockMoveToPrevItemWrap);
    bottom_block_next.addEventListener('click', bottomBlockMoveToNextItemWrap);

    bottom_block_prev.classList.add('disabled');
    bottom_block_prev.removeEventListener('click', bottomBlockMoveToPrevItemWrap);

    if(active_button === 'all') {
        param_bottom_block.device_blocks = bottom_device_blocks;
    } else {
        param_bottom_block.device_blocks = bottom_device_block_wrapper.getElementsByClassName(active_button);
    }

    if(param_bottom_block.device_blocks.length * 215 > +(getComputedStyle(param_bottom_block.wrapper, null).width.slice(0,-2))) {
        bottom_block_next.classList.remove('disabled');
        bottom_block_next.addEventListener('click', bottomBlockMoveToNextItemWrap);
    } else {
        bottom_block_next.classList.add('disabled');
        bottom_block_next.removeEventListener('click', bottomBlockMoveToNextItemWrap);
    }
}

button_all.addEventListener('click', function() {
    active_button = 'all';
    for (let i = 0; i < bottom_device_blocks.length; i += 1) {
        const block = bottom_device_blocks[i];
        block.classList.add('seen');
    }

    button_all.classList.add('selected');
    button_kitchen.classList.remove('selected');
    button_hall.classList.remove('selected');
    button_lights.classList.remove('selected');
    button_cameras.classList.remove('selected');

    reloadTransitionAndButton();
});
button_cameras.addEventListener('click', function(){
    active_button = 'cameras';
    for (let i = 0; i < bottom_device_blocks.length; i += 1) {
        const block = bottom_device_blocks[i];
        if(block.classList.contains('cameras')){
            block.classList.add('seen');
        } else {
            block.classList.remove('seen');
        }
    }

    button_all.classList.remove('selected');
    button_kitchen.classList.remove('selected');
    button_hall.classList.remove('selected');
    button_lights.classList.remove('selected');
    button_cameras.classList.add('selected');

    reloadTransitionAndButton();
});
button_hall.addEventListener('click', function(){
    active_button = 'hall';
    for (let i = 0; i < bottom_device_blocks.length; i += 1) {
        const block = bottom_device_blocks[i];
        if(block.classList.contains('hall')){
            block.classList.add('seen');
        } else {
            block.classList.remove('seen');
        }
    }

    button_all.classList.remove('selected');
    button_kitchen.classList.remove('selected');
    button_hall.classList.add('selected');
    button_lights.classList.remove('selected');
    button_cameras.classList.remove('selected');

    reloadTransitionAndButton();
});
button_lights.addEventListener('click', function(){
    active_button = 'lights';
    for (let i = 0; i < bottom_device_blocks.length; i += 1) {
        const block = bottom_device_blocks[i];
        if(block.classList.contains('lights')){
            block.classList.add('seen');
        } else {
            block.classList.remove('seen');
        }
    }

    button_all.classList.remove('selected');
    button_kitchen.classList.remove('selected');
    button_hall.classList.remove('selected');
    button_lights.classList.add('selected');
    button_cameras.classList.remove('selected');

    reloadTransitionAndButton();
});
button_kitchen.addEventListener('click', function(){
    active_button = 'kitchen';
    for (let i = 0; i < bottom_device_blocks.length; i += 1) {
        const block = bottom_device_blocks[i];
        if(block.classList.contains('kitchen')){
            block.classList.add('seen');
        } else {
            block.classList.remove('seen');
        }
    }

    button_all.classList.remove('selected');
    button_kitchen.classList.add('selected');
    button_hall.classList.remove('selected');
    button_lights.classList.remove('selected');
    button_cameras.classList.remove('selected');

    reloadTransitionAndButton();
});

//hamburger

let customForEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(let c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(let e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
let hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    customForEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
            this.classList.toggle("is-active");
            if(this.parentElement.classList.contains('header__nav_hamburger')) {
                document.getElementsByClassName('header__nav')[0].classList.toggle('visible')
            }
        }, false);
    });
}

//main bottom block nav menu

const openBottomNav = function() {
    const elems = bottom_nav_wrapper.getElementsByClassName('main__bottom-block__nav_item');

    const selected = bottom_nav_wrapper.getElementsByClassName('selected')[0];

    bottom_nav_wrapper.removeChild(selected);

    bottom_nav_wrapper.insertBefore(selected, bottom_nav_wrapper.firstChild);


    for (let i = 0; i < elems.length; i += 1) {
        elems[i].classList.toggle('visible');
    }

    if(elems[1].classList.contains('visible')) {
        selected.getElementsByClassName('arrow-down')[0].style.transform = 'rotate(90deg)';
    } else {
        selected.getElementsByClassName('arrow-down')[0].style.transform = 'rotate(0deg)';
    }

};

const bottom_nav_wrapper = document.getElementsByClassName('main__bottom-block__nav')[0];

const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

const bottom_nav_items = bottom_nav_wrapper.getElementsByClassName('main__bottom-block__nav_item');

if (width <= 768) {
    for(let i = 0; i < bottom_nav_items.length; i += 1) {
        bottom_nav_items[i].addEventListener('click', openBottomNav);
    }
}

// main bottom click on device

const clickOnBody = function(evt) {
    document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('device-block_wrap')[0]);
    document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('body_background')[0]);

};

for(let i = 0; i < bottom_device_blocks.length; i += 1) {
    const block = bottom_device_blocks[i];
    block.addEventListener('click', function(evt){
        if(!document.getElementsByTagName('body_background')[0]) {
            evt.stopPropagation();

            const background = document.createElement('div');
            background.classList.add('body_background');

            const footer = document.getElementsByTagName('footer')[0];

            background.style.height = footer.offsetTop + footer.clientHeight + 'px';
            background.style.filter = 'blur(5px)';

            document.getElementsByTagName('body')[0].appendChild(background);

            const outputBlock = document.createElement('div');
            outputBlock.classList.add('device-block_wrap');

            outputBlock.appendChild(block.cloneNode(true));

            const button_wrap = document.createElement('div');
            button_wrap.classList.add('button_wrap');

            const buttonApply = document.createElement('span');
            buttonApply.classList.add('device-block_button');
            buttonApply.innerHTML = '<span>Применить</span>';

            buttonApply.addEventListener('click', function(){
                //changes in db

                document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('device-block_wrap')[0]);
                document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('body_background')[0]);
            });

            const buttonClose = document.createElement('span');
            buttonClose.classList.add('device-block_button');
            buttonClose.innerHTML = '<span>Закрыть</span>';

            buttonClose.addEventListener('click', function(){
                document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('device-block_wrap')[0]);
                document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].getElementsByClassName('body_background')[0]);
            });

            button_wrap.appendChild(buttonApply);
            button_wrap.appendChild(buttonClose);

            outputBlock.appendChild(button_wrap);

            const device_block = outputBlock.getElementsByClassName('device-block')[0];

            const rightTemp = document.createElement('div');
            rightTemp.classList.add('right-temp_block');
            rightTemp.innerHTML = '<span class="right-temp_block_value">+23</span>';
            rightTemp.appendChild(outputBlock.getElementsByClassName('device-img')[0])
            device_block.appendChild(rightTemp);

            const oval = document.createElement('div');
            oval.classList.add('content_wrap');
            oval.innerHTML = '<span class="temperature_value">+23' +
                    '<span class="triangle_wrap">' +
                        '<span class="triangle"></span>' +
                    '</span>' +
                '</span>';
            device_block.appendChild(oval);

            if(this.classList.contains('light')) {
            document.getElementsByTagName('body')[0].insertBefore(outputBlock, document.getElementsByTagName('body')[0].firstChild);
            } else if (this.classList.contains('temperature')){
            document.getElementsByTagName('body')[0].insertBefore(outputBlock, document.getElementsByTagName('body')[0].firstChild);
            } else if (this.classList.contains('floor')){
            document.getElementsByTagName('body')[0].insertBefore(outputBlock, document.getElementsByTagName('body')[0].firstChild);
            } else {
                // error
            }


        }

        document.getElementsByClassName('body_background')[0].addEventListener('click', clickOnBody, {once: true});

    })
}