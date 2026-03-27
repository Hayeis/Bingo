<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the user's tasks.
     */
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())
                    ->latest()
                    ->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        // Validate the input
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time' => 'required|string',
            'date' => 'required|date',
            'priority' => 'nullable|string',
        ]);

        // Create the task for the logged-in user
        $task = auth()->user()->tasks()->create($request->only([
            'title', 'description', 'time', 'date', 'priority'
        ]));

        // Optional: log the task creation
        Log::info('New Task Created:', $task->toArray());

        // Redirect to tasks index with a success message
        return redirect()->route('tasks.index')->with('success', 'Task created successfully!');
    }

    /**
     * Fetch tasks filtered by date or month (AJAX request).
     */
    public function tasksByDate(Request $request)
    {
        $user = auth()->user();

        if ($request->has('date')) {
            $tasks = Task::where('user_id', $user->id)
                         ->whereDate('date', $request->date)
                         ->get();
        } elseif ($request->has('month')) {
            [$year, $month] = explode('-', $request->month);
            $tasks = Task::where('user_id', $user->id)
                         ->whereYear('date', $year)
                         ->whereMonth('date', $month)
                         ->get();
        } else {
            $tasks = [];
        }

        return response()->json($tasks);
    }
}