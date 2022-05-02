<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory; 
use App\Models\Company;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inventory::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
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
            'company' => 'required',
            'SKU' => 'required',
            'name' => 'required',
            'price' => 'required',
        ]);
  
        $inventory = new Inventory;
        $inventory->company = $request->input('company');
        $inventory->SKU = $request->input('SKU');
        $inventory->name = $request->input('name');
        $inventory->price = $request->input('price');
        $inventory->cost_price = $request->input('cost_price');
        $inventory->tax = $request->input('tax');
        $inventory->category = $request->input('category');
        $inventory->vendor = $request->input('vendor');
        $inventory->quantity = $request->input('quantity');
        $inventory->stock = $request->input('stock');
        $inventory->min_stock_allowed = $request->input('min_stock_allowed');
        $inventory->save(); //storing values as an object
        return $inventory; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inventory::findorFail($id); //searches for the object in the database using its id and returns it.
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
            'company' => 'required',
            'SKU' => 'required',
            'name' => 'required',
            'price' => 'required',
        ]);
  
        $inventory = Inventory::findorFail($id); // uses the id to search values that need to be updated.
        $inventory->company = $request->input('company');
        $inventory->SKU = $request->input('SKU');
        $inventory->name = $request->input('name');
        $inventory->price = $request->input('price');
        $inventory->cost_price = $request->input('cost_price');
        $inventory->tax = $request->input('tax');
        $inventory->category = $request->input('category');
        $inventory->vendor = $request->input('vendor');
        $inventory->quantity = $request->input('quantity');
        $inventory->stock = $request->input('stock');
        $inventory->min_stock_allowed = $request->input('min_stock_allowed');
        return $inventory; // retrieves the updated object from the database  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $inventory = Inventory::findorFail($id); //searching for object in database using ID
        if($inventory->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
