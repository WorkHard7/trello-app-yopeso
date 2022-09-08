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
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;
use Symfony\Component\Validator\Mapping\ClassMetadata;

class GeneralSettingsController extends AbstractController
{
    /**
     * @Route("/api/settings/general", name="app_change_general", methods={"PATCH"})
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

        $user = $this->getUser();
        $user = $userRepository->findOneBy(['email'=>$user->getUsername()]);
        if(isset($reqBody['firstName'])){
            $user->setFirstName($reqBody['firstName']);
        }

        if(isset($reqBody['lastName'])){
            $user->setLastName($reqBody['lastName']);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($userSerializer->userToArray($user));
    }
}