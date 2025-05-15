<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageFeatures = 'manage_features';
    case ManageComments ='manage_comments';
    case ManageUsers = 'manage_users';
    
    case UpvoteDownvote = 'upvote_downvote';


}

