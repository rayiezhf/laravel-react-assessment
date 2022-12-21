<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use App\Http\Resources\UserResource;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $currentUser = $request->user();
        $currentRole = $currentUser->roles()->first();
        $entities = User::select('users.*')
            ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
            ->leftJoin('roles', 'role_user.role_id', '=', 'roles.id')
            ->where('roles.level', '<', $currentRole->level)
            ->orderBy('users.created_at', 'desc')
            ->get();

        return $this->sendResponse(UserResource::collection($entities), 'Users retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $newUser = User::create($input);
        $role = null;
        $currentUser = $request->user();
        if($currentUser->isAdmin()) { // Admin users will create employee users
            $role = config('roles.models.role')::where('slug', '=', 'employee')->first();
        }elseif($currentUser->isSuperadmin()) { // Superadmin users will create admin users
            $role = config('roles.models.role')::where('slug', '=', 'admin')->first();
        }
        if($role) {
            $newUser->attachRole($role);
        }
        Log::add("$newUser->email user created");

        return $this->sendResponse($newUser, ($role ? $role->name : '') ." user registered successfully.");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
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
        $input = $request->all();
        $user = User::find($id);
        if(!$user){
            return $this->sendError('Invalid user');
        }

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->save();
        Log::add("$user->email user updated");

        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        Log::add("$user->email user deleted");
        $user->delete();

        return $this->sendResponse([], 'User deleted successfully.');
    }
}
