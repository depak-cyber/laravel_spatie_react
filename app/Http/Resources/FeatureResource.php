<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'upvote_count' => $this->upvote_count ?: 0,
            'user_has_upvoted' => (bool)$this->user_has_upvoted,
            'user_has_downvoted' => (bool)$this->user_has_downvoted,

            'comments' => $this->comments->map(function($comment){
                return [
                    'id'=> $comment->id,
                    'comment'=>$comment->comment,
                    'user'=>new UserResource($comment->user),
                    'created_at'=>$comment->created_at->format('Y-m-d H:i:s'),
                    
                ];
            })
        ];
    }
}
