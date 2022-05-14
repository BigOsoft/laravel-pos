<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Point Of Sale</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />    
    <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/chosen/chosen.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />    
    <link href="assets/plugins/dataTables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/dataTables/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />    
    <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/pagination.css" rel="stylesheet" type="text/css" />
    </head>
  <body>
    
    <div class="main_app">
        <div id="transactions_view">
        <div class="row">
            <div class="col-md-12">
                <div class="card-box"> 
                    <div class="row">               
                        <h3 class="col-md-2">Transactions</h3> 
                        <div class="col-md-1">
                            <span>Till</span>
                            <select id="tills" class="form-control">                              
                            </select>
                        </div>
                        <div class="col-md-2">
                            <span>Cashier</span>
                            <select id="users" class="form-control">
                            </select>
                        </div>
                        <div class="col-md-1">
                            <span>Status</span>
                            <select id="status" class="form-control status">
                                <option value="1">Paid</option>
                                <option value="0">Unpaid</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <span style="width: 100%;">Date</span>
                            <div id="reportrange">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span> <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                    </div>   
                        <hr>
                        <div class="row">
                           

                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-8" id="productSales">
                                            <h4>Products</h4>
                                            <hr>
                                            <table class="table tablesaw-enhanced" id="productsSold">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Sold</th>
                                                        <th>Available</th> 
                                                        <th>Total</th>
                                                        <th>Profit</th>                                                                                                         
                                                    </tr>
                                                </thead>
                                                <tbody id="product_sales"></tbody>
                                            </table>
                                    </div>
                                    <div class="col-md-4" id="totals">
                                            <h4>Total</h4>
                                            <hr>

                                            <div id="total_profit" class="btn-primary">
                                                <h5>PROFIT</h5>
                                                <div id="counter">0</div>
                                            </div>
                                    
                                            <div id="total_sales" class="btn-success">
                                                <h5>SALES</h5>
                                                <div id="counter">0</div>
                                            </div>
                                       
                                            <div id="total_transactions" class="btn-warning">
                                                <h5>TRANSACTIONS</h5>
                                                <div id="counter">0</div>
                                            </div>
                                
                                            <div id="total_items" class="btn-info">
                                                <h5>ITEMS</h5>
                                                <div id="counter">0</div>
                                            </div>

                                            <div id="total_products" class="btn-default">
                                                <h5>PRODUCTS</h5>
                                                <div id="counter">0</div>
                                            </div>
                                                                         
                                    </div>
                                   
                               </div>
                           </div>

                           <div class="col-md-7 table-responsive">
                            <table class="table tablesaw-enhanced" id="transactionList">
                                <thead>
                                    <tr>                                                                      
                                        <th>Invoice</th>                                      
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Change</th>
                                        <th>Method</th>
                                        <th>Cashier</th>
                                        <th>View</th>
                                        <th>View</th>
                                   
                                    </tr>
                                </thead>
                                <tbody id="transaction_list"></tbody>
                            </table>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>


<script> window.$ = window.jQuery = require('jquery'); </script>

<script> 
// ADD POS JS HERE
    </script>

    <script src="assets/plugins/bootstrap/bootstrap.min.js"></script>
    <script src="assets/plugins/chosen/chosen.jquery.min.js"></script>
    <script src="assets/plugins/jquery-ui/jquery.form.min.js"></script>
    <script src="assets/plugins/daterangepicker/daterangepicker.min.js"></script>
    <script src="assets/plugins/dataTables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/dataTables/jquery.dataTables.bootstrap.js"></script>
    <script src="assets/plugins/dataTables/dataTables.buttons.min.js"></script>
    <script src="assets/plugins/dataTables/buttons.html5.min.js"></script>
    <script src="assets/plugins/dataTables/pdfmake.min.js"></script>
    <script src="assets/plugins/dataTables/vfs_fonts.js"></script>
    <script src="assets/js/pagination.js"></script>
    <script src="assets/js/listeners/index.js"></script>
    <!-- <script src="assets/plugins/jquery-ui/jquery-ui.min.js"></script>
    <script src="assets/plugins/jq-keyboard/jqkeyboard-min.js"></script>
    <script src="assets/plugins/jq-keyboard/jqk.layout.en.js"></script>
    <script src="assets/plugins/onscreen-keyboard/jquery.caret.min.js"></script> -->

    
    <script>

    // $(function () {
    //  "use strict";
    //     jqKeyboard.init({
    //         icon: "light"
    //       });
    //  });
 

    //  $('.holdOrderKeyboard').onscreenKeyboard({
	//     allowTypingClass: 'holdOrderInput'
    //   });


    //   $('.customerOrderKeyboard').onscreenKeyboard({
	//     allowTypingClass: 'holdCustomerOrderInput'
    //   });

     </script>

  </body>
</html>
