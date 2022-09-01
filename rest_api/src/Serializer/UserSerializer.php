<?php

namespace App\Serializer;

use App\Entity\User;

class UserSerializer
{
    public function userToArray(User $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'password' => $user->getPassword(),
        ];
    }
}