<?php

namespace App\Services\Todo;

use \App\Models\User;
use \App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

final class TodoFetchService
{
    public function main(array $parameters): Collection
    {
        $todos = Todo::where('user_id', $parameters['user_id'])->orderBy('updated_at', 'desc')->get();
        return $todos;
    }
}