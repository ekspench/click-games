<?php


namespace App\GraphQL\Mutation;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\Facades\Shop;

class AuthMutator
{
    public function token($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@token', $args);
    }

    public function logout($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@logout', $args);
    }

    public function register($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@register', $args);
    }
    public function changePassword($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@changePassword', $args);
    }
    public function forgetPassword($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@forgetPassword', $args);
    }
    public function verifyForgetPasswordToken($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@verifyForgetPasswordToken', $args);
    }
    public function resetPassword($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@resetPassword', $args);
    }
    public function banUser($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@banUser', $args);
    }
    public function activeUser($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@activeUser', $args);
    }
    public function contactAdmin($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@contactAdmin', $args);
    }
    public function socialLogin($rootValue, array $args, GraphQLContext $context)
    {
        return Shop::call('App\Http\Controllers\UserController@socialLogin', $args);
    }
}
