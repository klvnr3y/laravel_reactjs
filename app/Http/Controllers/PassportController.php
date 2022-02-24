<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PassportController extends Controller
{
    public function login(Request $request)
    {
        $credentials = [
            'email'     => $request->email,
            'password'  => $request->password,
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('ACCOUNTING')->accessToken;
            return response()->json(['success' => true, 'token' => $token, 'data' => auth()->user()], 200);
        } else {
            return response()->json(['error' => 'Username or Password is Invalid', 'data' => $credentials], 401);
        }
    }
}