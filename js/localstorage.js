(function(){
    var storage = window.storage = {};

    function storageAvailable(type) {
        try {
            var store = window[type];
            var test = '__storage_test__';
            store.setItem(test, test);
            store.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    if (storageAvailable('localStorage')) {
        storage.set = function(key, value) {
            localStorage.setItem(key, value);
        };
        storage.getOrDefault = function(key, defaultValue) {
            var item = localStorage.getItem(key);
            if (item === undefined) {
                item = defaultValue;
            }
            return item;
        };
    } else {
        var storeKey = '__data__';
        storage[storeKey] = {};
        storage.set = function(key, value) {
            storage[storeKey][key] = value;
        };
        storage.getOrDefault = function(key, defaultValue) {
            var item = storage[storeKey][key];
            if (item == undefined) {
                item = defaultValue;
            }
            return defaultValue;
        };
    }
})();
