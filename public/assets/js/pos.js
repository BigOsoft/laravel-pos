let cart = [];
let allCustomers = [];
let index = 0;
let allUsers = [];
let allProducts = [];
let lowStockProducts = [];
let allCategories = [];
let allVendors = [];
let allTransactions = [];
let sold = [];
let state = [];
let sold_items = [];
let item;
let auth;
let holdOrder = 0;
let vat = 0;
let perms = null;
let deleteId = 0;
let paymentType = 0;
let FBRInvoice = "";
let qr = null;
let receipt = "";
let totalTax = 0;
let subTotal = 0;
let method = "";
let order_index = 0;
let user_index = 0;
let product_index = 0;
let transaction_index;
let barcode = {};
let host = "localhost";
let path = require("path");
let port = "8024";
let moment = require("moment");
let Swal = require("sweetalert2");
let { ipcRenderer } = require("electron");
var fs = require("fs");
var pdf = require("html-pdf");
var options = { format: "Letter" };

let dotInterval = setInterval(function () {
  $(".dot").text(".");
}, 3000);
let Store = require("electron-store");
const remote = require("electron").remote;
const app = remote.app;
let img_path = app.getPath("appData") + "/NON_POS/uploads/";
let receipt_path = "./NON_POS/receipt/receipt.pdf";
let api = "http://" + host + ":" + port + "/api/";
let btoa = require("btoa");
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");
let JsBarcode = require("jsbarcode");
let macaddress = require("macaddress");
const { set } = require("../../api/users");
let categories = [];
let vendors = [];
let holdOrderList = [];
let customerOrderList = [];
let ownUserEdit = null;
let totalPrice = 0;
let orderTotal = 0;
let auth_error = "Incorrect username or password";
let auth_empty = "Please enter a username and password";
let holdOrderlocation = $("#randerHoldOrders");
let customerOrderLocation = $("#randerCustomerOrders");
let storage = new Store();
let settings;
let platform;
let user = {};
let start = moment().startOf("month");
let end = moment();
let start_date = moment(start).toDate();
let end_date = moment(end).toDate();
let by_till = 0;
let by_user = 0;
let by_status = 1;
let totalQty = 0;
let FBRimg = new Image();
FBRimg.src =
  " data:image/png;base64,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";
const { PosPrinter } = remote.require("electron-pos-printer");
const _ = require("lodash");
const TransactionModel = require("../../api/models/Transactions-model");
const Product = require("../../api/models/Inventory-model");
const Cart = require("../../models/Cart");
const {
  calculateCartNetTotal,
  calculateHoldOrderNetTotal,
  calculateHoldOrderForEmployees,
} = require("../../utils/cartCalculations");

const poscart = new Cart();

