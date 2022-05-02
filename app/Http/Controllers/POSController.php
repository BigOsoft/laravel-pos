<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\POS; 
use App\Models\Company;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return POS::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    public function company()
    {
        return $this->belongsTo(Company::class)
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
            'pos_id' => 'required',
            'app' => 'required',
            'address_one' => 'required',
            'address_two' => 'required',
        ]);
  
        $pos = new POS;
        $pos->company = $request->input('company');
        $pos->pos_id = $request->input('pos_id');
        $pos->app = $request->input('app');
        $pos->store = $request->input('store');
        $pos->address_one = $request->input('address_one');
        $pos->address_two = $request->input('address_two');
        $pos->tax = $request->input('tax');
        $pos->percentage = $request->input('percentage');
        $pos->charge_tax = $request->input('charge_tax');
        $pos->save(); //storing values as an object
        return $pos; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return POS::findorFail($id); //searches for the object in the database using its id and returns it.
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
            'pos_id' => 'required',
            'app' => 'required',
            'address_one' => 'required',
            'address_two' => 'required',
        ]);
  
        $pos = POS::findorFail($id); // uses the id to search values that need to be updated.
        $pos->company = $request->input('company');
        $pos->pos_id = $request->input('pos_id');
        $pos->app = $request->input('app');
        $pos->store = $request->input('store');
        $pos->address_one = $request->input('address_one');
        $pos->address_two = $request->input('address_two');
        $pos->tax = $request->input('tax');
        $pos->percentage = $request->input('percentage');
        $pos->charge_tax = $request->input('charge_tax');
        $pos->save();//saves the values in the database. The existing data is overwritten.
        return $pos; // retrieves the updated object from the database  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pos = POS::findorFail($id); //searching for object in database using ID
        if($pos->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
