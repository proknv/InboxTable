<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/css/inbox.css"/>
</head>
<body>
	<h1>${message}</h1>


    <script src="resources/js/jquery/jquery-1.10.2.js"></script>
    <script src="resources/js/jquery/jquery-widget-1.10.3.js"></script>
    <script src="resources/js/inbox.js"></script>

    <script type="text/javascript">
        var inbox;
        $(function(){

            $('h1').inbox({position:'instead'});
            inbox = $('table.inbox').data('proknvInbox');

        });
    </script>

</body>
</html>