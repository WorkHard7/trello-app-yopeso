<?php

namespace App\Controller\SignUpControllers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use DateTime;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SignUpController extends AbstractController
{
    /**
     * @Route("/signup", name="app_signup_page", methods={"POST"})
     */
    public function index(Request $request, ValidatorInterface $validator,
                          UserRepository $userRepository, UserSerializer $userSerializer
                            ): JsonResponse
    {
        $reqBody = $request->getContent();
        $reqBody = json_decode($reqBody, true);

        $user = new User();
        $user->setEmail($reqBody['email'])
             ->setFirstName($reqBody['first_name'])
             ->setLastName($reqBody['last_name'])
             ->setPassword($reqBody['password'])
             ->setDateCreated(new DateTime())
             ->setDateModified(new DateTime());

        $errors = $validator->validate($user);
        if($errors->count() > 0) {
            return new JsonResponse((string)$errors, 400);
        }

        $user->setPassword(password_hash($reqBody['password'], PASSWORD_BCRYPT));

        $userRepository->add($user, true);

        return  $this->json($userSerializer->userToArray($user), 200);
    }
}