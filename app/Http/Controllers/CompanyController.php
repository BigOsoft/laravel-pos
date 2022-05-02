<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Company::orderBy('created_at', 'asc')->get();  //returns values in ascending order
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
            'description' => 'required',
        ]);
  
        $company = new Company;
        $company->title = $request->input('name'); //retrieving user inputs
        $company->description = $request->input('description');  //retrieving user inputs
        $company->save(); //storing values as an object
        return $company; //returns the stored value if the operation was successful.  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Company::findorFail($id); //searches for the object in the database using its id and returns it.
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
            'description' => 'required',
        ]);
  
        $company = Company::findorFail($id); // uses the id to search values that need to be updated.
        $company->title = $request->input('title'); //retrieves user input
        $company->description = $request->input('description');////retrieves user input
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
        $company = Company::findorFail($id); //searching for object in database using ID
        if($company->delete()){ //deletes the object
            return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