$(function () {
  function cb(start, end) {
    $("#reportrange span").html(
      start.format("MMMM D, YYYY") + "  -  " + end.format("MMMM D, YYYY")
    );
  }

  $("#reportrange").daterangepicker(
    {
      startDate: start,
      endDate: end,
      autoApply: true,
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 10,
      timePickerSeconds: true,
      // minDate: '',
      ranges: {
        Today: [moment().startOf("day"), moment()],
        Yesterday: [
          moment().subtract(1, "days").startOf("day"),
          moment().subtract(1, "days").endOf("day"),
        ],
        "Last 7 Days": [
          moment().subtract(6, "days").startOf("day"),
          moment().endOf("day"),
        ],
        "Last 30 Days": [
          moment().subtract(29, "days").startOf("day"),
          moment().endOf("day"),
        ],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "This Month": [moment().startOf("month"), moment()],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    cb
  );

  cb(start, end);
});

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};

auth = storage.get("auth");
user = storage.get("user");

if (auth == undefined) {
  $.get(api + "users/check/", function (data) {});
  $.get("http://localhost:8024/api/settings/check", function (data) {});
  $("#loading").show();
  authenticate();
  // console.log("auth");
} else {
  // console.log(user._id);
  $("#loading").show();

  setTimeout(function () {
    $("#loading").hide();
  }, 2000);

  $.get("http://localhost:8024/api/settings/get", function (data) {
    settings = data;
    storage.set("settings", settings);
  });

  platform = storage.get("settings");
  platform != "undefined" ? console.log("Settings loaded.") : refreshPage;

  if (platform != undefined) {
    if (platform.app == "Network Point of Sale Terminal") {
      api = "http://" + platform.ip + ":" + port + "/api/";
      perms = true;
    }
  }

  $.get(api + "users/user/" + user._id, function (data) {
    user = data;
    $("#loggedin-user").text(user.fullname);
  });

  $.get(api + "users/all", function (users) {
    allUsers = [...users];
  });
  // console.log(user.perm_settings);
  $(document).ready(function () {
    user = storage.get("user");
    // console.log(storage.get("user"));
    // console.log("user details");
    // console.log(user.perm_settings);
    $(".loading").hide();
    $("#skuCode").focus();

    loadCategories();
    loadVendors();
    loadProducts();
    loadCustomers();
    getHoldOrders();
    if (settings && settings.symbol) {
      $("#price_curr, #payment_curr, #change_curr").text(settings.symbol);
    }

    setTimeout(function () {
      if (settings == undefined && auth != undefined) {
        //$("#settingsModal").modal("show");
      } else {
        vat = parseFloat(settings.percentage);
        $("#taxInfo").text(settings.charge_tax ? vat : 0);
      }
    }, 1500);

    $("#settingsModal").on("hide.bs.modal", function () {
      setTimeout(function () {
        if (settings == undefined && auth != undefined) {
          //$("#settingsModal").modal("show");
        }
      }, 1000);
    });

    if (0 == user.perm_products) {
      $(".p_one").hide();
    }
    if (0 == user.perm_categories) {
      $(".p_two").hide();
    }
    if (0 == user.perm_transactions) {
      $(".p_three").hide();
    }
    if (0 == user.perm_users) {
      $(".p_four").hide();
    }
    if (0 == user.perm_settings) {
      $(".p_five").hide();
    }

    function productCardTemplate(data) {
      var html = "<div>";
      $.each(data, function (index, item) {
        html += `<div class="col-lg-2 box ${_.snakeCase(item.category)}"
			onclick="$(this).addToCart('${item._id}', ${item.quantity}, ${item.stock})">
		<div class="widget-panel widget-style-2 ">                                   
					<div class="text-muted m-t-5 text-center">
          <div id="image"><img src="${
            item.img == ""
              ? "./assets/images/default.jpg"
              : process.env.APPDATA + "/NON_POS/uploads/" + item.img
          }" id="product_img" alt=""></div> 
					<div class="name" id="product_name">${item.name}</div> 
					<span class="sku">${item.sku}</span>
					<span class="stock">STOCK </span><span class="count">${
            item.stock == 1 ? item.quantity : "N/A"
          }</span></div>
					<sp class="text-success text-center"><b data-plugin="counterup">${
            settings.symbol + item.price
          }</b> </sp>
		</div>
	</div>`;
      });
      html += "</div>";

      return html;
    }

    function loadProducts() {
      $.get(api + "inventory/products", function (data) {
        data.forEach((item) => {
          item.price = parseFloat(item.price).toFixed(2);
        });
        allProducts = [...data];
        loadProductList();
        RenderProducts(data);
        loadProductCategories();
      });
    }

    function loadProductCategories() {
      $("#categories").html(
        `<button type="button"  onclick="$(this).filterByCategory('all');" class="btn btn-categories btn-white waves-effect waves-light">All</button> `
      );
      $.each(allCategories, (index, category) => {
        $("#categories").append(
          `<button type="button" id="${category._id}"  onclick="$(this).filterByCategory('${category._id}');" class="btn btn-categories btn-white waves-effect waves-light">${category._id}</button> `
        );
      });
    }

    $.fn.filterByCategory = function (category) {
      if (category === "all") return loadProducts();
      let filteredProducts = _.filter(
        allProducts,
        (product) => product.category === category
      );
      RenderProducts(filteredProducts);
    };

    function RenderProducts(data) {
      $("#parent").empty();
      $("#pagination-container").pagination({
        dataSource: data,
        pageSize: 15,
        pageRange: 5,
        callback: function (data, pagination) {
          // template method of yourself
          var html = productCardTemplate(data);
          $("#parent").html(html);
        },
      });
    }

    $("#search").on("input", function () {
      let inputVal = $(this).val();
      if (inputVal === "") return loadProducts();
      let filteredProducts = _.filter(allProducts, (product) => {
        return _.includes(
          String(product.name).toLowerCase(),
          String(inputVal).toLowerCase()
        );
      });
      RenderProducts(filteredProducts);
    });

    function RenderCategories(data) {
      $("#parent").empty();
      $("#pagination-container").pagination({
        dataSource: data,
        pageSize: 15,
        pageRange: 5,
        callback: function (data, pagination) {
          // template method of yourself
          var html = productCardTemplate(data);
          $("#parent").html(html);
        },
      });
    }

    function RenderVendors(data) {
      $("#parent").empty();
      $("#pagination-container").pagination({
        dataSource: data,
        pageSize: 15,
        pageRange: 5,
        callback: function (data, pagination) {
          // template method of yourself
          var html = productCardTemplate(data);
          $("#parent").html(html);
        },
      });
    }

    function loadCategories() {
      $.get(api + "categories/all", function (data) {
        allCategories = data;
        loadCategoryList();
        $("#category").html(`<option value="0">Select</option>`);
        allCategories.forEach((category) => {
          // console.log(category._id);
          $("#category").append(
            `<option value="${category._id}">${category._id}</option>`
          );
        });
      });
      RenderCategories(allCategories);
    }

    function loadVendors() {
      $.get(api + "vendors/all", function (data) {
        allVendors = data;
        loadVendorList();
        $("#vendor").html(`<option value="0">Select</option>`);
        allVendors.forEach((vendor) => {
          // console.log(vendor._id);
          $("#vendor").append(
            `<option value="${vendor._id}">${vendor._id}</option>`
          );
        });
      });
      RenderVendors(allVendors);
    }

    async function loadCustomers() {
      $.get(api + "customers/all", function (customers) {
        $("#customer").html(
          `<option value="0" selected="selected">Walk in customer</option>`
        );

        customers.forEach((cust) => {
          allCustomers.push(cust);
          const value = {
            id: cust._id,
            name: cust.name,
          };
          let customer = `<option value='${JSON.stringify(value)}'>${
            cust.name
          }</option>`;
          $("#customer").append(customer);
        });

        //  $('#customer').chosen();
      });
    }

    const updateCustomersArray = () => {
      $.get(api + "customers/all", function (customers) {
        allCustomers = customers;
      });
    };

    $.fn.addToCart = function (id, count, stock) {
      if (stock == 1) {
        if (count > 0) {
          $.get(api + "inventory/product/" + id, function (data) {
            $(this).addProductToCart(data);
            poscart.addItemToCart(data);
          });
        } else {
          Swal.fire(
            "Out of stock!",
            "This item is currently unavailable",
            "info"
          );
        }
      } else {
        $.get(api + "inventory/product/" + id, function (data) {
          $(this).addProductToCart(data);
          poscart.addItemToCart(data);
        });
      }
    };

    function barcodeSearch(e) {
      e.preventDefault();
      $("#basic-addon2").empty();
      $("#basic-addon2").append($("<i>", { class: "fa fa-spinner fa-spin" }));

      let req = {
        skuCode: $("#skuCode").val(),
      };

      $.ajax({
        url: api + "inventory/product/sku",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        cache: false,
        processData: false,
        success: function (data) {
          if (
            (data._id != undefined && data.quantity >= 1) ||
            data.stock === 0
          ) {
            $(this).addProductToCart(data);
            $("#searchBarCode").get(0).reset();
            $("#basic-addon2").empty();
            $("#basic-addon2").append(
              $("<i>", { class: "glyphicon glyphicon-ok" })
            );
          } else if (data.quantity < 1) {
            Swal.fire(
              "Out of stock!",
              "This item is currently unavailable",
              "info"
            );
          } else {
            $("#newProduct").modal("show");
            $("#product_id").val($("#skuCode").val());
          }
        },
        error: function (data) {
          if (data.status === 422) {
            $(this).showValidationError(data);
            $("#basic-addon2").append(
              $("<i>", { class: "glyphicon glyphicon-remove" })
            );
          } else if (data.status === 404) {
            $("#basic-addon2").empty();
            $("#basic-addon2").append(
              $("<i>", { class: "glyphicon glyphicon-remove" })
            );
          } else {
            $(this).showServerError();
            $("#basic-addon2").empty();
            $("#basic-addon2").append(
              $("<i>", { class: "glyphicon glyphicon-warning-sign" })
            );
          }
        },
      });
    }

    $("#searchBarCode").on("submit", function (e) {
      barcodeSearch(e);
    });

    $("body").on("click", "#jq-keyboard button", function (e) {
      let pressed = $(this)[0].className.split(" ");
      if ($("#skuCode").val() != "" && pressed[2] == "enter") {
        barcodeSearch(e);
      }
    });

    $.fn.addProductToCart = function (data) {
      item = {
        id: data._id,
        product_name: data.name,
        price: data.price,
        tax: data.tax,
        quantity: 1,
        costPrice: data.costPrice,
      };

      if ($(this).isExist(item)) {
        $(this).qtIncrement(index);
      } else {
        cart.push(item);
        $(this).renderTable(cart);
      }
    };

    $.fn.isExist = function (data) {
      let toReturn = false;
      $.each(cart, function (index, value) {
        if (value.id == data.id) {
          $(this).setIndex(index);
          toReturn = true;
        }
      });
      return toReturn;
    };

    $.fn.setIndex = function (value) {
      index = value;
    };

    $.fn.calculateCart = function () {
      const customer = getselectedCustomer();
      let total = 0; //200
      let grossTotal = 0;
      let calcTax = 0;
      $("#total").text(cart.length);
      $.each(cart, function (index, data) {
        //100 17% 2
        let localAddition =
          customer && customer.discountType === "COST_PRICE"
            ? data.quantity * data.costPrice
            : data.quantity * data.price; //200
        total += localAddition / (1 + data.tax / 100); //200
        if (data.tax > 0) {
          grossTotal += localAddition; // 234
          calcTax += (localAddition * data.tax) / 100; //34
        } else {
          grossTotal += localAddition;
        }
      });

      let discount = $("#inputDiscount").val();
      // total = total - discount;
      $("#price").text(settings.symbol + total.toFixed(2));

      subTotal = total;
      totalTax = calcTax;

      if ($("#inputDiscount").val() >= total) {
        $("#inputDiscount").val(0);
      }
      if (!settings.charge_tax) {
        //totalVat = (total * vat) / 100;
        //grossTotal = total + totalVat; //remove all
        //} else {
        grossTotal = total;
      }
      if (customer && customer.discountType === "PERCENTAGE") {
        $("#inputDiscount").val(
          (customer.discountPercentage / 100) * Math.ceil(grossTotal)
        );
        discount = (customer.discountPercentage / 100) * Math.ceil(grossTotal);
      }
      grossTotal = Math.ceil(grossTotal) - discount;
      if (total == 0) {
        grossTotal = 0;
      }

      orderTotal = grossTotal;
      $("#gross_price").text(settings.symbol + `${grossTotal}`);
      $("#payablePrice").val(grossTotal);
    };

    $.fn.renderTable = function (cartList) {
      $("#cartTable > tbody").empty();
      $(this).calculateCart();
      $.each(cartList, function (index, data) {
        let x = 5;
        $("#cartTable > tbody").append(
          $("<tr>").append(
            $("<td>", { text: index + 1 }),
            $("<td>", { text: data.product_name, style: "width: 170px" }),
            $("<td>").append(
              $("<div>", {
                class: "input-group",
                style: "width: 150px",
              }).append(
                $("<div>", { class: "input-group-btn btn-xs" }).append(
                  $("<button>", {
                    class: "btn btn-default btn-xs",
                    onclick: "$(this).qtDecrement(" + index + ")",
                  }).append($("<i>", { class: "fa fa-minus" }))
                ),
                $("<span>", {
                  class: "form-control",
                  text: data.quantity,
                }),
                $("<div>", { class: "input-group-btn btn-xs" }).append(
                  $("<button>", {
                    class: "btn btn-default btn-xs",
                    onclick: "$(this).qtIncrement(" + index + ")",
                  }).append($("<i>", { class: "fa fa-plus" }))
                )
              )
            ),
            $("<td>").append(
              $("<input>", {
                id: `cartProduct_${index}`,
                value:
                  getselectedCustomer() &&
                  getselectedCustomer().discountType === "COST_PRICE"
                    ? (data.costPrice * data.quantity).toFixed(2)
                    : (data.price * data.quantity).toFixed(2),
                onchange: `$(this).changePrice(${index})`,
                style: "width:100px",

                // value: settings.symbol + (data.price * data.quantity),
              })
            ),
            $("<td>").append(
              $("<button>", {
                class: "btn btn-danger btn-xs",
                onclick: "$(this).deleteFromCart(" + index + ")",
              }).append($("<i>", { class: "fa fa-times" }))
            )
          )
        );
        $.fn.returnprice = function (index) {
          return 5;
        };
        $.fn.changePrice = function (index) {
          item = cart[index];
          item.price = $(`#cartProduct_${index}`).val();
          $(this).renderTable(cart);
        };
      });
    };

    $.fn.deleteFromCart = function (index) {
      cart.splice(index, 1);
      $(this).renderTable(cart);
    };

    $.fn.qtIncrement = function (i) {
      item = cart[i];

      let product = allProducts.filter(function (selected) {
        return selected._id == parseInt(item.id);
      });

      if (product[0].stock == 1) {
        if (item.quantity < product[0].quantity) {
          item.quantity += 1;
          $(this).renderTable(cart);
        } else {
          Swal.fire(
            "No more stock!",
            "You have already added all the available stock.",
            "info"
          );
        }
      } else {
        item.quantity += 1;
        $(this).renderTable(cart);
      }
    };

    $.fn.qtDecrement = function (i) {
      if (item.quantity > 1) {
        item = cart[i];
        item.quantity -= 1;
        $(this).renderTable(cart);
      }
    };

    $.fn.qtInput = function (i) {
      item = cart[i];
      item.quantity = $(this).val();
      $(this).renderTable(cart);
    };

    $.fn.refreshPage = function () {
      location.reload();
    };

    $.fn.cancelOrder = function () {
      if (cart.length > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You are about to remove all items from the cart.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, clear it!",
        }).then((result) => {
          if (result.value) {
            cart = [];
            $(this).renderTable(cart);
            holdOrder = 0;

            Swal.fire("Cleared!", "All items have been removed.", "success");
          }
        });
      }
    };

    $("#payButton").on("click", function (e) {
      e.preventDefault();
      if (cart.length != 0) {
        $("#paymentModel").modal("toggle");
        $("#confirmPayment").hide();
      } else {
        Swal.fire("Oops!", "There is nothing to pay!", "warning");
      }
    });

    $("#paymentModel").on("shown.bs.modal", function () {
      $(this).find("#payment").focus();
    });

    $("#hold").on("click", function () {
      if (cart.length != 0) {
        $("#dueModal").modal("toggle");
      } else {
        Swal.fire("Oops!", "There is nothing to hold!", "warning");
      }
    });

    function printJobComplete() {
      alert("print job complete");
    }

    $.fn.submitDueOrder = function (status) {
      let items = "";
      let payment = 0;
      totalQty = 0;

      cart.forEach((item) => {
        totalQty += parseInt(item.quantity);
        items +=
          "<table width='100%'><tr style='border: none;'><td style='text-align: left;'>" +
          item.product_name +
          "</td></tr></table>" +
          "<table width='100%'><tbody style='width:100%; display: table; border: none;'><tr>" +
          "<td width='20%'>&nbsp;</td>" +
          "<td style='text-align: center;'>" +
          item.quantity +
          "</td><td style='text-align: center;'>" +
          parseFloat(item.price).toFixed(1) +
          "</td><td style='text-align: center;'>" +
          parseFloat(item.quantity * item.price * item.tax * 0.01).toFixed(1) +
          "</td><td style='text-align: center;'>" +
          parseFloat(item.price * item.quantity).toFixed(1) +
          "</td></tr></tbody></table>";
      });

      let currentTime = new Date(moment());

      let discount = $("#inputDiscount").val();
      let customer = JSON.parse($("#customer").val());
      let date = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");
      let paid =
        $("#payment").val() == ""
          ? ""
          : parseFloat($("#payment").val()).toFixed(2);
      let change =
        $("#change").text() == ""
          ? ""
          : parseFloat($("#change").text()).toFixed(2);
      let refNumber = $("#refNumber").val();
      let orderNumber = holdOrder;

      let type = "";
      let tax_row = "";

      switch (paymentType) {
        case 1:
          type = "Cheque";
          break;

        case 2:
          type = "Card";
          break;

        default:
          type = "Cash";
      }

      if (paid != "") {
        payment = `<tr>
                        <td>Paid</td>
                        <td>:</td>
                        <td>${settings.symbol + paid}</td>
                    </tr>
                    <tr>
                        <td>Change</td>
                        <td>:</td>
                        <td>${
                          settings.symbol + Math.abs(change).toFixed(2)
                        }</td>
                    </tr>
                    <tr>
                        <td>Method</td>
                        <td>:</td>
                        <td>${type}</td>
                    </tr>`;
      }

      if (settings.charge_tax) {
        tax_row = `<tr>
                    <td>GST </td>
                    <td>:</td>
                    <td>${totalTax.toFixed(2)}</td>
                </tr>`;
      }

      if (status == 0) {
        if ($("#customer").val() == 0 && $("#refNumber").val() == "") {
          Swal.fire(
            "Reference Required!",
            "You either need to select a customer <br> or enter a reference!",
            "warning"
          );

          return;
        }
      }

      $(".loading").show();

      orderNumber = Math.floor(Date.now() / 1000);
      method = "POST";
      if (status == 3) {
        if (cart.length > 0) {
          printJS({ printable: receipt, type: "raw-html" });

          $(".loading").hide();
          return;
        } else {
          $(".loading").hide();
          return;
        }
      }
      JsBarcode(barcode, orderNumber);
      let data = {
        InvoiceNumber: "",
        posID: settings.posID,
        order: orderNumber,
        ref_number: refNumber,
        discount: discount,
        customer: customer,
        status: status,
        subtotal: parseFloat(subTotal).toFixed(2),
        tax: totalTax,
        order_type: 1,
        items: cart,
        date: currentTime,
        payment_type: type,
        payment_info: $("#paymentInfo").val(),
        total: orderTotal,
        paid: paid,
        change: change,
        _id: orderNumber,
        till: platform.till,
        mac: platform.mac,
        user: user.fullname,
        user_id: user._id,
      };
      const setFBRInvoice = async (number) => {
        if (number != undefined) {
          FBRInvoice = number;
          await $.get(
            api + "qr/?invoiceno=" + orderNumber,
            function (data, status) {
              qr = new Image();
              qr.src = data;
            }
          );
        } else {
          FBRInvoice = " ";
        }
        return FBRInvoice;
      };
      $.ajax({
        url: api + "new",
        type: method,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        cache: false,
        processData: false,
        success: function async(data) {
          cart = [];
          setFBRInvoice(orderNumber)
            .then(() => {
              receipt = `
              <div style="font-size: 12px; font-weight: bold;">                            
              <p style="text-align: center;">
              <table width="100%">
                <tr>
                  <th style="text-align: center;"><img style="max-width: 100px;" src ="./assets/images/fcmart-logo.png" /></th>
                </tr>
                <tr>
                <td style="text-align: center;"><span style="font-size: 12px; font-weight: bold;">FM-Mart<br>Sale Invoice</span><br><span style="font-size: 12px;">${
                  settings.address_two
                }<br>${settings.address_one}<br>${date}</span></td>
                </tr>
              </table>
              <br>
              </p>
              <table width="100%" style="font-size: 12px;">
                <thead style="text-align: center;">
                <tr style="">
                  <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Item</th>
                  <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Qty</th>
                  <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Rate</th>
                  <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">GST</th>
                  <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">TOTAL</th>
                </tr>
                </thead>
                </table>
                ${items}
                <hr style='border-top: 1px solid black;'>
                <tbody>             
                  <table width="100%" style="font-size: 12px; border-bottom: 1px solid black;">
                    <tr style="border: none;">
                      <td style="text-align: left;">Total items: </td>
                      <td style="text-align: right;">${totalQty}</td>
                    </tr>
                    <tr>
                      <td>Invoice total: </td>
                      <td style="text-align: right;">${orderTotal.toFixed(
                        0
                      )}</td>
                    </tr>
                    <tr style="border: none;">
                      <td style="text-align: left;">Discount</td>
                      <td style="text-align: right;">${
                        discount > 0 ? parseFloat(discount).toFixed(2) : 0.0
                      }</td>
                    </tr>
                    <tr style="border: none;">
                      <td style="text-align: left;">Free voucher: </td>
                      <td style="text-align: right;">0.00</td>
                    </tr>
                    <tr style="border-top: 1px dotted black;">
                      <td>Invoice net total: </td>
                      <td style="text-align: right;">${orderTotal.toFixed(0)}
                      </td>
                    </tr>
                    <tr style="border: none;">
                      <td style="text-align: left;">Cash paid: </td>
                      <td style="text-align: right;">${paid}</td>
                    </tr>
                    <tr style="border: none;">
                      <td style="text-align: left;">Customer balance: </td>
                      <td style="text-align: right;">${Math.abs(change).toFixed(
                        0
                      )}</td>
                    </tr>
                    <tr style="border-top: 1px dotted black;">
                      <td style="text-align: left;">Total GST: </td>
                      <td style="text-align: right;">${
                        settings.charge_tax ? totalTax.toFixed(0) : 0.0
                      }</td>
                    </tr>
                  </table>
                  <table width='100%' style='margin-top: 2px; border-bottom: 2px solid black; border-top: 1px solid black;'>
                    <tr>
                      <td style='text-align: center;'>Payment Details</td>
                    </tr>
                  </table>
                  <table width='100%' style='border-bottom: 1px solid black;'>
                    <tr>
                      <td>Credit card</td>
                      <td>0.00</td>
                      <td>Cash</td>
                      <td>${orderTotal.toFixed(2)}</td>
                    </tr>
                  </table>
                  <table width="100%">
                    <tr>
                      <td style="text-align: left;">Order no:</td>
                      <td style="text-align: right;">${orderNumber}</td>
                    </tr>
                  </table>
                <tr>
                  <img id="barcode" style="display: block; margin-left: auto; margin-right: auto;"/>
                </tr>
                  </tbody>
                  </table>
                  <hr>
                  </div>`;
              silentPrint([
                {
                  type: "image",
                  position: "center",
                  width: "130px",
                  height: "128px",
                  path: path.join(__dirname, "/../images/fcmart-logo.png"),
                },
                { type: "text", value: receipt },
              ]);
              return receipt;
            })
            .then((receipt) => {
              $("#viewTransaction").html("");
              $("#viewTransaction").html(receipt);
              $("#orderModal").modal("show");
              JsBarcode("#barcode", orderNumber, { height: 20 });
              loadProducts();
              loadCustomers();
              $(".loading").hide();
              $("#dueModal").modal("hide");
              $("#paymentModel").modal("hide");

              getHoldOrders();
              $(this).getCustomerOrders();
              $(this).renderTable(cart);
            })
            .then(() => $("#paymentModel").modal("hide"));
        },
        error: function (data) {
          $(".loading").hide();
          $("#dueModal").modal("toggle");
          swal(
            "Something went wrong!",
            "Please refresh this page and try again"
          );
        },
      });

      $("#refNumber").val("");
      $("#change").text("");
      $("#payment").val("");
    };
    $("#deleteProducts").click((e) => {
      e.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete Products.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "inventory/products",
            type: "DELETE",
            success: function (result) {
              $("#Products").modal("hide");
              Swal.fire("Done!", "Products deleted", "success")
                .then(() => {
                  $(".loading").show();
                  loadProducts();
                })
                .then(() => $(".loading").hide());
            },
          });
        }
      });
    });
    $("#deleteCategories").click((e) => {
      e.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete the categories.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "categories/category/",
            type: "DELETE",
            success: function (result) {
              $("#categories").modal("hide");
              Swal.fire("Done!", "Category deleted", "success")
                .then(() => {
                  loadCategories();
                  loadVendors();
                  loadCategoryList();
                  loadProductList();
                  loadProducts();
                  $(".loading").show();
                })
                .then(() => $(".loading").hide());
            },
          });
        }
      });
    });

    $.fn.calculatePrice = function (data) {
      totalPrice = 0;
      totalTax = 0;
      $.each(data.products, function (index, product) {
        totalPrice += product.price * product.quantity;
        if (product.tax > 0) {
          totalTax += product.price * product.tax * 0.01;
        }
      });
      //let vat = (totalPrice * data.vat) / 100;
      totalPrice = (totalPrice + totalTax - data.discount).toFixed(0);

      return totalPrice;
    };

    $.fn.orderDetails = function (index, orderType) {
      $("#customer option:selected").removeAttr("selected");

      $("#customer option")
        .filter(function () {
          if (holdOrderList[index].customer == 0)
            return $(this).text() == "Walk in customer";
          else {
            if ($(this).val() == 0) return false;
            const cust = JSON.parse($(this).val());
            return cust.id === holdOrderList[index].customer._id;
          }
        })
        .prop("selected", true);

      holdOrder = holdOrderList[index]._id;
      cart = holdOrderList[index].items;
      $(this).renderTable(cart);
      $("#holdOrdersModal").modal("hide");
      $("#customerModal").modal("hide");
    };

    $.fn.deleteOrder = function (index, type) {
      switch (type) {
        case 1:
          deleteId = holdOrderList[index]._id;
          break;
        case 2:
          deleteId = customerOrderList[index]._id;
      }

      let data = {
        orderId: deleteId,
      };

      Swal.fire({
        title: "Delete order?",
        text: "This will delete the order. Are you sure you want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "delete",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            cache: false,
            success: function (data) {
              getHoldOrders();
              $(this).getCustomerOrders();

              Swal.fire("Deleted!", "You have deleted the order!", "success");
            },
            error: function (data) {
              $(".loading").hide();
            },
          });
        }
      });
    };

    $.fn.getCustomerOrders = function () {
      $.get(api + "customer-orders", function (data) {
        clearInterval(dotInterval);
        customerOrderList = data;
        customerOrderLocation.empty();
      });
    };

    $("#saveCustomer").on("submit", function (e) {
      e.preventDefault();

      let custData = {
        name: $("#userName").val(),
        phone: $("#phoneNumber").val(),
        email: $("#emailAddress").val(),
        address: $("#userAddress").val(),
        discountType: document.getElementById("discountType").value,
        discountPercentage: document.getElementById("discountPercentage").value,
      };

      $.ajax({
        url: api + "customers/customer",
        type: "POST",
        data: JSON.stringify(custData),
        contentType: "application/json; charset=utf-8",
        cache: false,
        processData: false,
        success: async () => {
          $("#newCustomer").modal("hide");
          Swal.fire(
            "Customer added!",
            "Customer added successfully!",
            "success"
          );
          loadCustomers();
          $("#saveCustomer").get(0).reset();
        },

        error: function (data) {
          $("#newCustomer").modal("hide");
          Swal.fire("Error", "Something went wrong please try again", "error");
        },
      });
    });

    $("#confirmPayment").hide();

    $("#cardInfo").hide();

    $("#payment").on("input", function () {
      $(this).calculateChange();
    });

    $("#confirmPayment").on("click", function (e) {
      e.preventDefault();
      if ($("#payment").val() == "") {
        Swal.fire("Nope!", "Please enter the amount that was paid!", "warning");
      } else {
        $(this).submitDueOrder(1);
      }
    });

    $("#transactions").click(function () {
      loadTransactions();
      loadUserList();

      $("#pos_view").hide();
      $("#pointofsale").show();
      $("#transactions_view").show();
      $(this).hide();
    });

    $("#pointofsale").click(function () {
      $("#pos_view").show();
      $("#transactions").show();
      $("#transactions_view").hide();
      $(this).hide();
    });

    $("#viewRefOrders").click(function () {
      setTimeout(function () {
        $("#holdOrderInput").focus();
      }, 500);
    });

    $("#viewCustomerOrders").click(function () {
      setTimeout(function () {
        $("#holdCustomerOrderInput").focus();
      }, 500);
    });

    $("#newProduct").on("hidden.bs.modal", function (e) {
      $("#isNew").val("1");
      $("#product_id").prop("readonly", false);
      $("#submitProduct").prop("disabled", true);
    });

    $.fn.checkDuplicateID = function () {
      if ($("#isNew").val() == "1") {
        let sku = $("#product_id").val();
        fetch(api + "inventory/product/" + sku, {
          method: "get",
        }).then(function (response) {
          if (response.status == "200") {
            $("#sku-alert").removeClass("hidden");
            $("#submitProduct").prop("disabled", true);
          } else {
            $("#sku-alert").addClass("hidden");
            $("#submitProduct").prop("disabled", false);
          }
        });
      }
    };

    $("#newProductModal").click(function () {
      $("#saveProduct").get(0).reset();
      $("#current_img").text("");
    });

    $("#importProduct").submit(function (e) {
      e.preventDefault();

      $(this).attr("action", api + "inventory/products/upload");
      $(this).attr("method", "POST");

      $(this).ajaxSubmit({
        contentType: "application/json",
        success: function (response) {
          loadCategories();
          loadCategoryList();
          loadVendors();
          loadVendorList();
          loadProducts();
          $("#importProduct").get(0).reset();
          $("#importProducts").modal("hide");
          Swal.fire({
            title: "Products Saved",
            icon: "success",
          });
        },
        error: function (data) {
          console.error(data);
        },
      });
    });

    $("#saveProduct").submit(function (e) {
      e.preventDefault();
      console.log("hello");
      $(this).attr("action", api + "inventory/product");
      $(this).attr("method", "POST");
      $(this).ajaxSubmit({
        contentType: "application/json",
        success: function (response) {
          $("#saveProduct").get(0).reset();
          $("#current_img").text("");

          loadProducts();
          $("#newProduct").modal("hide");
          Swal.fire({
            title: "Product Saved",
            text: "Select an option below to continue.",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add another",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.value) {
              $("#newProduct").modal("show");
            }
          });
        },
        error: function (data) {
          console.log(data);
        },
      });
    });

    $("#saveCategory").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: api + "categories/category",
        data: $(this).serialize(),
        success: function (data, textStatus, jqXHR) {
          $("#saveCategory").get(0).reset();
          loadCategories();
          loadVendors();
          loadProducts();
          Swal.fire({
            title: "Category Saved",
            text: "Select an option below to continue.",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add another",
            cancelButtonText: "Close",
          }).then((result) => {
            if (!result.value) {
              $("#newCategory").modal("hide");
            }
          });
        },
        error: function (data) {
          console.log(data);
        },
      });
    });

    $("#saveVendor").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: api + "vendors/vendor",
        data: $(this).serialize(),
        success: function (data, textStatus, jqXHR) {
          $("#saveVendor").get(0).reset();
          loadCategories();
          loadVendors();
          loadProducts();
          Swal.fire({
            title: "Vendor Saved",
            text: "Select an option below to continue.",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add another",
            cancelButtonText: "Close",
          }).then((result) => {
            if (!result.value) {
              $("#newVendor").modal("hide");
            }
          });
        },
        error: function (data) {
          console.log(data);
        },
      });
    });

    $.fn.editProduct = async (id) => {
      let index = await _.findIndex(
        allProducts,
        (product) => product._id == id
      );
      $("#category option")
        .filter(function () {
          return $(this).val() == allProducts[index].category;
        })
        .prop("selected", true);
      const product = new Product(allProducts[index]);

      $("#vendor option")
        .filter(function () {
          return $(this).val() == allProducts[index].vendor;
        })
        .prop("selected", true);
      $("#isNew").val("0");
      $("#productName").val(product.name);
      $("#product_price").val(product.price);
      $("#product_tax").val(product.tax);
      $("#quantity").val(product.quantity);
      $("#product_id").val(product._id);
      $("#minStockAllowed_input").val(product.minStockAllowed);
      $("#product_cost_price").val(product.costPrice);
      $("#product_id").prop("readonly", true);
      $("#submitProduct").prop("disabled", false);
      $("#img").val(allProducts[index].img);
      if (allProducts[index].img != "") {
        $("#imagename").hide();
        $("#current_img").html(
          `<img src="${img_path + allProducts[index].img}" alt="">`
        );
        $("#rmv_img").show();
      }

      if (allProducts[index].stock == 0) {
        $("#stock").prop("checked", true);
        handleStockCheckboxChange(true);
      } else {
        handleStockCheckboxChange(false);
      }

      $("#newProduct").modal("show");
    };

    $("#userModal").on("hide.bs.modal", function () {
      $(".perms").hide();
    });

    $.fn.editUser = function (index) {
      user_index = index;

      $("#Users").modal("hide");

      $(".perms").show();

      $("#user_id").val(allUsers[index]._id);
      $("#fullname").val(allUsers[index].fullname);
      $("#username").val(allUsers[index].username);
      $("#password").val(atob(allUsers[index].password));

      if (allUsers[index].perm_products == 1) {
        $("#perm_products").prop("checked", true);
      } else {
        $("#perm_products").prop("checked", false);
      }

      if (allUsers[index].perm_categories == 1) {
        $("#perm_categories").prop("checked", true);
      } else {
        $("#perm_categories").prop("checked", false);
      }

      if (allUsers[index].perm_transactions == 1) {
        $("#perm_transactions").prop("checked", true);
      } else {
        $("#perm_transactions").prop("checked", false);
      }

      if (allUsers[index].perm_users == 1) {
        $("#perm_users").prop("checked", true);
      } else {
        $("#perm_users").prop("checked", false);
      }

      if (allUsers[index].perm_settings == 1) {
        $("#perm_settings").prop("checked", true);
      } else {
        $("#perm_settings").prop("checked", false);
      }

      $("#userModal").modal("show");
      $("#username").attr("disabled", "disabled");
    };

    $.fn.editCategory = function (index) {
      $("#Categories").modal("hide");
      $("#categoryName").val(allCategories[index]._id);
      $("#category_id").val(allCategories[index]._id);
      $("#newCategory").modal("show");
    };

    $.fn.editVendor = function (index) {
      $("#Vendors").modal("hide");
      $("#vendorName").val(allCategories[index]._id);
      $("#vendor_id").val(allCategories[index]._id);
      $("#newVendor").modal("show");
    };

    $.fn.deleteProduct = function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this product.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "inventory/product/" + id,
            type: "DELETE",
            success: function (result) {
              loadProducts();
              Swal.fire("Done!", "Product deleted", "success");
            },
          });
        }
      });
    };

    $.fn.deleteUser = function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this user.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "users/user/" + id,
            type: "DELETE",
            success: function (result) {
              loadUserList();
              Swal.fire("Done!", "User deleted", "success");
            },
          });
        }
      });
    };

    $.fn.deleteCategory = function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this category.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "categories/category/" + allCategories[id]._id,
            type: "DELETE",
            success: function (result) {
              loadProducts();
              loadCategoryList();
              loadVendorList();
              loadProductList();
              loadCategories();
              loadVendors();
              Swal.fire("Done!", "Category deleted", "success");
            },
          });
        }
      });
    };

    $.fn.deleteVendor = function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this vendor.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: api + "vendors/vendor/" + allVendors[id]._id,
            type: "DELETE",
            success: function (result) {
              loadProducts();
              loadCategoryList();
              loadVendorList();
              loadProductList();
              loadCategories();
              loadVendors();
              Swal.fire("Done!", "Vendor deleted", "success");
            },
          });
        }
      });
    };

    $("#productModal").click(function () {
      loadProductList();
    });

    $("#usersModal").click(function () {
      loadUserList();
    });

    $("#categoryModal").click(function () {
      loadCategoryList();
    });

    $("#vendorModal").click(function () {
      loadVendorList();
    });

    function loadUserList() {
      let counter = 0;
      let user_list = "";
      $("#user_list").empty();
      $("#userList").DataTable().destroy();

      $.get(api + "users/all", function (users) {
        allUsers = [...users];

        users.forEach((user, index) => {
          if (user.username && user.username != "bigo") {
            state = [];
            let class_name = "";

            // if (user.status != "") {
            // 	state = user.status.split("_");

            // 	switch (state[0]) {
            // 		case "Logged In":
            // 			class_name = "btn-default";
            // 			break;
            // 		case "Logged Out":
            // 			class_name = "btn-light";
            // 			break;
            // 	}
            // }

            counter++;
            user_list += `<tr>
            <td>${user.fullname}</td>
            <td>${user.username}</td>
            <td class="${class_name}">${
              state.length > 0 ? state[0] : ""
            } <br><span style="font-size: 11px;"> ${
              state.length > 0
                ? moment(state[1]).format("hh:mm A DD MMM YYYY")
                : ""
            }</span></td>
            <td>${
              user._id == 1
                ? '<span class="btn-group"><button class="btn btn-dark"><i class="fa fa-edit"></i></button>'
                : '<span class="btn-group"><button onClick="$(this).editUser(' +
                  index +
                  ')" class="btn btn-warning"><i class="fa fa-edit"></i></button>'
            }</td></tr>`;
          }
        });
        $("#user_list").html(user_list);

        $("#userList").DataTable({
          order: [[1, "desc"]],
          autoWidth: false,
          info: true,
          JQueryUI: true,
          ordering: true,
          paging: false,
        });
      });
    }

    function productTableViewTemplate(data, isLowStockTable = false) {
      let lowStockHtml = 'style="background-color: #f05050; color: #fff;"';
      let html;
      $.each(data, (index, product) => {
        html += `<tr>
			<td >${product._id}</td>
      <td><img style="max-height: 50px; max-width: 50px; border: 1px solid #ddd;" src="${
        product.img == ""
          ? "./assets/images/default.jpg"
          : img_path + product.img
      }" id="product_img"></td>
      <td>${product.name}</td>
			<td>${settings.symbol}${product.price}</td>
			<td>${product.tax} %</td>
			<td ${isLowStockTable ? lowStockHtml : ""}>${
          product.stock == 1 ? product.quantity : "N/A"
        }</td>
      <td>${product.category}</td>
      <td>${product.vendor}</td>
            <td class="nobr"><span class="btn-group"><button onClick="$(this).editProduct(${
              product._id
            })" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i></button><button onClick="$(this).deleteProduct('${
          product._id
        }')" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></span></td></tr>`;
      });
      return html;
    }

    function loadProductList() {
      let products = [...allProducts];
      lowStockProducts = _.filter(allProducts, (product) => {
        return product.quantity <= 1 && product.stock != 0;
      });

      renderProductsList(products);
      renderLowStockProductsList(lowStockProducts);
    }

    function renderProductsList(products) {
      $("#product_list").empty();
      $("#productList-pagination-container").pagination({
        dataSource: products,
        pageSize: 10,
        pageRange: 3,
        callback: function (products, pagination) {
          // template method of yourself
          var html = productTableViewTemplate(products);
          $("#product_list").html(html);
        },
      });
    }

    function renderLowStockProductsList(lowStockProducts) {
      $("#low_product_list").empty();
      $("#low-productList-pagination-container").pagination({
        dataSource: lowStockProducts,
        pageSize: 10,
        pageRange: 3,
        callback: function (lowStockProducts, pagination) {
          // template method of yourself
          var html = productTableViewTemplate(lowStockProducts, true);
          $("#low_product_list").html(html);
        },
      });
    }

    $("#search_productList").on("input", function () {
      let inputVal = $(this).val();
      if (inputVal === "") return loadProductList();
      let filteredProducts = _.filter(allProducts, (product) => {
        return (
          _.includes(
            String(product.name).toLowerCase(),
            String(inputVal).toLowerCase()
          ) || _.includes(product._id, inputVal)
        );
      });
      renderProductsList(filteredProducts);
    });

    $("#search_low_productList").on("input", function () {
      let inputVal = $(this).val();
      if (inputVal === "") return loadProductList();
      let filteredProducts = _.filter(lowStockProducts, (product) => {
        return (
          _.includes(
            String(product.name).toLowerCase(),
            String(inputVal).toLowerCase()
          ) ||
          (_.includes(product._id, inputVal) && product.quantity <= 1)
        );
      });
      renderLowStockProductsList(filteredProducts);
    });

    function loadCategoryList() {
      renderloadCategoryList(allCategories);
    }

    function loadVendorList() {
      renderloadVendorList(allVendors);
    }

    function renderloadCategoryList(categories) {
      $("#category_list").empty();
      $("#category_list-pagination-container").pagination({
        dataSource: categories,
        pageSize: 10,
        pageRange: 3,
        callback: function (categories, pagination) {
          // template method of yourself
          var html = categoriesTableViewTemplate(categories);
          $("#category_list").html(html);
        },
      });
    }

    function renderloadVendorList(vendors) {
      $("#vendor_list").empty();
      $("#vendor_list-pagination-container").pagination({
        dataSource: vendors,
        pageSize: 10,
        pageRange: 3,
        callback: function (vendors, pagination) {
          // template method of yourself
          var html = vendorsTableViewTemplate(vendors);
          $("#vendor_list").html(html);
        },
      });
    }

    function categoriesTableViewTemplate(categories) {
      let html;
      $.each(categories, (index, category) => {
        html += `<tr>
     
        <td>${category._id}</td>
        <td><span class="btn-group"><button onClick="$(this).deleteCategory(${index})" class="btn btn-danger"><i class="fa fa-trash"></i></button></span></td></tr>
`;
      });
      return html;
    }

    function vendorsTableViewTemplate(vendors) {
      let html;
      $.each(vendors, (index, vendor) => {
        html += `<tr>
     
        <td>${vendor._id}</td>
        <td><span class="btn-group"><button onClick="$(this).deleteVendor(${index})" class="btn btn-danger"><i class="fa fa-trash"></i></button></span></td></tr>
`;
      });
      return html;
    }

    $.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      });
      return o;
    };

    $("#log-out").click(function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to log out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.value) {
          $.get(api + "users/logout/" + user._id, function (data) {
            storage.delete("auth");
            storage.delete("user");
            ipcRenderer.send("app-reload", "");
          });
        }
      });
    });

    $("#settings_form").on("submit", function (e) {
      e.preventDefault();
      let formData = $(this).serializeObject();
      let mac_address;

      api = "http://localhost:8024/api/";

      macaddress.one(function (err, mac) {
        mac_address = mac;
      });

      formData["app"] = $("#app").find("option:selected").text();
      formData["mac"] = mac_address;
      formData["till"] = 1;

      $("#settings_form").append(
        '<input type="hidden" name="app" value="' +
          formData.app +
          '" /><input type="hidden" name="ip" value="localhost" />'
      );

      if (formData.percentage != "" && !$.isNumeric(formData.percentage)) {
        Swal.fire(
          "Oops!",
          "Please make sure the tax value is a number",
          "warning"
        );
      } else {
        storage.set("settings", formData);

        $(this).attr("action", "http://localhost:8024/api/settings/post");
        $(this).attr("method", "POST");

        $.ajax({
          url: "http://localhost:8024/api/settings/post",
          type: "POST",
          data: JSON.stringify(formData),
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            ipcRenderer.send("app-reload", "");
          },
          error: function (data) {},
        });
      }
    });

    $("#net_settings_form").on("submit", function (e) {
      e.preventDefault();
      let formData = $(this).serializeObject();
      // THIS DOES NOT WORK.  FCK JQUERY
      //   $("#net_settings_form").append(
      //     '<input type="hidden" name="app_net" value="' + formData.app + '" />'+
      //     '<input type="hidden" name="id" id="settings_id_net" value="storeSettings">'+
      //     '<input type="hidden" name="store" id="store_net" value="'+settings.store+'">'+
      //     '<input type="hidden" name="address_one" id="address_one_net" value="'+settings.address_one+'">'+
      //     '<input type="hidden" name="address_two" id="address_two_net" value="'+settings.address_two+'">'+
      //     '<input type="hidden" name="contact" id="contact_net" value="'+settings.contact+'">'+
      //     '<input type="hidden" name="tax" id="tax_net" value="'+settings.tax+'">'+
      //     '<input type="hidden" name="posID" id="posID_net" value="'+settings.posID+'">'+
      //     '<input type="hidden" name="symbol" id="symbol_net" value="'+settings.symbol+'">'+
      //     '<input type="hidden" name="percentage" id="percentage_net" value="'+settings.percentage+'">'+
      //     '<input type="hidden" name="charge_tax" id="charge_tax_net" value="'+settings.charge_tax+'">'+
      //     '<input type="hidden" name="footer" id="footer_net" value="bigosoft.co.uk">'+
      //     '<input type="hidden" name="img" id="logo_img_net" value="fcmart-logo.jpg">'
      //   )

      if (formData.till == 0 || formData.till == 1) {
        Swal.fire("Oops!", "Please enter a number greater than 1.", "warning");
      } else {
        if ($.isNumeric(formData.till)) {
          formData["app"] = $("#app").find("option:selected").text();

          $(this).attr("action", "http://localhost:8024/api/settings/post");
          $(this).attr("method", "POST");

          storage.set("settings", formData);
          console.log(JSON.stringify(formData));
          $.ajax({
            url: "http://localhost:8024/api/settings/post",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
              ipcRenderer.send("app-reload", "");
            },
            error: function (data) {},
          });
        } else {
          Swal.fire("Oops!", "Till must be a number!", "warning");
        }
      }
    });

    $("#saveUser").on("submit", function (e) {
      e.preventDefault();
      let formData = $(this).serializeObject();
      // if (ownUserEdit) {
      // 	if (formData.password != atob(user.password)) {
      // 		if (formData.password != formData.pass) {
      // 			Swal.fire("Oops!", "Passwords do not match!", "warning");
      // 		}
      // 	}
      // } else {
      // 	if (formData.password != atob(allUsers[user_index].password)) {
      // 		if (formData.password != formData.pass) {
      // 			Swal.fire("Oops!", "Passwords do not match!", "warning");
      // 		}
      // 	}
      // }
      $.ajax({
        url: api + "users/post",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        cache: false,
        processData: false,
        success: function (data) {
          if (ownUserEdit) {
            ipcRenderer.send("app-reload", "");
          } else {
            $("#userModal").modal("hide");

            loadUserList();

            $("#Users").modal("show");
            Swal.fire("Ok!", "User details saved!", "success");
          }
        },
        error: function (data) {
          console.log(data);
        },
      });
    });

    $("#app").change(function () {
      if (
        $(this).find("option:selected").text() ==
        "Network Point of Sale Terminal"
      ) {
        $("#net_settings_form").show(500);
        $("#settings_form").hide(500);
        macaddress.one(function (err, mac) {
          $("#mac").val(mac);
        });
      } else {
        $("#net_settings_form").hide(500);
        $("#settings_form").show(500);
      }
    });
    //DISABLED. DONT REMOVE
    // $("#cashier").click(function () {
    // 	ownUserEdit = true;

    // 	$("#userModal").modal("show");

    // 	$("#user_id").val(user._id);
    // 	$("#fullname").val(user.fullname);
    // 	$("#username").val(user.username);
    // 	$("#password").val(atob(user.password));
    // });

    $("#add-user").click(function () {
      if (platform.app != "Network Point of Sale Terminal") {
        $(".perms").show();
      }

      $("#saveUser").get(0).reset();
      $("#userModal").modal("show");
      $("#username").removeAttr("disabled");
      console.log("hello");
    });

    $("#settings").click(function () {
      if (platform.app == "Network Point of Sale Terminal") {
        $("#net_settings_form").show(500);
        $("#settings_form").hide(500);

        $("#ip").val(platform.ip);
        $("#till").val(platform.till);

        macaddress.one(function (err, mac) {
          $("#mac").val(mac);
        });

        $("#app option")
          .filter(function () {
            return $(this).text() == platform.app;
          })
          .prop("selected", true);
      } else {
        $("#net_settings_form").hide(500);
        $("#settings_form").show(500);

        $("#settings_id").val("1");
        $("#store").val(settings.store);
        $("#address_one").val(settings.address_one);
        $("#address_two").val(settings.address_two);
        $("#contact").val(settings.contact);
        $("#tax").val(settings.tax);
        $("#symbol").val(settings.symbol);
        $("#percentage").val(settings.percentage);
        $("#footer").val("bigosoft.co.uk");
        $("#logo_img").val(settings.img);
        $("#posID").val(settings.posID);

        $("#settings_id_net").val("storeSettings");
        $("#store_net").val(platform.store);
        $("#address_one_net").val(platform.address_one);
        $("#address_two_net").val(platform.address_two);
        $("#contact_net").val(platform.contact);
        $("#tax_net").val(platform.tax);
        $("#symbol_net").val(platform.symbol);
        $("#percentage_net").val(platform.percentage);
        $("#footer_net").val("bigosoft.co.uk");
        $("#posID_net").val(platform.posID);
        $("#logo_img_net").val("fcmart-logo.jpg");
        $("#charge_tax_net").val(platform.charge_tax);
        if (settings.charge_tax == "on") {
          $("#charge_tax").prop("checked", true);
        }
        if (settings.img != "") {
          $("#logoname").hide();
          $("#current_logo").html(
            `<img src="${img_path + settings.img}" alt="">`
          );
          $("#rmv_logo").show();
        }

        $("#app option")
          .filter(function () {
            return $(this).text() == settings.app;
          })
          .prop("selected", true);
      }
    });
  });

  $("#rmv_logo").click(function () {
    $("#remove_logo").val("1");
    $("#current_logo").hide(500);
    $(this).hide(500);
    $("#logoname").show(500);
  });

  $("#rmv_img").click(function () {
    $("#remove_img").val("1");
    $("#current_img").hide(500);
    $(this).hide(500);
    $("#imagename").show(500);
  });

  function ConvertToCSV(objArray) {
    $("#loading").show();
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "_id,name,price,tax,category,vendor,stock,quantity\r\n";
    for (var i = 0; i < array.length; i++) {
      let line = "";
      const temp = new Product(array[i]);
      const productObj = temp.toJSON();
      _.mapValues(productObj, (value) => {
        if (line != "") line += ",";
        line += !value ? 0 : value;
      });
      str += line + "\r\n";
    }

    return str;
  }
  $("#print_list").click(function () {
    $.get(api + "inventory/products", function (data) {
      JSONobj = data;
      // delete JSONobj._rev
      let csvContent = "data:text/csv;charset=utf-8," + ConvertToCSV(JSONobj);
      var encodedUri = encodeURI(csvContent);
      $("#loading").hide();
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", settings.store + "_export.csv");
      document.body.appendChild(link);
      link.click();
    });
  });
  $("#print_low_list").click(function () {
    JSONobj = lowStockProducts;
    // delete JSONobj._rev
    let csvContent = "data:text/csv;charset=utf-8," + ConvertToCSV(JSONobj);
    var encodedUri = encodeURI(csvContent);
    $("#loading").hide();
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", settings.store + "low_stock_export.csv");
    document.body.appendChild(link);
    link.click();
  });
}

