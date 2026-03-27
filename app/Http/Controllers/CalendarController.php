<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth; // ← move here
use App\Models\Task;

class CalendarController extends Controller
{
    public function tasks(Request $request)
    {
        $user = Auth::user(); // get logged in user

        $query = Task::where('user_id', $user->id);

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('month')) {
            $query->whereMonth('date', substr($request->month, 5, 2))
                ->whereYear('date', substr($request->month, 0, 4));
        }

        $tasks = $query->get();

        return response()->json($tasks);
    }

    public function index()
    {
        $today = Carbon::now();
        $currentMonth = $today->month;
        $currentYear = $today->year;

        $tasks = [
            ['date' => '2026-01-15', 'tasks' => 2, 'focus' => 4],
            ['date' => '2026-01-23', 'tasks' => 2, 'focus' => 2],
        ];

        return Inertia::render('Calendar', [
            'today' => $today,
            'currentMonth' => $currentMonth,
            'currentYear' => $currentYear,
            'tasks' => $tasks,
        ]);
    }
}