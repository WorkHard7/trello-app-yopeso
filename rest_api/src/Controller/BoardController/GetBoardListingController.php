<?php

namespace App\Controller\BoardController;

use App\Entity\User;
use App\Repository\BoardRepository;
use App\Serializer\BoardSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
                          BoardRepository $boardRepository,
                          BoardSerializer $boardSerializer
    ): Response
    {
        $user = $this->getUser();
        var_dump($user);
        if (!$user) {
            return $this->json(
                Response::HTTP_UNAUTHORIZED
            );
        }
        $boards = $boardRepository->findBy(['author' => $userId]);
        if (!$boards) {
            return $this->json([]);
        }
        $results = [];
        foreach ($boards as $item) {
            $results[] = $boardSerializer->boardToArray($item);
        }
        return $this->json(
            $results
        );
    }
}
