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

class PasswordController extends AbstractController
{
    /**
     * @Route("/api/settings/password", name="app_change_password", methods={"PATCH"})
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


        if (!isset($reqBody['oldPassword'])) {
            return $this->json(['error' => 'oldPassword required'], 400);
        }
        $oldPassword = ($reqBody['oldPassword']);


        if (!password_verify($oldPassword, $user->getPassword())) {
            return $this->json(['error' => 'Old password doesn\'t match'], 400);
        }

        if (!isset($reqBody['newPassword'])) {
            return $this->json(['error' => 'newPassword required'], 400);
        }

        if (!isset($reqBody['confirmPassword'])) {
            return $this->json(['error' => 'confirmPassword required'], 400);
        }

        if ($reqBody['newPassword'] !== $reqBody['confirmPassword']) {
            return $this->json(['error' => "Password doesn't match"], 400);
        }

        $user->setPassword(password_hash($reqBody['newPassword'], PASSWORD_BCRYPT));


        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($userSerializer->userToArray($user));
    }
}