const printOptions = {
  preview: false, // Preview in window or print
  width: "300px", //  width of content body
  margin: "0 0 0 0", // margin of content body
  copies: 1, // Number of copies to print
  printerName: "XP-80C", // printerName: string, check with webContent.getPrinters()
  timeOutPerLine: 400,
  pageSize: { height: 301000, width: 71000 }, // page size
  silent: true,
};

function silentPrint(data) {
  PosPrinter.print(data, printOptions)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}

$.fn.print = function () {
  printJS({ printable: receipt, type: "raw-html" });
};

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

  $.get(api + query, function (transactions) {
    $("#transaction_list").empty();
    $("#product_sales").empty();
    if (transactions.length > 0) {
      $("#transaction_list").empty();
      $("#transactionList").DataTable().destroy();
      allTransactions = transactions;

      _.forEach(transactions, (trans, index) => {
        const tempTrans = new TransactionModel(trans);

        sales += parseFloat(trans.total);
        transact++;
        _.forEach(tempTrans.items, (item) => {sold_items.push(item); costs+= (parseFloat(item.costPrice)*parseFloat(item.quantity));});

        // if (!tills.includes(trans.till)) {
        // 	tills.push(trans.till);
        // }

        if (!users.includes(trans.user_id)) {
          users.push(trans.user_id);
        }
        // console.log(user.perm_users)
        counter++;
        transaction_list += `<tr>
                                <td>${trans.order}</td>
                                <td class="nobr">${moment(trans.date).format(
                                  "YYYY MMM DD hh:mm:ss"
                                )}</td>
                                <td>${settings.symbol + trans.total}</td>
                                <td>${
                                  trans.paid == ""
                                    ? ""
                                    : settings.symbol + trans.paid
                                }</td>
                                <td>${
                                  trans.change
                                    ? settings.symbol +
                                      Math.abs(trans.change).toFixed(2)
                                    : ""
                                }</td>
                                <td>${
                                  trans.paid == ""
                                    ? ""
                                    : // : trans.payment_type == 0
                                      // ? "Cash"
                                      // : "Card"
                                      trans.payment_type
                                }</td>
                                <td>${trans.user}</td>
								<td>${
                  trans.paid == ""
                    ? '<button class="btn btn-dark"><i class="fa fa-search-plus"></i></button>'
                    : '<button onClick="$(this).viewTransaction(' +
                      index +
                      ')" class="btn btn-info"><i class="fa fa-search-plus"></i></button></td>'
                } 

                <td>

                <button onClick="$(this).deleteTransaction('${
                  trans.order
                }')" class="btn btn-danger btn-sm"   ${
          user.perm_delete == 1 ? "" : "disabled"
        }><i class="fa fa-trash"></i></button>
                </td>
                
</tr>
                    `;

        if (counter == transactions.length) {
          $("#total_profit #counter").text(
            settings.symbol + (parseFloat(sales)-parseFloat(costs)).toFixed(2)
          );
          $("#total_sales #counter").text(
            settings.symbol + parseFloat(sales).toFixed(2)
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
  });
}

function discend(a, b) {
  if (a.qty > b.qty) {
    return -1;
  }
  if (a.qty < b.qty) {
    return 1;
  }
  return 0;
}

function loadSoldProducts() {
  sold.sort(discend);

  let counter = 0;
  let sold_list = "";
  let items = 0;
  let products = 0;
  $("#product_sales").empty();

  sold.forEach((item, index) => {
    items += item.qty;
    products++;

    let product = allProducts.filter(function (selected) {
      return selected._id == item.id;
    });
    // console.log(item);
    // console.log(product[0] == undefined ? "undefined" : "defined");
    counter++;
    if (product[0] != undefined) {
      sold_list += `<tr>
				<td>${item.product}</td>
				<td>${item.qty}</td>
				<td>${
          product[0].stock == 1
            ? product.length > 0
              ? product[0].quantity
              : ""
            : "N/A"
        }</td>
				<td>${settings.symbol + (item.qty * parseFloat(item.price)).toFixed(2)}</td>
        <td>${settings.symbol + (item.qty * (parseFloat(item.price)-parseFloat(item.costPrice))).toFixed(2)}</td>
				</tr>`;
    }

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
      `<option value="${user}">${u[0] ? u[0].fullname : "N/A"}</option>`
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
$.fn.deleteTransaction = async (orderID) => {
  $.ajax({
    url: api + orderID,
    type: "DELETE",
    contentType: "application/json; charset=utf-8",
    cache: false,
    processData: false,
    success: function () {
      loadTransactions();
      Swal.fire("DONE");
    },
    error: function (data) {
      loadTransactions();
      Swal.fire("Oops! Something went wrong");
    },
  });
};

$.fn.viewTransaction = async function (index) {
  transaction_index = index;

  let discount = allTransactions[index].discount;
  let customer =
    allTransactions[index].customer == 0
      ? "Walk in Customer"
      : allTransactions[index].customer.username;
  let refNumber =
    allTransactions[index].ref_number != ""
      ? allTransactions[index].ref_number
      : allTransactions[index].order;
  let orderNumber = allTransactions[index].order;
  let type = "";
  let tax_row = "";
  let items = "";
  let products = allTransactions[index].items;
  totalQty = 0;

  await $.get(api + "qr/?invoiceno=" + orderNumber, function (data, status) {
    qr = new Image();
    qr.src = data;
  });

  products.forEach((item) => {
    totalQty += parseInt(item.quantity);
    items +=
      "<table width='100%' style='border: none;'><tr><td style='text-align: left;'>" +
      item.product_name +
      "</td></tr></table>" +
      "<table width='100%' style='border: none;'><tbody style='width:100%; display: table;'><tr>" +
      "<td width='20%'>&nbsp;</td>" +
      "<td style='text-align: center;'>" +
      item.quantity +
      "</td><td style='text-align: center;'>" +
      parseFloat(item.price).toFixed(1) +
      "</td><td style='text-align: center;'>" +
      parseFloat(item.quantity * item.price * item.tax * 0.01).toFixed(1) +
      "</td><td style='text-align: center;'>" +
      parseFloat(item.price * item.quantity).toFixed(1) +
      "</td></tr></tbody></table>";
  });

  switch (allTransactions[index].payment_type) {
    case 2:
      type = "Card";
      break;

    default:
      type = "Cash";
  }

  if (allTransactions[index].paid != "") {
    payment = `<tr>
                    <td>Paid</td>
                    <td>:</td>
                    <td>${settings.symbol + allTransactions[index].paid}</td>
                </tr>
                <tr>
                    <td>Change</td>
                    <td>:</td>
                    <td>${
                      settings.symbol +
                      Math.abs(allTransactions[index].change).toFixed(2)
                    }</td>
                </tr>
                <tr>
                    <td>Method</td>
                    <td>:</td>
                    <td>${type}</td>
				</tr>`;
  }

  if (settings.charge_tax) {
    tax_row = `<tr>
                <td>GST Total</td>
                <td>:</td>
                <td>${parseFloat(allTransactions[index].tax).toFixed(2)}</td>
            </tr>`;
  }

  receipt = `
	<div style="font-size: 12px; font-weight: bold;">                            
		<p style="text-align: center;">
		<table width="100%">
			<tr>
				<th style="text-align: center;"><img style="max-width: 100px;" src ="./assets/images/fcmart-logo.png" /></th>
			</tr>
			<tr>
			<td style="text-align: center;"><span style="font-size: 12px; font-weight: bold;">FM-Mart <br>Sale Invoice</span><br><span style="font-size: 12px;">${
        settings.address_two
      }<br>${settings.address_one}<br>${allTransactions[index].date}</span></td>
			</tr>
		</table>
		<br>
		</p>
		<table width="100%" style="font-size: 12px;">
			<thead style="text-align: center;">
      <tr style="">
        <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Item</th>
        <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Qty</th>
        <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">Rate</th>
        <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">GST</th>
        <th style="border-top: 1px solid black; border-bottom: 1px solid black; text-align: left;">TOTAL</th>
      </tr>
			</thead>
      </table>
			${items}
      <hr style='border-top: 1px solid black;'>
      <tbody>             
        <table width="100%" style="font-size: 12px; border-bottom: 1px solid black;">
          <tr>
            <td style="text-align: left;">Total items: </td>
            <td style="text-align: right;">${totalQty}</td>
          </tr>
          <tr>
            <td style="text-align: left;">Invoice total: </td>
            <td style="text-align: right;">${allTransactions[
              index
            ].total.toFixed(0)}</td>
          </tr>
          <tr>
            <td style="text-align: left;">Discount</td>
            <td style="text-align: right;">${
              discount > 0
                ? settings.symbol +
                  parseFloat(allTransactions[index].discount).toFixed(2)
                : 0.0
            }</td>
          </tr>
          <tr>
            <td style="text-align: left;">Free voucher: </td>
            <td style="text-align: right;">0.00</td>
          </tr>
          <tr style="border-top: 1px dotted black;">
            <td style="text-align: left;">Invoice net total: </td>
            <td style="text-align: right;">${allTransactions[
              index
            ].total.toFixed(0)}</td>
          </tr>
          <tr>
            <td style="text-align: left;">Cash paid: </td>
            <td style="text-align: right;">${allTransactions[index].paid}</td>
          </tr>
          <tr style="border-top: 1px dotted black;">
            <td style="text-align: left;">Customer balance: </td>
            <td style="text-align: right;">${Math.abs(
              allTransactions[index].change
            ).toFixed(0)}</td>
          </tr>
          <tr style="border-top: 1px dotted black;">
            <td style="text-align: left;">Total GST: </td>
            <td style="text-align: right;">${
              settings.charge_tax
                ? parseFloat(allTransactions[index].tax).toFixed(0)
                : 0.0
            }</td>
          </tr>
      
        </table>
        <table width='100%' style='margin-top: 2px; border-bottom: 2px solid black; border-top: 1px solid black;'>
          <tr>
            <td style='text-align: center;'>Payment Details</td>
          </tr>
        </table>
        <table width='100%' style='border-bottom: 1px solid black;'>
          <tr>
            <td>Credit card</td>
            <td>0.00</td>
            <td>Cash</td>
            <td>${allTransactions[index].total}</td>
          </tr>
        </table>
   
        <table width="100%">
          <tr>
            <td style="text-align: left;">Order no:</td>
            <td style="text-align: right;">${allTransactions[index].order}</td>
          </tr>
        </table>
      <tr>
        <img id="barcode" style="display: block; margin-left: auto; margin-right: auto;"/>
      </tr>
        </tbody>
        </table>
        <hr>
        </div>`;
  $("#viewTransaction").html("");
  $("#viewTransaction").html(receipt);

  $("#orderModal").modal("show");
  JsBarcode("#barcode", allTransactions[index].order, { height: 20 });
};

$("#status").change(function () {
  by_status = $(this).find("option:selected").val();
  loadTransactions();
});

// $("#tills").change(function () {
// 	by_till = $(this).find("option:selected").val();
// 	loadTransactions();
// });

$("#users").change(function () {
  by_user = $(this).find("option:selected").val();
  loadTransactions();
});

$("#reportrange").on("apply.daterangepicker", function (ev, picker) {
  start = picker.startDate.format("DD MMM YYYY hh:mm A");
  end = picker.endDate.format("DD MMM YYYY hh:mm A");

  start_date = picker.startDate.toDate().toJSON();
  end_date = picker.endDate.toDate().toJSON();

  loadTransactions();
});

function authenticate() {
  $("#loading").append(
    `<div id="load"><form id="account"><div class="form-group"><input type="text" placeholder="Username" name="username" class="form-control"></div>
        <div class="form-group"><input type="password" placeholder="Password" name="password" class="form-control"></div>
        <div class="form-group"><input type="submit" class="btn btn-block btn-default" value="Login"></div></form>`
  );
}

$("body").on("submit", "#account", function (e) {
  e.preventDefault();
  let formData = $(this).serializeObject();

  if (formData.username == "" || formData.password == "") {
    Swal.fire("Incomplete form!", auth_empty, "warning");
  } else {
    $.ajax({
      url: api + "users/login",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json; charset=utf-8",
      cache: false,
      processData: false,
      success: function (data) {
        if (data._id) {
          storage.set("auth", { auth: true });
          storage.set("user", data);
          ipcRenderer.send("app-reload", "");
        } else {
          Swal.fire("Oops!", auth_error, "warning");
        }
      },
      error: function (data) {
        console.log(data);
      },
    });
  }
});

$("#quit").click(function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to close the application.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Close Application",
  }).then((result) => {
    if (result.value) {
      if (auth) {
        $.get(api + "users/logout/" + user._id, function (data) {
          storage.delete("auth");
          storage.delete("user");
          ipcRenderer.send("app-quit", "");
        });
      } else ipcRenderer.send("app-quit", "");
    }
  });
});

document.addEventListener("keyup", (e) => {
  if (e.key === "F10") $("#payButton").click();
  if (e.key === "F2") $("#skuCode").focus();
  if (e.key === "F8") $("#cancelOrderButton").click();

  // const isNumber = /^[0-9]$/i.test(e.key)
  // if(!isNumber) return;
  // $('#skuCode').focus();
  // if(document.getElementById("skuCode").value ===""){
  //   document.getElementById("skuCode").value = e.key
  // }
});

$("#closeModal_btn").on("click", () => {
  $("#skuCode").focus();
});

/****************************************************************************/
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/****************************************************************************/
/*

ORDER FUNCTION ONLY HERE

*/
/****************************************************************************/
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/****************************************************************************/

// TODO: Incomplete
// Create a seperate DB?
$.fn.holdOrder = async () => {
  let currentTime = new Date(moment());
  let data = {
    customer: getselectedCustomer() ? getselectedCustomer() : 0,
    items: cart,
    date: currentTime,
    total: $("#gross_price").val(),
  };
  let orders = localStorage.getItem("orders");
  if (!orders) orders = [];
  else orders = JSON.parse(orders);
  orders.push(data);
  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  getHoldOrders();
  $(this).renderTable(cart);
};

const randerHoldOrders = (data, renderLocation, orderType) => {
  $.each(data, function (index, order) {
    let total = 0;
    if (order.customer == 0) total = calculateHoldOrderNetTotal(order.items);
    else total = calculateHoldOrderForEmployees(order.items);
    renderLocation.append(
      $("<div>", {
        class: orderType == 1 ? "col-md-3 order" : "col-md-3 customer-order",
      }).append(
        $("<a>").append(
          $("<div>", { class: "card-box order-box" }).append(
            $("<p>").append(
              $("<br>"),
              $("<b>", { text: "Total :" }),
              $("<span>", {
                text: total,
                class: "label label-info",
                style: "font-size:14px;",
              }),
              $("<br>"),
              $("<b>", { text: "Items :" }),
              $("<span>", { text: order.items.length }),
              $("<br>"),
              $("<b>", { text: "Customer :" }),
              $("<span>", {
                text:
                  order.customer && order.customer.name
                    ? order.customer.name
                    : "Walk in customer",
                class: "customer_name",
              })
            ),
            $("<button>", {
              class: "btn btn-danger del",
              onclick: "$(this).deleteHoldOrder(" + index + ")",
            }).append($("<i>", { class: "fa fa-trash" })),

            $("<button>", {
              class: "btn btn-default",
              onclick: "$(this).orderDetails(" + index + "," + orderType + ")",
            }).append($("<span>", { class: "fa fa-shopping-basket" }))
          )
        )
      )
    );
  });
};

$.fn.deleteHoldOrder = (index) => {
  let orders = localStorage.getItem("orders");

  if (orders) orders = JSON.parse(orders);
  else orders = [];
  _.remove(orders, (order, order_index) => order_index === index);

  localStorage.setItem("orders", JSON.stringify(orders));
  getHoldOrders();
};

const getHoldOrders = () => {
  let orders = localStorage.getItem("orders");

  if (orders) orders = JSON.parse(orders);
  else orders = [];
  holdOrderList = orders;
  clearInterval(dotInterval);
  holdOrderlocation.empty();
  randerHoldOrders(holdOrderList, holdOrderlocation, 1);
};

$("#orderModal").on("keyup", (e) => {
  if (e.key === "F12") $("#printButton").click();
});

$("#slideRight").on("click", function () {
  document.getElementById("categories").scrollLeft += 20;
});
$("#slideLeft").on("click", function () {
  document.getElementById("categories").scrollLeft -= 20;
});

// Hide Stock Options on Stock disable
document.getElementById("stock").addEventListener("change", (e) => {
  const value = e.target.checked;
  return handleStockCheckboxChange(value);
});

const handleStockCheckboxChange = (value) => {
  if (value) {
    document.getElementById("minStockAllowed_input_div").style.display = "none";
    document.getElementById("minStockAllowed_input").required = false;
    document.getElementById("quantity").required = false;

    document.getElementById("quantity_input_div").style.display = "none";
    return;
  }
  document.getElementById("minStockAllowed_input_div").style.display = "block";
  document.getElementById("quantity_input_div").style.display = "block";
  document.getElementById("minStockAllowed_input").required = true;
  document.getElementById("quantity").required = true;
};

document
  .getElementById("product_cost_price")
  .addEventListener("change", (e) => {
    const salePrice = document.getElementById("product_price").value;
    const costPrice = e.target.value;
    if (parseInt(costPrice) > parseInt(salePrice)) {
      document.getElementById("submitProduct").setAttribute("disabled", true);
      alert("Cost Price must be less than Sale Price");
    } else {
      document.getElementById("submitProduct").removeAttribute("disabled");
    }
  });

document
  .getElementById("discountPercentage")
  .addEventListener("change", (e) => {
    const value = e.target.value;
    if (value > 100 || value < 0) {
      e.target.value = 0;
      alert("Discount Percentage can only be between 0-100");
    }
  });

const getselectedCustomer = () => {
  const selectedCustomer = JSON.parse($("#customer").val());
  let customer = allCustomers.filter(
    (cust) => cust._id === selectedCustomer.id
  )[0];
  return customer;
};
