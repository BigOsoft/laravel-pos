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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </head>
  <body>
    @php
        echo "<h1 style='text-align: center;'>".$pos."</h1>";
        echo "<script>let allProducts = ".$products."; let allTransactions= ".$transactions."</script>" ;

    @endphp
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


    <script> window.jQuery = window.$ = jQuery = $ </script>

    <script src="assets/plugins/bootstrap/bootstrap.min.js"></script>
    <script src="assets/plugins/chosen/chosen.jquery.min.js"></script>
    <script src="assets/plugins/jquery-ui/jquery.form.min.js"></script>
    <script src="assets/plugins/daterangepicker/daterangepicker.min.js"></script>
    <script src="https://momentjs.com/downloads/moment.js"></script>
    <script src="assets/plugins/dataTables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/dataTables/jquery.dataTables.bootstrap.js"></script>
    <script src="assets/plugins/dataTables/dataTables.buttons.min.js"></script>
    <script src="assets/plugins/dataTables/buttons.html5.min.js"></script>
    <script src="assets/plugins/dataTables/pdfmake.min.js"></script>
    <script src="assets/plugins/dataTables/vfs_fonts.js"></script>
    <script src="assets/js/pagination.js"></script>
    <script src="assets/js/listeners/index.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <!-- <script src="assets/plugins/jquery-ui/jquery-ui.min.js"></script>
    <script src="assets/plugins/jq-keyboard/jqkeyboard-min.js"></script>
    <script src="assets/plugins/jq-keyboard/jqk.layout.en.js"></script>
    <script src="assets/plugins/onscreen-keyboard/jquery.caret.min.js"></script> -->

    
    <script>
        let allUsers = [];
        // let allProducts = [];
        let allCategories = [];
        let allVendors = [];
        let sold = [];
        let state = [];
        let sold_items = [];
        // let allTransactions = [];
        let platform;
        let user = {};
        let start = moment().startOf("month");
        let end = moment();
        let start_date = moment(start).toDate();
        let end_date = moment(end).toDate();
        let by_till = 0;
        let by_user = 0;
        let by_status = 1;
        let curr_symbol = "Rs.";
        let Swal;

        function loadSoldProducts() {
            sold.sort();

            let counter = 0;
            let sold_list = "";
            let items = 0;
            let products = 0;
            $("#product_sales").empty();

            sold.forEach((item, index) => {
                items += item.qty;
                products++;

                let product = allProducts.filter(function (selected) {
                    return selected.id == item.id;
                });
                // console.log(product[0] == undefined ? "undefined" : "defined");
                counter++;
                sold_list += `<tr>
                            <td>${item.product}</td>
                            <td>${item.qty}</td>
                            <td>${product[0] != undefined ? product[0].stock == 1 ? product.length > 0 ? product[0].quantity : "" : "N/A" : "N/A"
                    }</td>
                            <td>${curr_symbol + (item.qty * parseFloat(item.price)).toFixed(2)}</td>
                    <td>${curr_symbol + (item.qty * (parseFloat(item.price) - parseFloat(item.costPrice))).toFixed(2)}</td>
                            </tr>`;

                if (counter == sold.length) {
                $("#total_items #counter").text(items);
                $("#total_products #counter").text(products);
                $("#product_sales").empty();
                $("#productsSold").DataTable().destroy();
                $("#product_sales").html(sold_list);
                $("#productsSold").DataTable({
                    order: [[0, "asc"]],
                    autoWidth: false,
                    info: true,
                    JQueryUI: true,
                    ordering: true,
                    paging: true,
                    dom: "Bfrtip",
                    buttons: ["csv", "excel", "pdf"],
                });
                }
            });
        }
        
        function userFilter(users) {
              $("#users").empty();
              $("#users").append(`<option value="0">All</option>`);
            
              users.forEach((user) => {
                let u = allUsers.filter(function (usr) {
                  return usr._id == user;
                });
                $("#users").append(
                  `<option value="${user}">${user}</option>`
                );
              });
        }
        
        function tillFilter(tills) {
          $("#tills").empty();
          $("#tills").append(`<option value="0">All</option>`);
          // tills.forEach((till) => {
          // 	$("#tills").append(`<option value="${till}">${till}</option>`);
          // });
        }


        function loadTransactions() {
            let tills = [];
            let users = [];
            let sales = 0;
            let costs = 0;
            let transact = 0;
            let unique = 0;

            sold_items = [];
            sold = [];

            let counter = 0;
            let transaction_list = "";
            let query = `by-date?start=${start_date}&end=${end_date}&user=${by_user}&status=${by_status}&till=${by_till}`;
            let transactions = allTransactions; //run filter query here

            $("#transaction_list").empty();
            $("#product_sales").empty();
            if (transactions.length > 0) {
                $("#transaction_list").empty();
                $("#transactionList").DataTable().destroy();
                console.log(transactions);
                
                _.forEach(transactions, (trans, index) => {
                    sales += parseFloat(trans.total);
                    transact++;
                    _.forEach(JSON.parse(trans.items.slice(1,-1)), (item) => { sold_items.push(item); costs += (parseFloat(item.costPrice) * parseFloat(item.quantity)); });

                    // if (!tills.includes(trans.till)) {
                    // 	tills.push(trans.till);
                    // }

                    if (!users.includes(trans.user_id)) {
                        users.push(trans.user_id);
                    }

                    counter++;
                    transaction_list += `<tr>
                                            <td>${trans.order}</td>
                                            <td class="nobr">${moment(trans.date).format(
                    "YYYY MMM DD hh:mm:ss"
                    )}</td>
                                            <td>${curr_symbol + trans.total}</td>
                                            <td>${trans.paid == ""
                        ? ""
                        : curr_symbol + trans.paid
                    }</td>
                                            <td>${trans.change
                        ? curr_symbol +
                        Math.abs(trans.change).toFixed(2)
                        : ""
                    }</td>
                                            <td>${trans.paid == ""
                        ? ""
                        : // : trans.payment_type == 0
                        // ? "Cash"
                        // : "Card"
                        trans.payment_type
                    }</td>
                                            <td>${trans.user}</td>
                                            <td>${trans.paid == ""
                        ? '<button class="btn btn-dark"><i class="fa fa-search-plus"></i></button>'
                        : '<button onClick="$(this).viewTransaction(' +
                        index +
                        ')" class="btn btn-info"><i class="fa fa-search-plus"></i></button></td>'
                    }     
                    </tr>`;
                    if (counter == transactions.length) {
                    $("#total_profit #counter").text(
                        curr_symbol + (parseFloat(sales) - parseFloat(costs)).toFixed(0)
                    );
                    $("#total_sales #counter").text(
                        curr_symbol + parseFloat(sales).toFixed(0)
                    );
                    $("#total_transactions #counter").text(transact);

                    const result = {};

                    for (const { product_name, price, costPrice, quantity, id } of sold_items) {
                        if (!result[product_name]) result[product_name] = [];
                        result[product_name].push({ id, price, costPrice, quantity });
                    }

                    for (item in result) {
                        let price = 0;
                        let quantity = 0;
                        let id = 0;
                        let costPrice = 0;

                        result[item].forEach((i) => {
                        id = i.id;
                        price = i.price;
                        costPrice = i.costPrice;
                        quantity += i.quantity;
                        });

                        sold.push({
                        id: id,
                        product: item,
                        qty: quantity,
                        price: price,
                        costPrice: costPrice,
                        });
                    }

                    loadSoldProducts();

                    if (by_user == 0 && by_till == 0) {
                        userFilter(users);
                        tillFilter(tills);
                    }

                    $("#transaction_list").html(transaction_list);
                    $("#transactionList").DataTable({
                        order: [[0, "desc"]],
                        autoWidth: false,
                        info: true,
                        JQueryUI: true,
                        ordering: true,
                        paging: true,
                        dom: "Bfrtip",
                        buttons: ["csv", "excel", "pdf"],
                    });
                    }
                });
            } else {
            Swal.fire(
                "No data!",
                "No transactions available within the selected criteria",
                "warning"
            );
            }
        }
        loadTransactions();

    </script>

  </body>
</html>
