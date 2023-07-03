<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->firstOrFail();
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json(['token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // public function logout(Request $request)
    // {
    //     if ($request->user()) {
    //         $request->user()->currentAccessToken()->delete();
    //         return response()->json(['message' => 'Logged out successfully']);
    //     }

    //     return response()->json(['message' => 'User not authenticated'], 401);
    
    // }


}
