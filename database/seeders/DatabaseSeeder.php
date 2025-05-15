<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
use Dom\Comment;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //roles
        $userRole = Role::create(['name'=>RolesEnum::User->value]);
        $CommenterRole = Role::create(['name'=>RolesEnum::Commenter->value]);

        $AdminRole = Role::create(['name'=>RolesEnum::Admin->value]);

      //Permissions
        $manageFeaturesPermission = Permission::create(
            ['name'=> PermissionsEnum::ManageFeatures->value,]
        );
        $manageCommentsPermission = Permission::create(
            ['name'=> PermissionsEnum::ManageComments->value,]
        );
        $manageUsersPermission = Permission::create(
            ['name'=> PermissionsEnum::ManageUsers->value,]
        );
        $UpvoteDownvotePermission = Permission::create(
            ['name'=> PermissionsEnum::UpvoteDownvote->value,]
        );

        //Associate to each other
        $userRole->syncPermissions([$UpvoteDownvotePermission]);
        $CommenterRole->syncPermissions([$UpvoteDownvotePermission, $manageCommentsPermission]);
        $AdminRole->syncPermissions([$UpvoteDownvotePermission, $manageFeaturesPermission, $manageCommentsPermission]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User->value);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter->value);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin->value);

        Feature::factory(50)->create();
    }
}
