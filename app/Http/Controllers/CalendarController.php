<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth; // ← move here
use App\Models\Task;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render('Calendar');
    }

    public function tasks(Request $request)
    {
        $user = Auth::user();

        $query = Task::where('user_id', $user->id);

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('month')) {
            $query->whereMonth('date', substr($request->month, 5, 2))
                  ->whereYear('date', substr($request->month, 0, 4));
        }

        return response()->json($query->get());
    }
}