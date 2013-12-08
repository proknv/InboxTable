
(function($){

    $.widget('proknv.inbox', {

        //default options
        options: {
            //position where to render component may be: instead, after, before, append
            position : 'instead',
            expandColumns : true,
            cssClass : 'inbox',
            columnModel : [
                {id : '1', type : 'text', title : 'Request ID', display : true},
                {id : '2', type : 'img', title : 'Priority', display : true},
                {id : '3', type : 'text', title : 'Requestor', display : true}
            ],
            data : {
                page : 1,
                count : 100,
                rows : [
                    {'1' : '1234', '2' : 'High', '3' : 'PSI1234567'},
                    {'1' : '2345', '2' : 'High', '3' : 'PSI1987567'},
                    {'1' : '1789', '2' : 'Low', '3' : 'PSI1245567'}
                ]
            }
        },

        _create : function(){
            var position = this.options.position;
            if(position==='own'){
                this._render();
            } else {
                if(position==='append'){
                    this.element = $('<table/>').appendTo(this.element);
                } else if(position==='after'){
                    this.element = $('<table/>').insertAfter(this.element);
                } else if(position==='before'){
                    this.element = $('<table/>').insertBefore(this.element);
                } else {
                    //instead by default
                    var $newTable = $('<table/>');
                    this.element.replaceWith($newTable);
                    this.element = $newTable;
                }
                this.options.position = 'own';
                this.element.inbox(this.options);
            }
        },

        _clean : function(){
            this.element.empty();
        },

        _cleanStructure : function(){
            this.$thead.empty();
            this.$tbody.empty();
        },

        _renderStructure : function(){
            this.$thead = $('<thead/>').appendTo(this.element);
            this.$tbody = $('<tbody/>').appendTo(this.element);
        },

        _renderHeader : function(){
            var $thead = this.$thead;
            $.each(this._columnModel, function(i, col){
                if(col.display){
                    $('<th/>').appendTo($thead).text(col.title);
                }
            });
        },

        _renderBody : function(){
            var $tbody = this.$tbody,
                columnModel = this._columnModel,
                data = this._data;
            $.each(data.rows, function(i, row){
                var $tr = $('<tr/>').appendTo($tbody);
                $.each(columnModel, function(j, col){
                    $('<td/>').text(row[col.id]).appendTo($tr);
                });
            });
        },

        _render : function(){
            this._columnModel = this.options.columnModel;
            if(typeof this._columnModel === 'function'){
                this._columnModel = this._columnModel();
            }
            this._data = this.options.data;
            if(typeof this._data === 'function'){
                this._data = this._data();
            }
            this._clean();
            this.element.addClass(this.options.cssClass);
            this._renderStructure();
            this._renderHeader();
            this._renderBody();
        },

        refresh : function(){
            this._cleanStructure();
            this._renderHeader();
            this._renderBody();
        },

        showColumn : function(columnId, show){
            $.each(this.options.columnModel, function(i, col){
                if(col.id == columnId){
                    col.display = !!show;
                }
            });
            this.refresh();
        }

    });

}(jQuery));