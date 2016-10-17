var Set = (function () {
    function Set() {
        this.set = [];
    }
    Set.prototype.exists = function (item) {
        for (var i in this.set) {
            var value = this.set[i];
            if (value === item)
                return true;
        }
        return false;
    };
    Set.prototype.add = function (item) {
        if (!this.exists(item))
            this.set.push(item);
    };
    Set.prototype.remove = function (item) {
        var index = this.set.indexOf(item);
        if (index > -1) {
            this.set.splice(index, 1);
        }
    };
    return Set;
}());
