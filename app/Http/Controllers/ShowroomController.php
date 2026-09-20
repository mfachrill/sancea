<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

class ShowroomController extends Controller
{
    public function __invoke(): View
    {
        return view('app');
    }
}
