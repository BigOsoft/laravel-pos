<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Access;
use App\Models\User; 
use App\Models\Permissions; 
use App\Models\Company; 

class AccessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Access::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function permissions()
    {
        return $this->belongsTo(Permissions::class);
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
            'user_id' => 'required',
            'permission' => 'required',
            'company' => 'required',
        ]);
  
        $access = new Access;
        $access->user_id = $request->input('user_id');
        $access->permissions = $request->input('permissions');
        $access->company = $request->input('company');
        $access->save(); //storing values as an object
        return $access; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Access::findorFail($id); //searches for the object in the database using its id and returns it.
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
            'user_id' => 'required',
            'permission' => 'required',
            'company' => 'required',
        ]);
  
        $company = Company::findorFail($id); // uses the id to search values that need to be updated.
        $access->user_id = $request->input('user_id');
        $access->permissions = $request->input('permissions');
        $access->company = $request->input('company');
        $company->save();//saves the values in the database. The existing data is overwritten.
        return $company; // retrieves the updated object from the database  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $access = Access::findorFail($id); //searching for object in database using ID
        if($access->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
