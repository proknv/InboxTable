
(function($){

    $.widget('proknv.inbox', {

        //default options
        options: {
            //position where to render component may be: instead, after, before, append
            position : 'instead',
            usePager : true,
            cssClass : 'inbox',
            columnModel : {
                order : ['1', '2', '3'],
                columns : {
                    '1' : {type : 'text', title : 'Request ID', display : true, alwaysDisplay : true, sortable : true},
                    '2' : {type : 'img', title : 'Priority', display : true, sortable : true},
                    '3' : {type : 'text', title : 'Requestor', display : true, sortable : true}
                }
            },
            data : {
                page : 1,
                count : 100,
                pages : 10,
                rows : [
                    {'1' : '1234', '2' : 'High', '3' : '1234567'},
                    {'1' : '2345', '2' : 'High', '3' : '1987567'},
                    {'1' : '1789', '2' : 'Low', '3' : '1245567'}
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
            this.$tfoot = $('<tfoot/>').insertBefore(this.$tbody);
        },

        _renderHeader : function(){
            var $thead = this.$thead,
                columns = this._columnModel.columns,
                self = this;
            $.each(this._columnModel.order, function(i, colId){
                var col = columns[colId];
                if(col.display){
                    $('<th/>').appendTo($thead).text(col.title).data('colId', colId);
                }
            });
            $('th', $thead).on('click', function(){
                self._onSort($(this).data('colId'));
            });
        },

        _renderBody : function(){
            var $tbody = this.$tbody,
                columnOrder = this._columnModel.order,
                columns = this._columnModel.columns,
                data = this._data;
            $.each(data.rows, function(i, row){
                var $tr = $('<tr/>').appendTo($tbody);
                $.each(columnOrder, function(j, colId){
                    if(columns[colId].display){
                        $('<td/>').text(row[colId]).appendTo($tr);
                    }
                });
            });
        },

        _renderPager : function(){
            var $tpager = $('<td/>', {colspan : this._columnModel.order.length}).appendTo(this.$tfoot),
                i;
            for(i=1; i<=this._data.pages; i++){
                $('<a/>', {'class':'inboxPageLink', href : '#', text : i}).appendTo($tpager);
            }
            $('a.inboxPageLink', $tpager).on('click', function(e){
                e.preventDefault();
            });
            $tpager.show();
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
            if(this.options.usePager){
                this._renderPager();
            }
        },

        _onSort : function(colId){
            alert('Sort of ['+colId+'] is clicked!');
        },

        refresh : function(){
            this._cleanStructure();
            this._renderHeader();
            this._renderBody();
        },

        showColumn : function(columnId, show){
            this._columnModel.columns[columnId].display = !!show;
            this.refresh();
        }

    });

}(jQuery));