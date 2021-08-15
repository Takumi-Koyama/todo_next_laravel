<?php

namespace App\Services\Todo;

use \App\Models\User;
use \App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

final class TodoFetchByPageService
{
    public function main()
    {
        $todos = Todo::orderBy('updated_at', 'desc')->paginate(5);
        return $todos;
    }
}