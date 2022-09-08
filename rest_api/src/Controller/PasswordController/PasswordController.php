<?php

namespace App\Controller\PasswordController;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use DateTime;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PasswordController
{
    /**
     * @Route("/settings/security", name="app_signup_page", methods={"PATCH"})
     */
    public function index(Request            $request,
                          ValidatorInterface $validator,
                          UserRepository     $userRepository,
                          UserSerializer     $userSerializer,
                          ManagerRegistry    $managerRegistry
    ): JsonResponse
    {
        $reqBody = $request->getContent();
        $reqBody = json_decode($reqBody, true);
        $entityManager = $managerRegistry->getManager();
        $user = new User();

        $oldPassword = ($reqBody['password']);

        if($oldPassword !== $user->getPassword()){
            throw $this->createNotFoundException('Password doesn\'t match! Try again!');
        }

        if (isset($reqBody['password'])) {
            $user->setPassword($reqBody['password']);
        }

        $confirmPassword;


        $user->setPassword($reqBody['password']);

        $errors = $validator->validate($user);

        if (!$storeToBeUpdated) {
            throw $this->createNotFoundException('Store not found');
        }

        $user->setPassword(password_hash($reqBody['password'], PASSWORD_BCRYPT));

        $userRepository->add($user, true);

        return $this->json($userSerializer->userToArray($user));
    }
}