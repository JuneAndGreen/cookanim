/**
 * 用法
 * @author june_01
 *
 * <div v-xinput="{
 *     min: 0, // 允许变化的最小值
 *     max: 100, // 允许变化的最大值
 *     gap: 3, // 移动多少像素变化
 *     step: 1, // 每次变化数值
 *     float: false, // 是否支持浮点数
 *     accuracy: 2, // 支持小树点后几位
 *     times: 10, // 按住shift时的倍数
 *     }"
 * >
 */
function getEvent(type) {
    if (CustomEvent) {
        return new CustomEvent(type, {});
    } else {
        let evt = document.createEvent('Event');
        evt.initEvent(type, true, true);

        return evt;
    }
}

class XInput {
    constructor(options) {
        this.element = options.element;

        this.element.setAttribute('xinput', 'true'); // 标记为xinput

        this.min = options.min !== undefined ? options.min : 0;
        this.max = options.max !== undefined ? options.max : 100;
        this.gap = options.gap || 3;
        this.step = options.step || 1;
        this.float = options.float || false;
        this.accuracy = options.accuracy || 2;
        this.times = options.times || 10;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.prevent = this.prevent.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('dragstart', this.prevent);
        this.element.addEventListener('keydown', this.onKeyDown);
        this.element.addEventListener('focus', this.onFocus);
        this.element.addEventListener('blur', this.onBlur);
    }

    initValue() {
        let value = this.element.value;
        value = this.float ? parseFloat(value, 10) : parseInt(value, 10);

        if (isNaN(value)) {
            value = this.min;
        } else if (value > this.max) {
            value = this.max;
        } else if (value < this.min) {
            value = this.min;
        }

        this.value = value;
        this.element.value = this.float ? value.toFixed(this.accuracy) : value;
    }

    setProperty(prop, value) {
        this[prop] = value;
    }

    prevent(evt) {
        evt.preventDefault();
    }

    onMouseDown(evt) {
        this.initValue();

        this.pageY = evt.pageY;

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);

        this.onMouseMove(evt);
    }

    onMouseMove(evt) {
        let isShift = evt.shiftKey;
        var newValue = parseFloat(this.value, 10);

        if (isShift) evt.preventDefault(); // 阻止默认选中事件

        let times = isShift ? this.times : 1;

        let pageY = evt.pageY;
        if (Math.abs(this.pageY - pageY) < this.gap) return;

        let sign = pageY < this.pageY ? -1 : 1; // 向上为正
        newValue -= sign * this.step * times;

        this.pageY = pageY;

        newValue = this.calcValue(newValue); // 新值校对

        if (newValue !== undefined) {
            this.element.value = newValue;

            evt = getEvent('input');
            this.element && this.element.dispatchEvent(evt);
        }
    }

    onMouseUp(evt) {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    onKeyDown(evt) {
        let isShift = evt.shiftKey;
        let keyCode = evt.keyCode;

        if (keyCode !== 38 && keyCode !== 40) return;

        if (isShift) evt.preventDefault(); // 阻止默认选中事件

        this.initValue();

        let newValue;
        let times = isShift ? this.times : 1;
        
        switch (keyCode) {
            case 38:
                // 上方向
                newValue = this.value + this.step * times;
                break;
            case 40:
                // 下方向
                newValue = this.value - this.step * times;
                break;
        }

        newValue = this.calcValue(newValue); // 新值校对

        if (newValue !== undefined) {
            this.element.value = newValue;

            evt = getEvent('input');
            this.element && this.element.dispatchEvent(evt);
        }
    }

    onMouseWheel(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        let isShift = evt.shiftKey;
        let delta = evt.wheelDelta ? evt.wheelDelta / 120 : -(evt.detail || 0) / 3;

        if (isShift) evt.preventDefault(); // 阻止默认选中事件

        this.initValue();
        let times = isShift ? this.times : 1;
        let newValue = this.value + delta * times;

        newValue = this.calcValue(newValue); // 新值校对

        if (newValue !== undefined) {
            this.element.value = newValue;

            evt = getEvent('input');
            this.element && this.element.dispatchEvent(evt);
        }
    }

    /**
     * 校对新值
     */
    calcValue(newValue) {
        if (newValue === undefined) return;

        if (!this.float) {
            newValue = ~~newValue;
        }

        if (newValue > this.max) {
            newValue = this.max;
        } else if (newValue < this.min) {
            newValue = this.min;
        }

        if (newValue !== this.value) {
            this.value = newValue = this.float ? newValue.toFixed(this.accuracy) : newValue;
            return newValue;
        }
    }

    onFocus() {
        // firefox 支持
        this.wheelType = document.mozHidden !== undefined ? 'DOMMouseScroll' : 'mousewheel';
        document.getElementById('edit-stage_container').addEventListener(this.wheelType, this.onMouseWheel, true);

        this.element && this.element.select();
    }

    onBlur() {
        document.getElementById('edit-stage_container').removeEventListener(this.wheelType, this.onMouseWheel, true);

        let evt = getEvent('input');
        this.element && this.element.dispatchEvent(evt);
    }

    destroy() {
        this.min = this.max = this.gap = this.step = this.float = this.accuracy = undefined;

        this.element.removeEventListener('mousedown', this.onMouseDown);
        this.element.removeEventListener('dragstart', this.prevent);
        this.element.removeEventListener('keydown', this.onKeyDown);
        this.element.removeEventListener('focus', this.onFocus);
        this.element.removeEventListener('blur', this.onBlur);

        this.element.setAttribute('xinput', ''); // 去掉xinput标记
        this.element = undefined;
    }
}
module.exports = {
    install(Vue, options) {
        let CACHE = [];

        let getElemCacheIndex = function(element) {
            let cache = CACHE;

            for (let i = 0, len = cache.length; i < len; i++) {
                if (cache[i].element === element) {
                    return i;
                }
            }

            return null;
        };

        let doBindEvent = function() {
            return function(element, binding) {
                let value = binding.value;

                let cacheObj = CACHE[getElemCacheIndex(element)];

                if (cacheObj && cacheObj.xinput) {
                    // 调整参数
                    Object.keys(value).forEach((key) => {
                        cacheObj.xinput.setProperty(key, value[key]);
                    });
                } else {
                    options = Object.assign({ element }, value);

                    CACHE.push({
                        element,
                        xinput: new XInput(options)
                    });
                }
            };
        };

        let doUnbindEvent = function() {
            return function(element) {
                var index = getElemCacheIndex(element);

                if (!isNaN(index)) {
                    var delArr = CACHE.splice(index, 1);
                    if (delArr.length && delArr[0]) {
                        delArr[0].xinput.destroy();
                    }
                }
            };
        };

        // 定义
        Vue.directive('xinput', {
            bind: doBindEvent(),
            update: doBindEvent(),
            unbind: doUnbindEvent()
        });
    }
};
