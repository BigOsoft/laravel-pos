<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions; 

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Transactions::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [ //inputs are not empty or null
            'posID' => 'required',
            'order' => 'required',
            'date' => 'requiredd',
            'user' => 'required',
        ]);
  
        $transactions = new Transactions;
        $transactions->name = $request->input('pos_id'); 
        $transactions->order = $request->input('order'); 
        $transactions->ref_number = $request->input('ref_number'); 
        $transactions->discount = $request->input('discount'); 
        $transactions->customer = $request->input('customer'); 
        $transactions->status = $request->input('status'); 
        $transactions->subtotal = $request->input('subtotal'); 
        $transactions->tax = $request->input('tax'); 
        $transactions->order_type = $request->input('order_type'); 
        $transactions->items = $request->input('items'); 
        $transactions->date = $request->input('date'); 
        $transactions->payment_info = $request->input('payment_info'); 
        $transactions->payment_type = $request->input('payment_type'); 
        $transactions->user = $request->input('user'); 
        $transactions->user_id = $request->input('user_id'); 
        $transactions->paid = $request->input('paid'); 
        $transactions->change = $request->input('change'); 
        $transactions->total = $request->input('total'); 
        $transactions->name = $request->input('_rev'); 
        $transactions->save(); //storing values as an object
        return $transactions; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Transactions::findorFail($id); //searches for the object in the database using its id and returns it.
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [ // the new values should not be null
            'posID' => 'required',
            'order' => 'required',
            'date' => 'requiredd',
            'user' => 'required',
        ]);
  
        $transactions = Transactions::findorFail($id); // uses the id to search values that need to be updated.
        $transactions->name = $request->input('pos_id'); 
        $transactions->order = $request->input('order'); 
        $transactions->ref_number = $request->input('ref_number'); 
        $transactions->discount = $request->input('discount'); 
        $transactions->customer = $request->input('customer'); 
        $transactions->status = $request->input('status'); 
        $transactions->subtotal = $request->input('subtotal'); 
        $transactions->tax = $request->input('tax'); 
        $transactions->order_type = $request->input('order_type'); 
        $transactions->items = $request->input('items'); 
        $transactions->date = $request->input('date'); 
        $transactions->payment_info = $request->input('payment_info'); 
        $transactions->payment_type = $request->input('payment_type'); 
        $transactions->user = $request->input('user'); 
        $transactions->user_id = $request->input('user_id'); 
        $transactions->paid = $request->input('paid'); 
        $transactions->change = $request->input('change'); 
        $transactions->total = $request->input('total'); 
        $transactions->name = $request->input('_rev'); 
        $transactions->save();//saves the values in the database. The existing data is overwritten.
        return $transactions; // retrieves the updated object from the database  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transactions = Transactions::findorFail($id); //searching for object in database using ID
        if($transactions->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
