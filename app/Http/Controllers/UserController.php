<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\AuthUserResource;

class UserController extends Controller
{
    
    public function index()
    {
       // $users = UserResource::collection(Auth::all());
        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection(User::all())->collection->toArray()
        ]);
    }

   
    public function edit(User $user)
    {
       return Inertia::render('User/Edit', [
           'user' => new AuthUserResource($user),
           'roles' => Role::all(),
           'roleLabels'=>RolesEnum::labels(),
       ]);
    }

    public function update(Request $request, User $user)
    {
        $data =$request->validate([
            'roles'=>['required', 'array'],
        ]);
       // dd($data);
        $user->syncRoles($data['roles']);
        return redirect()->back()->with('success', 'User role updated successfully');
    }

   public function destroy(User $user)
    {
        
    }
}
