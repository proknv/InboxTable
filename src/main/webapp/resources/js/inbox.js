
(function($){

    $.widget('proknv.inbox', {

        //default options
        options: {

        },

        _create : function(){
            if(this.element.prop('tagName').toLowerCase()!=='table'){
                this.element = $('<table/>').insertAfter(this.element);
            }
        }

    });

}(jQuery));