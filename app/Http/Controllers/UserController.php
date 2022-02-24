<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        $ret = [
            'success'   => 'true',
            'data'      => $users
        ];
        return response()->json($ret, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = ['success' => false, 'message' => 'Something went wrong!'];

        $data = $request->validate([
            'name'      => 'required',
            'email'     => ['required', 'unique:users'],
            'password'  => 'required'
        ]);

        $users = User::create($data);

        $users->password = Hash::make($request->password);

        if ($users->save()) {
            $ret = ['success' => true, 'message' => 'Data inserted successfully!'];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ret = ['success' => false, 'message' => 'Something went wrong!'];

        $user = User::find($id);

        if ($user) {
            $ret = [
                'success'   => true,
                'message'   => 'Data found!',
                'data'      => $user
            ];
        }

        return response()->json($ret, 200);
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
        $ret = ['success' => false, 'message' => 'Something went wrong!'];

        $user = User::find($id);

        if ($user) {
            if ($user->email != $request->email) {
                $request->validate(['email' => ['required', 'unique:users']]);
            }

            $data = $request->validate([
                'name'      => 'required',
            ]);

            if ($request->password != '') {
                $data += ['password' => Hash::make($request->password)];
            }

            $user->fill($data);

            if ($user->save()) {
                $ret = ['success' => true, 'message' => 'Data updated successfully!'];
            }
        }

        return response()->json($ret, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret = ['success' => false, 'message' => 'Something went wrong!'];

        $user = User::find($id);

        if ($user) {
            if ($user->delete()) {
                $ret = ['success' => true, 'message' => 'Data deleted successfully!'];
            }
        }

        return response()->json($ret, 200);
    }
}