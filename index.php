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
          <span class="note">Automate the process of generating PCI Compliance Excel Document for Linux OS releases.</span>
        </div>

        <form class="form" role="form" id="pci_search" method="GET" action>
          <div class="col-sm-10">
            <input type="text" class="form-control input-url" id="url" placeholder="Enter URL" value="http://download.novell.com/patch/psdb/SLED/SLED11SP3/x86/">
          </div>
          <div class="col-sm-1"><input type="submit" class="btn btn-success" id="fetchbtn" value="Fetch Data"  /></div>
          <div class="col-sm-1"><input type="button" class="btn" id="exporttoexcel" value="Export" /></div>
        </form>

      </div>

      <ol id="instructions" class="text-muted">
        <li>Input patches URL. Default given is for SLEPOS 11 SP3 at Novell site.</li>
        <li>Click "Fetch Data" button and wait for it to finish.</li>
        <li>An "Export" button appears when everything is complete. It generates an Excel document based on the data fetched.</li>
      </ol>


      <!-- Content, Status, Log -->
      <div class="col-sm-12">
        <div class="row text-muted" id="status"></div>
        <div class="row" id="log"></div>
        <div class="row" id="content"></div>
        <div class="row" id="tabledata">
          <table id="tableexport">
            <thead>
              <tr>
                <th>Release Date</th>
                <th>Patch #</th>
                <th>Indications</th>
                <th>Contraindications</th>
                <th>Fix Description</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

    </div>

    <div class="container">
      <div class="footer ">

      </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.battatech.excelexport.min.js"></script><!-- to export table data -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="pci.js"></script>
  </body>
</html>
