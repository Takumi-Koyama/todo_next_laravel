<?php

namespace App\Services\User;

use \App\Models\User;

final class UserRegisterService
{
    public function main(array $parameters): void
    {
        $user = new User();
        $user->name = $parameters['name'];
        $user->email = $parameters['email'];
        $user->password = bcrypt($parameters['password']);
        $user->save();
    }
}