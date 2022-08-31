<?php

namespace App\Controller\BoardController;

use App\Repository\BoardRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetBoardListingController extends AbstractController
{
    /**
     * @Route("/boards/{userId}",
     *      requirements={"userId"="\d+"},
     *      name="app_get_board_listing",
     *     methods={"GET"})
     */
    public function index(int             $userId,
                          BoardRepository $boardRepository): Response
    {
        // test to see if user is authenticated (using the variable isAuthenticated)
        // $user = $userRepository->findOneBy(['id' => $userId]);
        //if($user->getIsAuthenticated() == 0){ return $this->json(Response::)}
        $boards = $boardRepository->findBy(['user_id' => $userId], ['is_authenticated' => 1]);
        if (!$boards) {
            return $this->json([]);
        }
        return $this->json($boards);
    }
}
