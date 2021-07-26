<?php

namespace App\Services\Todo;

use \App\Models\User;
use \App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

final class TodoFetchService
{
    public function main(): Collection
    {
        $todos = Todo::where('user_id', auth()->user()->id)->get();
        return $todos;
    }
}