<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
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
          'id'=>$this->id,
          'name'=>$this->name,
          'created_at'=>$this->created_at,
          'email'=>$this->email,
          'email_verified_at'=>$this->email_verified_at->format('Y-m-d H:i:s'),
          'permissions'=>$this->getAllPermissions()
          ->map(function($permission){
            return $permission->name;
          }),
          'roles'=>$this->getRoleNames(),
        ];
    }
}
