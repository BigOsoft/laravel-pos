<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permissions; 

class PermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Permissions::orderBy('created_at', 'asc')->get();  //returns values in ascending order
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
            'name' => 'required',
            'level' => 'required',
        ]);
  
        $permissions = new Permissions;
        $permissions->name = $request->input('name'); //retrieving user inputs
        $permissions->level = $request->input('level');  //retrieving user inputs
        $permissions->save(); //storing values as an object
        return $permissions; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Permissions::findorFail($id); //searches for the object in the database using its id and returns it.
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
            'name' => 'required',
            'level' => 'required',
        ]);
  
        $permissions = Permissions::findorFail($id); // uses the id to search values that need to be updated.
        $permissions->name = $request->input('name'); //retrieves user input
        $permissions->level = $request->input('level');////retrieves user input
        $permissions->save();//saves the values in the database. The existing data is overwritten.
        return $permissions; // retrieves the updated object from the database 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permissions = Permissions::findorFail($id); //searching for object in database using ID
        if($permissions->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
