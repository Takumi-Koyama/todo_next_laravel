<?php

namespace Tests\Unit\User;

use App\Http\Controllers\UserController;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use \Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;
use App\Services\User\UserRegisterService;

class UserRegisterTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function 入力値が正しく登録ができる()
    {
        $input = [
            'email' => 'example@example.com',
            'password' => 'password'
        ];

        $service = new UserRegisterService();
        $service->main($input);
        $this->assertDatabaseHas('users', $input);
    }
}