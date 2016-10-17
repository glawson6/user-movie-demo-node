class Set {
    set:any;

    constructor() {
        this.set = [];
    }

    exists(item) {
        for( var i in this.set ) {
            var value = this.set[i];

            if( value === item )
                return true;
        }

        return false;
    }

    add( item ) {
        if( !this.exists( item ) )
            this.set.push( item );
    }

    remove( item ) {
        var index = this.set.indexOf(item);

        if (index > -1) {
            this.set.splice(index, 1);
        }
    }
}
