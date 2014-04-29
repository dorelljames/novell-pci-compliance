<!DOCTYPE html>
<html>
  <head>
    <title>PCI Compliance Tool</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    
    <div class="container" id="pci">
      <div class="row">

        <div class="page-header">
          <h1>PCI Compliance</small></h1>
        </div>

        <form class="form" role="form" id="pci_search" method="GET" action>
          <div class="col-sm-10">
            <input type="text" class="form-control input-url" id="url" placeholder="Enter URL" value="http://download.novell.com/patch/psdb/SLED/SLED11SP3/x86/">
          </div>
          <div class="col-sm-2"><input type="submit" class="btn btn-success" value="Fetch Data" class="pull-left" /></div>
        </form>

      </div>

      <!-- Content, Status, Log -->
      <div class="col-sm-12">
        <div class="row" id="content"></div>
        <div class="row" id="status"></div>
        <div class="row" id="log"></div>
      </div>

    </div>



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="pci.js"></script>
  </body>
</html>