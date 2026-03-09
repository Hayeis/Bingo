<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsernameSetupController extends Controller
{
    public function create(){
        return inertia('Auth/SetupUsername'); //mengarah ke file react

    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|alpha_dash|min:3|max:20|unique:users,name',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        if ($user) {
            $user->update(['name' => $request->name]);
        }

        return redirect()->intended('/dashboard');
    }
}
