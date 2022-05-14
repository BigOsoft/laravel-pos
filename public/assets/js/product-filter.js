$(document).ready(function(){
    $('body').on('click', '.holdOrderKeyboard .key', function() {
        if($("#holdOrderInput").is(":focus")) {
            searchOpenOrders(); 
        }          
    });
 
  
    function searchCustomerOrders() {
        var matcher = new RegExp($("#holdCustomerOrderInput").val(), 'gi');
        $('.customer-order').show().not(function(){
            return matcher.test($(this).find('.customer_name').text())
        }).hide();
    }


    $('body').on('click', '.customerOrderKeyboard .key', function() {
        if($("#holdCustomerOrderInput").is(":focus")) {
            searchCustomerOrders();
        }          
    });
 


    var $list = $('.list-group-item').click(function () {
       $list.removeClass('active');
       $(this).addClass('active');
       if(this.id == 'check'){
            $("#cardInfo").show();
            $("#cardInfo .input-group-addon").text("Check Info");
       }else if(this.id == 'card'){
           $("#cardInfo").show();
           $("#cardInfo .input-group-addon").text("Card Info");
       }else if(this.id == 'cash'){
           $("#cardInfo").hide();
       }
    });


    $.fn.go = function (value,isDueInput) {
        if(isDueInput){
            $("#refNumber").val($("#refNumber").val()+""+value)
        }else{
            $("#payment").val($("#payment").val()+""+value);
            $(this).calculateChange();
        }
    }


    $.fn.digits = function(){
        $("#payment").val($("#payment").val()+".");
        $(this).calculateChange();
    }

    $.fn.calculateChange = function () {
        var change = $("#payablePrice").val() - $("#payment").val();
        if(change <= 0){
            $("#change").text(change.toFixed(2));
        }else{
            $("#change").text('0')
        }
        if(change <= 0){
            $("#confirmPayment").show();
            $('body').on("keydown", "#payment", function(e) {
                if(e.code == "Enter") {
                    e.preventDefault();
                    this.submitDueOrder(1);
                }
            });
        }else{
            $("#confirmPayment").hide();
            $("body").off("keydown", "#payment");
        }
    }

    $('#paymentModel').on('keyup', (e)=> {
        if(e.key!=="Enter") return;
        var change = $("#payablePrice").val() - $("#payment").val();
        var change = $("#payablePrice").val() - $("#payment").val();
        if(change <= 0){
            $("#change").text(change.toFixed(2));
        }else{
            $("#change").text('0')
        }
        if(change <= 0){
            $("#confirmPayment").click()
        }

    })

})