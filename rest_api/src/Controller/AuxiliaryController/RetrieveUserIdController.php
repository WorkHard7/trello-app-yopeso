<?php

namespace App\Controller\AuxiliaryController;

use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RetrieveUserIdController extends AbstractController
{
    /**
     * @Route("/boards/retrieveId/{email}", requirements={"email"="^.{1,50}$"},  name="app_retrieve_user_id", methods={"GET"})
     */
    public function index(UserRepository $userRepository,
                          string         $email,
                          UserSerializer $userSerializer): Response
    {
        $user = $userRepository->findOneBy(['email' => $email]);
        if (!$user) {
            throw $this->createNotFoundException('User not found');
        }
        return $this->json($userSerializer->userToArray($user)['id']);

    }
}
