<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    public function store(Request $request, Feature $feature){
        $request->validate([
            
            'upvote'=>['required', 'boolean'],

        ]);
        Upvote::updateOrCreate(
            ['feature_id'=>$feature->id, 'user_id'=>Auth::id()],
            ['upvote'=>$request['upvote']]
        );
        return back();

    }

    public function destroy(Feature $feature){
        $feature->upvotes()->where('user_id', Auth::id())->delete();
        return back();
    }
}
