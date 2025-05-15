<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\FeatureListResource;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $currentUserId= Auth::id();
        $paginated = Feature::latest()
            
            ->withCount(['upvotes as upvote_count' => function ($query) {
                $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as users_has_upvoted'=>function($query){
                    $query->where('user_id', Auth::id());
                    $query->where('upvote', 1);
                },
                'upvotes as users_has_downvoted'=>function($query) use($currentUserId){
                    $query->where('user_id', $currentUserId)
                    ->where('upvote', 0);
                },
            ])->paginate(5);

         return Inertia::render('Feature/Index', [
            'features' => FeatureListResource::collection($paginated)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>['required', 'string', 'max:255'],
            'description'=>['nullable', 'string'],

        ]);
        $data['user_id'] = auth()->id();
        Feature::create($data);

        return Inertia::render('Feature/Index', [
            
            'success' => 'Feature created successfully',
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Feature  $feature
     * @return \Inertia\Response
     */
    public function show(Feature $feature)
    {
        $feature->upvote_count = Upvote::where('feature_id', $feature->id)
            ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));
        $feature->users_has_upvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', Auth::id())
            ->where('upvote', 1)
            ->exists();
        $feature->users_has_downvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', Auth::id())
            ->where('upvote', 0)
            ->exists();        

         return Inertia::render('Feature/Show', [
        'feature' => $feature->load('user'),
        'comments' => $feature->comments()->with('user')->latest()->get()
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Feature  $feature
     * @return \Inertia\Response
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit',[
            'feature'=> new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Feature  $feature
     
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name'=>['required', 'string', 'max:255'],
            'description'=>['nullable', 'string'],
        ]);

        $feature->update($data);
        return to_route('feature.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feature  $feature
     
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return to_route('feature.index')->with('success', 'Feature deleted successfully.');
    }
}
