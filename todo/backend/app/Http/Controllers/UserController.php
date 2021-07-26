<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Services\User\UserRegisterService;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        $parameters = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ];
        $service = new UserRegisterService();
        $service->main($parameters);
    }
}